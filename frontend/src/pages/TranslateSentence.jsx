import { useEffect, useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { Check, ArrowRight, Search, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { currentSentenceAtom, sentenceAnalysisAtom, isLoadingAtom, errorAtom } from '../atoms/sentenceAtoms';
import AnimatedTextComparison from '../components/AnimatedTextComparison';
import Button from '../components/Button';
import { fetchSentences } from '../services/sentenceService';
import { useLanguage } from '../contexts/LanguageContext';

const TranslateSentence = () => {
  const { t } = useTranslation();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { sourceLanguage, targetLanguage } = useLanguage();

  const [sentence, setSentence] = useAtom(currentSentenceAtom);
  const [analysis, setAnalysis] = useAtom(sentenceAnalysisAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [userInput, setUserInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [availableSentences, setAvailableSentences] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadSentences = async () => {
      try {
        setIsLoading(true);
        const sentences = await fetchSentences(controller.signal);

        if (sentences.length === 0) {
          setError('No sentences available. Please check your configuration or contact support.');
          return;
        }

        setAvailableSentences(sentences);
        const randomIndex = Math.floor(Math.random() * sentences.length);
        setSentence(sentences[randomIndex]);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadSentences();

    return () => {
      controller.abort();
    };
  }, [setSentence]);

  const handleNext = () => {
    if (availableSentences.length === 0) {
      setError('No sentences available. Please check your configuration or contact support.');
      return;
    }

    setUserInput('');
    const randomIndex = Math.floor(Math.random() * availableSentences.length);
    setSentence(availableSentences[randomIndex]);
    setIsSubmitted(false);
    setAnalysis(null);
  };

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      setError(null);

      const response = await fetch(`${apiUrl}/api/openai/explainTranslation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original: sentence[sourceLanguage],
          correct: sentence[targetLanguage],
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
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      nextButtonRef.current?.focus();
    }, 100);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (!isSubmitted) {
        handleSubmit(e);
      } else {
        handleNext();
      }
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="mb-4 h-12 w-12 text-red-500" />
        <h2 className="mb-2 text-xl font-bold text-red-500">Error</h2>
        <p className="mb-4 text-gray-300">{error}</p>
        <Button onClick={() => window.location.reload()} variant="secondary">
          Try Again
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <h2 className="mb-2 text-left font-bold">{t('translateSentence.title')}</h2>
      <p className="font-oswald text-left text-5xl">{sentence[sourceLanguage]}</p>
      {isSubmitted ? (
        <div className="mt-4 mb-8 w-full text-left">
          <AnimatedTextComparison 
            userInput={userInput} 
            correctTranslation={sentence[targetLanguage]} 
          />
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="mt-4 mb-4">
              <input
                type="text"
                id="translation-input"
                name="translation"
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

      <div className="flex justify-center gap-4">
        {isSubmitted ? (
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !isSubmitted}
            variant="secondary"
            size="lg"
            className={`min-w-[160px] ${isAnalyzing ? 'border-yellow-300 text-yellow-300' : ''}`}
          >
            {isAnalyzing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
            <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Translation'}</span>
          </Button>
        ) : (
          <Button onClick={handleSubmit} size="lg">
            <Check className="h-5 w-5" />
            <span>Check Translation</span>
          </Button>
        )}
        <Button onClick={handleNext} size="lg" ref={nextButtonRef} tabIndex={isSubmitted ? 0 : -1}>
          <ArrowRight className="mr-2 inline-block h-5 w-5" />
          Next
        </Button>
      </div>

      {analysis && (
        <div className="full-width mt-8 text-left">
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
                  <li key={`incorrect-${index}`} className="pl-5 text-xl text-foreground">
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
