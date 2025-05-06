import { useState } from 'react';
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

const LanguageSelector = () => {
  const [appLanguage, setAppLanguage] = useState('en');
  const [sourceLanguage, setSourceLanguage] = useState('de');
  const [targetLanguage, setTargetLanguage] = useState('hu');

  const languages = [
    { code: 'en', flag: GB, name: 'English' },
    { code: 'de', flag: DE, name: 'German' },
    { code: 'hu', flag: HU, name: 'Hungarian' },
  ];

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
          <DropdownMenuLabel>Application Language</DropdownMenuLabel>
          <div className="p-2">
            <ToggleGroup type="single" value={appLanguage} onValueChange={setAppLanguage} className="justify-start">
              {languages.map((lang) => (
                <ToggleGroupItem key={lang.code} value={lang.code} aria-label={lang.name}>
                  <lang.flag />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Source Language</DropdownMenuLabel>
          <div className="p-2">
            <ToggleGroup type="single" value={sourceLanguage} onValueChange={setSourceLanguage} className="justify-start">
              {languages.map((lang) => (
                <ToggleGroupItem key={lang.code} value={lang.code} aria-label={lang.name}>
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
            <ToggleGroup type="single" value={targetLanguage} onValueChange={setTargetLanguage} className="justify-start">
              {languages.map((lang) => (
                <ToggleGroupItem key={lang.code} value={lang.code} aria-label={lang.name}>
                  <lang.flag />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        
        <div className="flex justify-end p-2">
          <button
            className="rounded-lg bg-[#242424] text-white px-4 py-2 text-sm font-medium hover:bg-[#8b5cf6] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors"
          >
            Apply
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector; 