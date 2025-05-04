import { useEffect } from 'react';
import { useAtom } from 'jotai';
import sentences from '../../learning-material/sentences';
import { 
  currentSentenceAtom, 
  sentenceAnalysisAtom, 
  isLoadingAtom, 
  errorAtom 
} from '../atoms/sentenceAtoms';

const SmartSentences = () => {
  const [sentence, setSentence] = useAtom(currentSentenceAtom);
  const [analysis, setAnalysis] = useAtom(sentenceAnalysisAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);

  useEffect(() => {
    // Load a random sentence when component mounts
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const randomSentence = sentences[randomIndex];
    setSentence(randomSentence);
  }, [setSentence]);

  const handleAnalyze = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3005/api/openai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence: sentence.sentence }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze sentence');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Current Sentence:</h2>
        <p className="text-lg">{sentence.sentence}</p>
        <p className="text-sm text-gray-600 mt-1">{sentence.translation}</p>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Sentence'}
      </button>

      {error && (
        <div className="mt-4 text-red-500">
          Error: {error}
        </div>
      )}

      {analysis && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Analysis:</h3>
          <p>{analysis.analysis}</p>
        </div>
      )}
    </div>
  );
};

export default SmartSentences;
