// cors-proxy.js
export default {
    async fetch(request) {
      const url = new URL(request.url);
      const targetUrl = url.searchParams.get('url');
  
      if (!targetUrl) {
        return new Response('Missing "url" parameter', { status: 400 });
      }
  
      try {
        const res = await fetch(targetUrl);
        const newHeaders = new Headers(res.headers);
        newHeaders.set('Access-Control-Allow-Origin', '*');
        newHeaders.set('Access-Control-Allow-Headers', '*');
        newHeaders.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
        return new Response(res.body, {
          status: res.status,
          headers: newHeaders,
        });
      } catch (err) {
        return new Response('Error fetching target URL', { status: 500 });
      }
    },
  };
  