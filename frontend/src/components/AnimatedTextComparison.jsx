import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AnimatedTextComparison = ({ userInput, correctTranslation }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const { targetLanguage } = useLanguage();

  useEffect(() => {
    let currentIndex = 0;
    const text = correctTranslation;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [correctTranslation]);

  const renderComparison = () => {
    const words = userInput.split(' ');
    const correctWords = correctTranslation.split(' ');
    const maxLength = Math.max(words.length, correctWords.length);

    return Array.from({ length: maxLength }, (_, i) => {
      const userWord = words[i] || '';
      const correctWord = correctWords[i] || '';
      const isCorrect = userWord.toLowerCase() === correctWord.toLowerCase();

      return (
        <span
          key={i}
          className={`mr-2 inline-block ${
            isCorrect ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {isCorrect ? userWord : correctWord}
        </span>
      );
    });
  };

  return (
    <div className="font-oswald text-5xl">
      {isAnimating ? (
        <span className="text-gray-300">{displayedText}</span>
      ) : (
        renderComparison()
      )}
    </div>
  );
};

export default AnimatedTextComparison;
