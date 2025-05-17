import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSelector() {
  const { changeLanguage, getCurrentLanguage } = useTranslation();
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage().toUpperCase().substring(0, 2));

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'de', label: 'Deutsch' }
  ];

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setCurrentLang(langCode.toUpperCase().substring(0, 2));
  };

  useEffect(() => {
    setCurrentLang(getCurrentLanguage().toUpperCase().substring(0, 2));
  }, [getCurrentLanguage]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-black bg-white hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-900">
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">{currentLang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-900 dark:border-gray-700">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center justify-between text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span>{lang.label}</span>
            {currentLang === lang.code.toUpperCase().substring(0, 2) && (
              <span className="h-2 w-2 rounded-full bg-black dark:bg-white" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
