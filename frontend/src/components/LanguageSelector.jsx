import { Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { GB, DE, HU } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { sourceLanguage, setSourceLanguage, targetLanguage, setTargetLanguage } = useLanguage();

  const languages = [
    { code: 'en', flag: GB, name: 'English' },
    { code: 'de', flag: DE, name: 'German' },
    { code: 'hu', flag: HU, name: 'Hungarian' },
  ];

  const handleSourceLanguageChange = (value) => {
    if (value && value !== targetLanguage) {
      setSourceLanguage(value);
    }
  };

  const handleTargetLanguageChange = (value) => {
    if (value && value !== sourceLanguage) {
      setTargetLanguage(value);
    }
  };

  const getSelectedLanguageName = (code) => {
    return languages.find(lang => lang.code === code)?.name || code;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="rounded-lg p-2.5 text-sm bg-background text-foreground hover:bg-[#242424] hover:text-white dark:hover:bg-[#8b5cf6] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 border border-border transition-all hover:scale-105"
          aria-label="Select language"
        >
          <Languages className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 mr-4 mt-2">
        <DropdownMenuLabel>Language Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel>Source Language</DropdownMenuLabel>
          <div className="p-2">
            <ToggleGroup 
              type="single" 
              value={sourceLanguage} 
              onValueChange={handleSourceLanguageChange} 
              className="justify-start"
            >
              {languages.map((lang) => (
                <ToggleGroupItem 
                  key={lang.code} 
                  value={lang.code} 
                  aria-label={lang.name}
                  disabled={lang.code === targetLanguage}
                  className="data-[state=on]:bg-[#8b5cf6] data-[state=on]:text-white dark:data-[state=on]:bg-[#8b5cf6] dark:data-[state=on]:text-white"
                >
                  <lang.flag />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Target Language</DropdownMenuLabel>
          <div className="p-2">
            <ToggleGroup 
              type="single" 
              value={targetLanguage} 
              onValueChange={handleTargetLanguageChange} 
              className="justify-start"
            >
              {languages.map((lang) => (
                <ToggleGroupItem 
                  key={lang.code} 
                  value={lang.code} 
                  aria-label={lang.name}
                  disabled={lang.code === sourceLanguage}
                  className="data-[state=on]:bg-[#8b5cf6] data-[state=on]:text-white dark:data-[state=on]:bg-[#8b5cf6] dark:data-[state=on]:text-white"
                >
                  <lang.flag />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector; 