import crypto from 'node:crypto';

const SESSION_DATA = JSON.stringify({
  id: 'ho_001',
  first_name: 'Sarah',
  last_name: "O'Brien",
  phone: '353871234567',
  email: 'sarah.obrien@gmail.com',
  registration_date: '2025-11-15T10:30:00Z',
  account_state: 'ACTIVE',
  is_premium: false,
  premium_trial_months_remaining: 0,
  premium_started_at: null,
  premium_source: null,
  premium_billing_active: false,
  marketing_opt_in: true,
  properties: ['D15X2Y3', 'K67F8H2'],
  _v: 2,
});

function verifyJWT(token, secret, expectedAudience) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;

    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(`${headerB64}.${payloadB64}`)
      .digest('base64url');

    if (signatureB64.length !== expectedSig.length) return null;
    if (
      !crypto.timingSafeEqual(
        Buffer.from(signatureB64, 'utf8'),
        Buffer.from(expectedSig, 'utf8')
      )
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString()
    );

    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000))
      return null;
    if (payload.iss !== 'homesorted-invest') return null;
    if (payload.aud !== expectedAudience) return null;

    return payload;
  } catch {
    return null;
  }
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  }

  const token = req.query.token;
  if (!token) {
    return res.status(400).send('Missing token');
  }

  const secret = process.env.HS_INVEST_PREAUTH_SECRET;
  if (!secret) {
    return res.status(500).send('Server configuration error');
  }

  const payload = verifyJWT(token, secret, 'homeowner-panel');
  if (!payload) {
    return res.status(403).send('Invalid or expired token');
  }

  const escaped = SESSION_DATA.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Loading HomeInsight…</title>
  <style>body{display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:system-ui,sans-serif;color:#1A2332;background:#f9fafb}p{font-size:1.125rem}</style>
</head>
<body>
  <p>Loading HomeInsight…</p>
  <script>
    try {
      localStorage.setItem('homesorted_ho_session_v2', '${escaped}');
    } catch (e) {
      console.error('preauth: failed to set session', e);
    }
    window.location.replace('/dashboard');
  </script>
</body>
</html>`);
}
