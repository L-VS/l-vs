import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Accessibility, Eye, Type } from 'lucide-react';
import { Label } from '@/components/ui/label';

// Types of accessibility features
export type AccessibilityOptions = {
  colorblindMode: boolean;
  highContrast: boolean;
  dyslexicFont: boolean;
};

// Default options
const defaultOptions: AccessibilityOptions = {
  colorblindMode: false,
  highContrast: false,
  dyslexicFont: false,
};

export function AccessibilityMenu() {
  const { t } = useTranslation();
  const [options, setOptions] = useState<AccessibilityOptions>(defaultOptions);
  const [open, setOpen] = useState(false);

  // Load saved preferences from localStorage on mount
  useEffect(() => {
    const savedOptions = localStorage.getItem('accessibility-options');
    if (savedOptions) {
      setOptions(JSON.parse(savedOptions));
    }
  }, []);

  // Apply accessibility changes when options change
  useEffect(() => {
    // Store preferences in localStorage
    localStorage.setItem('accessibility-options', JSON.stringify(options));

    // Apply classes to html element
    const htmlElement = document.documentElement;
    
    // Apply colorblind mode
    if (options.colorblindMode) {
      htmlElement.classList.add('colorblind-mode');
    } else {
      htmlElement.classList.remove('colorblind-mode');
    }
    
    // Apply high contrast
    if (options.highContrast) {
      htmlElement.classList.add('high-contrast');
    } else {
      htmlElement.classList.remove('high-contrast');
    }
    
    // Apply dyslexic font
    if (options.dyslexicFont) {
      htmlElement.classList.add('dyslexic-font');
    } else {
      htmlElement.classList.remove('dyslexic-font');
    }
  }, [options]);

  // Toggle individual options
  const toggleOption = (key: keyof AccessibilityOptions) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Reset all options to default
  const resetOptions = () => {
    setOptions(defaultOptions);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10 bg-black text-white accessibility-button"
          aria-label={t('accessibility.toggle_menu')}
        >
          <Accessibility className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <h4 className="font-medium leading-none mb-4 flex items-center gap-2">
            <Accessibility className="h-4 w-4" />
            {t('accessibility.toggle_menu')}
          </h4>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <Label htmlFor="colorblind">{t('accessibility.colorblind_mode')}</Label>
            </div>
            <Switch
              id="colorblind"
              checked={options.colorblindMode}
              onCheckedChange={() => toggleOption('colorblindMode')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <Label htmlFor="contrast">{t('accessibility.high_contrast')}</Label>
            </div>
            <Switch
              id="contrast"
              checked={options.highContrast}
              onCheckedChange={() => toggleOption('highContrast')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Type className="h-4 w-4" />
              <Label htmlFor="dyslexic">{t('accessibility.dyslexic_font')}</Label>
            </div>
            <Switch
              id="dyslexic"
              checked={options.dyslexicFont}
              onCheckedChange={() => toggleOption('dyslexicFont')}
            />
          </div>
          
          {(options.colorblindMode || options.highContrast || options.dyslexicFont) && (
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={resetOptions}
            >
              {t('accessibility.normal_mode')}
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}