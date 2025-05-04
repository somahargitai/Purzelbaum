export const fetchSentences = async signal => {
  const r2Url = import.meta.env.VITE_CLOUDFLARE_R2_SENTENCES_URL;

  // Try Cloudflare R2 first
  if (r2Url) {
    try {
      // Use a more reliable CORS proxy
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(r2Url)}`;
      const response = await fetch(proxyUrl, {
        signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch sentences from Cloudflare R2: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data && data.sentences && data.sentences.length > 0) {
        return data.sentences;
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        throw error; // Re-throw abort errors
      }
      console.warn('Failed to fetch from Cloudflare R2, trying local file:', error);
      // Log the full error for debugging
      console.error('Full error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
  }

  // Try local sentences file as fallback
  try {
    const localSentences = await import('../../learning-material/sentences.js');
    if (localSentences.default && localSentences.default.length > 0) {
      return localSentences.default;
    }
  } catch (error) {
    console.warn('Failed to load local sentences:', error);
  }

  // If both sources failed, throw error
  throw new Error('No sentences available. Please check your configuration or contact support.');
};
