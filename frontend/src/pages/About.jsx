import { useState, useEffect } from 'react';

const About = () => {
  const fullText = `PURZELBAUM is a modern language learning application designed to help you master German through interactive exercises, smart sentence analysis, and translation practice. 
With my intuitive interface and powerful AI-powered feedback, you can improve your grammar, vocabulary, and comprehension skills at your own pace. 
I made it to make my German learning more fun and engaging. 
I hope you enjoy using it!`;
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Initial delay before cursor appears
    const cursorDelay = setTimeout(() => {
      setShowCursor(true);
      
      // Delay before typing starts
      const typingDelay = setTimeout(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
          if (currentIndex <= fullText.length) {
            setDisplayText(fullText.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            setShowCursor(false);
          }
        }, Math.random() * 10 + 40); // Random speed between 40-50ms
      }, 500);
    }, 1000);

    return () => {
      clearTimeout(cursorDelay);
    };
  }, []);

  return (
    <div className="mx-auto w-[800px] p-8">
      <style jsx>{`
        .initial-letter::first-letter {
          -webkit-initial-letter: 3 3;
          initial-letter: 3 3;
          margin-right: 0.5em;
          // color: #000;
          font-weight: bold;
        }
      `}</style>
      <p className="font-oswald text-left text-3xl leading-relaxed initial-letter">
        {displayText}
        {showCursor && <span className="animate-blink">|</span>}
      </p>
    </div>
  );
};

export default About;
