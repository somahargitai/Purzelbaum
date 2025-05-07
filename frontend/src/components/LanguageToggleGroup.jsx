import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { GB, DE, HU } from './icons';

const languages = [
  { code: 'en', flag: GB, name: 'English' },
  { code: 'de', flag: DE, name: 'German' },
  { code: 'hu', flag: HU, name: 'Hungarian' },
];

const LanguageToggleGroup = ({ value, onValueChange, disabledValue, className = 'justify-start' }) => {
  return (
    <ToggleGroup type="single" value={value} onValueChange={onValueChange} className={className}>
      {languages.map(lang => (
        <ToggleGroupItem
          key={lang.code}
          value={lang.code}
          aria-label={lang.name}
          disabled={lang.code === disabledValue}
          className="data-[state=on]:bg-[#8b5cf6] data-[state=on]:text-white dark:data-[state=on]:bg-[#8b5cf6] dark:data-[state=on]:text-white"
        >
          <lang.flag />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default LanguageToggleGroup;
