import { getStore } from '@netlify/blobs';

export default async (req) => {
  const store = getStore('ha-cafe-prep');

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    if (req.method === 'GET') {
      const url = new URL(req.url);
      const key = url.searchParams.get('key');
      if (!key) {
        return new Response(JSON.stringify({ error: 'missing key' }), { status: 400, headers });
      }
      const value = await store.get(key);
      if (value === null || value === undefined) {
        return new Response(JSON.stringify({ value: null }), { status: 200, headers });
      }
      return new Response(JSON.stringify({ value }), { status: 200, headers });
    }

    if (req.method === 'POST') {
      const body = await req.json();
      const { key, value } = body;
      if (!key) {
        return new Response(JSON.stringify({ error: 'missing key' }), { status: 400, headers });
      }
      const str = typeof value === 'string' ? value : JSON.stringify(value);
      await store.set(key, str);
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
    }

    return new Response(JSON.stringify({ error: 'method not allowed' }), { status: 405, headers });
  } catch (err) {
    console.error('Store function error:', err);
    return new Response(JSON.stringify({ error: err.message || 'internal error' }), { status: 500, headers });
  }
};

export const config = {
  path: '/.netlify/functions/store',
};
