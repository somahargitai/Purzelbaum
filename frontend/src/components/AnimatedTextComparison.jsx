import { useEffect, useState } from 'react';

const AnimatedTextComparison = ({ userInput, correctTranslation }) => {
  const delay = 100;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [displayedComparison, setDisplayedComparison] = useState([]);

  useEffect(() => {
    if (currentIndex < userInput.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        const currentUserInput = userInput.slice(0, currentIndex + 1);
        const currentComparison = compareTexts(currentUserInput, correctTranslation);
        setDisplayedComparison(currentComparison);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, userInput, correctTranslation]);

  const compareTexts = (userText, correctText) => {
    const userWords = userText.split(' ');
    const correctWords = correctText.split(' ');
    const result = [];

    for (let i = 0; i < Math.max(userWords.length, correctWords.length); i++) {
      const userWord = userWords[i] || '';
      const correctWord = correctWords[i] || '';

      if (userWord === correctWord) {
        result.push(
          <span key={`word-${i}`} className="text-green-600">
            {userWord}
          </span>
        );
      } else {
        // Render the incorrect word with strikethrough
        const incorrectWord = [];
        for (let j = 0; j < userWord.length; j++) {
          const char = userWord[j];
          incorrectWord.push(
            <span
              key={`incorrect-${i}-${j}`}
              className="text-red-700 line-through"
            >
              {char}
            </span>
          );
        }

        // Render the correct word character by character
        const correctWordChars = [];
        for (let j = 0; j < correctWord.length; j++) {
          const char = correctWord[j];
          const isExistingChar = j < userWord.length && char === userWord[j];
          correctWordChars.push(
            <span
              key={`correct-${i}-${j}`}
              className={isExistingChar ? 'text-yellow-500' : 'text-red-500'}
            >
              {char}
            </span>
          );
        }

        result.push(
          <span key={`word-${i}`} className="inline-flex items-baseline">
            <span className="mr-2">{incorrectWord}</span>
            <span>{correctWordChars}</span>
          </span>
        );
      }

      // Add space after each word except the last one
      if (i < Math.max(userWords.length, correctWords.length) - 1) {
        result.push(' ');
      }
    }

    return result;
  };

  const renderComparison = () => {
    const userWords = userInput.split(' ');
    const correctWords = correctTranslation.split(' ');
    const result = [];

    for (let i = 0; i < Math.max(userWords.length, correctWords.length); i++) {
      const userWord = userWords[i] || '';
      const correctWord = correctWords[i] || '';

      if (userWord === correctWord) {
        result.push(
          <span key={`word-${i}`} className="text-green-600">
            {userWord}
          </span>
        );
      } else {
        // Render the incorrect word with strikethrough
        const incorrectWord = [];
        for (let j = 0; j < userWord.length; j++) {
          const char = userWord[j];
          incorrectWord.push(
            <span
              key={`incorrect-${i}-${j}`}
              className="text-red-900 line-through"
            >
              {char}
            </span>
          );
        }

        // Render the correct word character by character
        const correctWordChars = [];
        for (let j = 0; j < correctWord.length; j++) {
          const char = correctWord[j];
          const isExistingChar = j < userWord.length && char === userWord[j];
          correctWordChars.push(
            <span
              key={`correct-${i}-${j}`}
              className={isExistingChar ? 'text-yellow-500' : 'text-red-300'}
            >
              {char}
            </span>
          );
        }

        result.push(
          <span key={`word-${i}`} className="inline-flex items-baseline">
            <span className="mr-2">{incorrectWord}</span>
            <span>{correctWordChars}</span>
          </span>
        );
      }

      // Add space after each word except the last one
      if (i < Math.max(userWords.length, correctWords.length) - 1) {
        result.push(' ');
      }
    }

    return <p>{result}</p>;
  };

  return <div className="font-oswald text-5xl text-left">{isComplete ? renderComparison() : <p>{displayedComparison}</p>}</div>;
};

export default AnimatedTextComparison;
