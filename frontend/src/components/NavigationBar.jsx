import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, cycleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  return (
    <>
      <img
        src="/splash.svg"
        alt=""
        className="fixed top-30 left-48 -z-50 h-[600px] w-[1200px] -translate-x-1/2 -translate-y-1/2 opacity-80"
      />
      <nav className="bg-background border-border fixed top-0 right-0 left-0 z-50 w-full">
        {/* Desktop Navigation */}
        <div className="mx-auto hidden h-16 px-6 lg:block">
          <div className="flex h-full w-full items-center justify-between">
            <div className="flex items-center">
              {/* Logotype */}
              <div className="relative mt-6">
                <div className="absolute top-[4px] left-[4px] -z-10">
                  <span className="font-anton text-3xl font-medium tracking-wider text-black uppercase">
                    Purzelbaum
                  </span>
                </div>
                <Link
                  to="/"
                  className="font-anton relative text-3xl font-medium tracking-wider !text-white uppercase transition-colors hover:!text-gray-200"
                >
                  Purzelbaum
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <Link to="/" className="hover:text-primary font-bold transition-colors">
                Home
              </Link>
              <Link to="/translate-sentence" className="hover:text-primary font-bold transition-colors">
                Translate Sentence
              </Link>
              <Link to="/about" className="hover:text-primary font-bold transition-colors">
                About
              </Link>
              <button
                onClick={cycleTheme}
                className="rounded-lg p-2.5 text-sm bg-background text-foreground hover:bg-[#242424] hover:text-white dark:hover:bg-[#8b5cf6] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 border border-border transition-all hover:scale-105"
                aria-label="Toggle theme"
              >
                {getThemeIcon()}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="block w-full lg:hidden">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="relative">
              <div className="absolute top-[4px] left-[4px] -z-10">
                <span className="font-anton text-3xl font-medium tracking-widest text-black uppercase">Purzelbaum</span>
              </div>
              <Link
                to="/"
                className="font-anton relative text-3xl font-medium tracking-widest !text-white uppercase transition-colors hover:!text-gray-200"
              >
                Purzelbaum
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={cycleTheme}
                className="rounded-lg p-2.5 text-sm bg-background text-foreground hover:bg-[#242424] hover:text-white dark:hover:bg-[#8b5cf6] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 border border-border transition-all hover:scale-105"
                aria-label="Toggle theme"
              >
                {getThemeIcon()}
              </button>
              <button onClick={toggleMenu} aria-label="Toggle menu" className="p-2 focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="fixed inset-0">
              <div
                className="absolute inset-0 z-10 bg-black/30 transition-opacity duration-300"
                onClick={() => setIsMenuOpen(false)}
              />
              <div
                className={`absolute top-0 right-0 z-20 h-full w-80 rounded-l-2xl bg-gray-800/95 transition-transform duration-300 ease-out ${
                  isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <div className="mt-16 flex flex-col space-y-4 px-6 py-4">
                  <Link
                    to="/"
                    className="hover:text-primary py-2 text-3xl text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>

                  <Link
                    to="/about"
                    className="hover:text-primary py-2 text-3xl text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/translate-sentence"
                    className="hover:text-primary py-2 text-3xl text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Translate Sentence
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
