export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, company, email, message, budget, pageUrl } = req.body || {};
  if (!name || !company || !email || !message) return res.status(400).json({ error: 'Missing required fields' });
  const payload = { name, company, email, message, budget: budget || 'Not specified', pageUrl: pageUrl || 'https://macworkflows.in', timestamp: new Date().toISOString() };

  // 1. Forward to n8n if configured
  const n8nUrl = process.env.N8N_WEBHOOK_URL;
  if (n8nUrl) {
    try { await fetch(n8nUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); } catch(e){ console.warn('n8n forward failed', e); }
  }

  // 2. Send email via Resend if configured, else fallback to log (client will try FormSubmit)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + resendKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Mac Work Flows <onboarding@resend.dev>',
          to: (process.env.LEAD_TO_EMAIL || 'marundeeswar7@gmail.com').split(','),
          subject: 'New Automation Request - ' + name + ' (' + company + ')',
          html: '<p><b>Name:</b> ' + name + '</p><p><b>Company:</b> ' + company + '</p><p><b>Email:</b> ' + email + '</p><p><b>Budget:</b> ' + (budget||'-') + '</p><p><b>Message:</b><br/>' + message + '</p><p><b>Page:</b> ' + payload.pageUrl + '</p>'
        })
      });
      if (!r.ok) throw new Error(await r.text());
      return res.status(200).json({ ok: true, via: 'resend' });
    } catch(e){ console.error(e); return res.status(500).json({ error: 'Email failed', via: 'resend' }); }
  }

  console.log('[lead]', payload);
  return res.status(200).json({ ok: true, via: 'log', payload });
}
