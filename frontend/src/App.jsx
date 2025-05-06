import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import NavigationBar from './components/NavigationBar';
import { Home, About, TranslateSentence } from './pages/index';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/translate-sentence" element={<TranslateSentence />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
