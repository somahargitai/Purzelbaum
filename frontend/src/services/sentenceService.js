export const fetchSentences = async (signal) => {
  try {
    const response = await fetch('/api/sentences', { signal });
    if (!response.ok) {
      throw new Error('Failed to fetch sentences from API');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Failed to fetch sentences from API:', error);
    
    // Try local sentences JSON file as fallback
    try {
      const localSentences = await import('../data/sentences.json');
      if (localSentences.sentences && localSentences.sentences.length > 0) {
        return localSentences.sentences;
      }
    } catch (error) {
      console.warn('Failed to load local sentences:', error);
    }

    // If both sources failed, throw error
    throw new Error('No sentences available. Please check your configuration or contact support.');
  }
};
