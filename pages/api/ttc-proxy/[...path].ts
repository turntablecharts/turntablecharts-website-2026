import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // --- Basic Security Layer: Prevent direct browser access/scraping ---
  if (process.env.NODE_ENV === 'production') {
    const referer = req.headers.referer || '';
    const host = req.headers.host || '';
    
    // Block the request if there is no referer (direct hit) or the referer doesn't match the site's host
    if (!referer || !referer.includes(host)) {
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

    // Return the response data and status code back to the client
    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error('Proxy Endpoint Error:', error.message);
    
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    
    return res.status(500).json({ error: 'Proxy could not reach the backend service.' });
  }
}
