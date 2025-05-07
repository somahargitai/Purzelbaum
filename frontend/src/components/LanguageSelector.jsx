import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggleGroup from './LanguageToggleGroup';

const LanguageSelector = () => {
  const { sourceLanguage, setSourceLanguage, targetLanguage, setTargetLanguage } = useLanguage();
  const { i18n } = useTranslation();

  const handleSourceLanguageChange = value => {
    if (value && value !== targetLanguage) {
      setSourceLanguage(value);
    }
  };

  const handleTargetLanguageChange = value => {
    if (value && value !== sourceLanguage) {
      setTargetLanguage(value);
    }
  };

  const handleAppLanguageChange = value => {
    if (value) {
      i18n.changeLanguage(value);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="bg-background text-foreground focus-visible:ring-primary/20 border-border rounded-lg border p-2.5 text-sm transition-all hover:scale-105 hover:bg-[#242424] hover:text-white focus:outline-none focus-visible:ring-2 dark:hover:bg-[#8b5cf6]"
          aria-label="Select language"
        >
          <Languages className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 mr-4 w-80">
        <DropdownMenuLabel>Language Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel>App Language</DropdownMenuLabel>
          <div className="p-2">
            <LanguageToggleGroup 
              value={i18n.language}
              onValueChange={handleAppLanguageChange}
            />
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Source Language</DropdownMenuLabel>
          <div className="p-2">
            <LanguageToggleGroup 
              value={sourceLanguage}
              onValueChange={handleSourceLanguageChange}
              disabledValue={targetLanguage}
            />
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Target Language</DropdownMenuLabel>
          <div className="p-2">
            <LanguageToggleGroup 
              value={targetLanguage}
              onValueChange={handleTargetLanguageChange}
              disabledValue={sourceLanguage}
            />
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
