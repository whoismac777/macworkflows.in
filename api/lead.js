import { Resend } from 'resend';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, company, email, message, budget, pageUrl } = body || {};

    // Validation
    if (!name || !company || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, company, email, message' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const to = 'marundeeswar7@gmail.com';
    const subject = `🚀 New Automation Request — ${name} (${company})`;
    const html = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;background:#0A0A0B;color:#F2EFE8;padding:24px;border-radius:12px">
        <h2 style="margin:0 0 12px;font-size:18px">New lead from Mac Work Flows</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#B0ACA5;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#B0ACA5">Business</td><td style="padding:8px 0">${escapeHtml(company)}</td></tr>
          <tr><td style="padding:8px 0;color:#B0ACA5">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}" style="color:#4C7DF0">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#B0ACA5">Budget</td><td style="padding:8px 0">${escapeHtml(budget || 'Not specified')}</td></tr>
          <tr><td style="padding:8px 0;color:#B0ACA5">Page</td><td style="padding:8px 0;font-size:12px;color:#8A8580">${escapeHtml(pageUrl || '')}</td></tr>
        </table>
        <div style="margin:16px 0;padding:16px;background:#111113;border:1px solid rgba(255,255,255,.08);border-radius:10px">
          <div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#8A8580;margin-bottom:8px">What they want to automate</div>
          <div style="white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div>
        </div>
        <div style="font-size:12px;color:#8A8580">Reply directly to <a href="mailto:${escapeHtml(email)}" style="color:#4C7DF0">${escapeHtml(email)}</a> • Received ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
      </div>
    `;
    const text = `New lead\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nBudget: ${budget || 'Not specified'}\nPage: ${pageUrl || ''}\n\nMessage:\n${message}`;

    // 1) Try Resend (recommended) — set RESEND_API_KEY in Vercel env
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.RESEND_FROM || 'Mac Work Flows <onboarding@resend.dev>';
      const { error } = await resend.emails.send({ from, to, subject, html, text, replyTo: email });
      if (error) throw new Error(error.message);
      return res.status(200).json({ ok: true, via: 'resend' });
    }

    // 2) Try Nodemailer SMTP — set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `Mac Work Flows <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
        text,
        replyTo: email,
      });
      return res.status(200).json({ ok: true, via: 'smtp' });
    }

    // 3) Fallback: FormSubmit (no API key needed) — sends to your Gmail via formsubmit.co
    // First submission needs you to confirm via email from FormSubmit (one-time)
    try {
      const r = await fetch('https://formsubmit.co/ajax/marundeeswar7@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name, company, email, message, budget: budget || 'Not specified', pageUrl: pageUrl || '',
          _subject: subject,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok) return res.status(200).json({ ok: true, via: 'formsubmit', formsubmit: j });
    } catch (e) {
      console.warn('formsubmit fallback failed', e);
    }

    // 4) Last fallback: log and return ok (so UX not broken) — you will see in Vercel logs
    console.log('[lead] no email provider configured, lead:', { name, company, email, message, budget, pageUrl });
    return res.status(200).json({ ok: true, via: 'log', warning: 'No RESEND_API_KEY or SMTP set — lead logged to Vercel logs and not emailed. Set RESEND_API_KEY to enable email.' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
