import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useCallback } from 'react';

export function useTranslation() {
  const { t, i18n } = useI18nTranslation();

  const changeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
  }, [i18n]);

  const getCurrentLanguage = useCallback(() => {
    return i18n.language;
  }, [i18n]);

  // Function to convert string with <br> tags to React elements
  const tHtml = useCallback((key: string) => {
    const text = t(key);
    // We need to handle this differently to avoid JSX in .ts file
    if (text.includes('<br>')) {
      // Create a plain object that React will recognize instead of using JSX syntax
      return { 
        type: 'span', 
        props: { 
          dangerouslySetInnerHTML: { __html: text } 
        } 
      };
    }
    return text;
  }, [t]);

  return {
    t,
    tHtml,
    i18n,
    changeLanguage,
    getCurrentLanguage
  };
}
