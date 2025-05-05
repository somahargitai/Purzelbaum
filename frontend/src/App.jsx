import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import NavigationBar from './components/NavigationBar';
import { Home, About, TranslateSentence } from './pages/index';

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/translate-sentence" element={<TranslateSentence />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
