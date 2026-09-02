# macworkflows.in

Custom n8n Automation for Modern Businesses - deployed on Vercel.

- index.html - full single-file frontend (scraped from https://macworkflows.in)
- pi/lead.js - Vercel serverless function for contact form -> Resend/N8N -> marundeeswar7@gmail.com
- ercel.json - Vercel config

## Deploy

Connect repo to Vercel -> auto-deploy on push to main.
Set env vars: RESEND_API_KEY, RESEND_FROM, LEAD_TO_EMAIL, N8N_WEBHOOK_URL (optional).

