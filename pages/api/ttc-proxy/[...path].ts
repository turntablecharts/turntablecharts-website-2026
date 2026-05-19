import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // --- Basic Security Layer: Prevent direct browser access/scraping ---
  const secFetchSite = req.headers['sec-fetch-site'];
  const referer = req.headers.referer || '';
  const host = (req.headers['x-forwarded-host'] as string) || req.headers.host || '';
  
  // 1. Validate using modern browser Sec-Fetch-Site headers if present
  if (secFetchSite) {
    if (secFetchSite !== 'same-origin' && secFetchSite !== 'same-site') {
      return res.status(403).json({ error: 'Forbidden: not allowed.' });
    }
  } else {
    // 2. Fallback to Referer validation (handles older browsers and local environments)
    const cleanHost = host.replace(/^www\./, '');
    const isAllowed = referer.includes(cleanHost) || referer.includes('localhost') || referer.includes('127.0.0.1');
    if (!referer || !isAllowed) {
      return res.status(403).json({ error: 'Forbidden: not allowed.' });
    }
  }

  const { path, ...queryParams } = req.query;

  // Reconstruct the target URL path (e.g. ['charts', 'weekly'] -> 'charts/weekly')
  const targetPath = Array.isArray(path) ? path.join('/') : path || '';
  
  const backendBaseUrl = process.env.TTC_BACKEND_URL || 'https://turntablechartsapi.azurewebsites.net';
  
  // Reconstruct query parameters
  const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
  const targetUrl = `${backendBaseUrl}/${targetPath}${queryString ? `?${queryString}` : ''}`;

  // Read the private API key from environment variables
  const apiKey = process.env.TTC_API_KEY;

  if (!apiKey) {
    console.error('Error: TTC_API_KEY is not defined in environment variables (.env.local)');
    return res.status(500).json({ error: 'Internal Server Error: Proxy API configuration missing.' });
  }

  try {
    // Forward the request to the Azure backend
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: {
        // NOTE: Customize this header to match your API key expected header:
        // - For x-api-key:         'x-api-key': apiKey
        // - For api-key:           'api-key': apiKey
        // - For Authorization:    'Authorization': `Bearer ${apiKey}`
        'x-api-key': apiKey,
        'Content-Type': req.headers['content-type'] || 'application/json',
      },
      timeout: 30000, // 30 seconds
    });

    // Return the response data and status code back to the client, obfuscated as a Base64 string
    const rawString = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
    const obfuscatedPayload = Buffer.from(rawString).toString('base64');
    return res.status(response.status).json({ payload: obfuscatedPayload });
  } catch (error: any) {
    console.error('Proxy Endpoint Error:', error.message);
    
    if (error.response) {
      const errorString = typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data);
      const obfuscatedPayload = Buffer.from(errorString).toString('base64');
      return res.status(error.response.status).json({ payload: obfuscatedPayload });
    }
    
    const fallbackErrorString = JSON.stringify({ error: 'Proxy could not reach the backend service.' });
    const obfuscatedPayload = Buffer.from(fallbackErrorString).toString('base64');
    return res.status(500).json({ payload: obfuscatedPayload });
  }
}
