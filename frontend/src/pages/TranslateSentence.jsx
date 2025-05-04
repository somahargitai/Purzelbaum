import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Check, ArrowRight, Search, Loader2 } from 'lucide-react';
import sentences from '../../learning-material/sentences';
import { currentSentenceAtom, sentenceAnalysisAtom, isLoadingAtom, errorAtom } from '../atoms/sentenceAtoms';
import AnimatedTextComparison from '../components/AnimatedTextComparison';
import Button from '../components/Button';

const TranslateSentence = () => {
  const [sentence, setSentence] = useAtom(currentSentenceAtom);
  const [analysis, setAnalysis] = useAtom(sentenceAnalysisAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [userInput, setUserInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Load a random sentence when component mounts
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const randomSentence = sentences[randomIndex];
    setSentence(randomSentence);
  }, [setSentence]);

  const handleNext = () => {
    setUserInput('');
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const randomSentence = sentences[randomIndex];
    setSentence(randomSentence);
    setIsSubmitted(false);
    setAnalysis(null);
  };

  const handleAnalyze = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('http://localhost:3005/api/openai/explainTranslation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original: sentence.sentence,
          correct: sentence.translation,
          userInput: userInput,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze translation');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="mb-2 text-left font-bold">Translate the Sentence</h2>
      <p className="font-oswald text-left text-5xl">{sentence.sentence}</p>
      {isSubmitted ? (
        <div className="mt-4 mb-8 w-full text-left">
          <AnimatedTextComparison userInput={userInput} correctTranslation={sentence.translation} />
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="mt-4 mb-4">
              <input
                type="text"
                className="font-oswald w-full text-5xl break-words whitespace-normal focus:outline-none"
                placeholder="__"
                aria-label="Translation input"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>
          </div>
        </>
      )}

      {/* Control buttons */}
      <div className="flex justify-center gap-4">
        {isSubmitted ? (
          <Button
            onClick={handleAnalyze}
            disabled={isLoading || !isSubmitted}
            variant="secondary"
            size="lg"
            className="min-w-[160px]"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
            <span>{isLoading ? 'Analyzing...' : 'Analyze Translation'}</span>
          </Button>
        ) : (
          <Button onClick={handleSubmit} size="lg">
            <Check className="h-5 w-5" />
            <span>Check Translation</span>
          </Button>
        )}
        <Button onClick={handleNext} size="lg">
          <ArrowRight className="mr-2 inline-block h-5 w-5" />
          Next
        </Button>
      </div>

      {error && <div className="mt-4 text-red-500">Error: {error}</div>}

      {analysis && (
        <div className="full-width mt-8 text-left">
          {/* <h3 className="mb-2 text-lg font-bold">Grammar Analysis:</h3> */}
          <h2 className="mb-2 text-left font-bold">Grammar Analysis</h2>
          {analysis.correctConjugations && analysis.correctConjugations.length > 0 && (
            <div className="mb-4">
              <h4 className="font-oswald mb-2 text-3xl font-semibold tracking-wide text-green-400 uppercase">
                Perfect Grammar Usage
              </h4>
              <ul className="list-disc pl-5">
                {analysis.correctConjugations.map((item, index) => (
                  <li key={`correct-${index}`} className="pl-5 text-xl text-green-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {analysis.incorrectConjugations && analysis.incorrectConjugations.length > 0 && (
            <div>
              <h4 className="font-oswald mb-2 text-3xl font-semibold tracking-wide text-red-400 uppercase">
                Points To Improve
              </h4>
              <ul className="list-disc pl-5">
                {analysis.incorrectConjugations.map((item, index) => (
                  <li key={`incorrect-${index}`} className="pl-5 text-xl text-white">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TranslateSentence;
