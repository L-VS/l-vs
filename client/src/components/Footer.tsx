import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Logo } from './Logo';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { href: '#home', label: t('navigation.home') },
    { href: '#projects', label: t('navigation.projects') },
    { href: '#about', label: t('navigation.about') },
    { href: '#contact', label: t('navigation.contact') }
  ];

  const legalLinks = [
    { href: '#', label: t('footer.privacy') },
    { href: '#', label: t('footer.terms') },
    { href: '#', label: t('footer.cookies') }
  ];

  const socialLinks = [
    { href: '#', label: 'GitHub', icon: <Github className="h-5 w-5" /> },
    { href: '#', label: 'LinkedIn', icon: <Linkedin className="h-5 w-5" /> },
    { href: '#', label: 'Twitter', icon: <Twitter className="h-5 w-5" /> }
  ];

  return (
    <footer className="bg-black text-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="text-2xl font-bold mb-2">L-VS</div>
            <p className="text-gray-400 max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
            <div>
              <h3 className="text-lg font-medium mb-4">{t('footer.navigation')}</h3>
              <ul className="space-y-2">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">{t('footer.legal')}</h3>
              <ul className="space-y-2">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">{t('footer.connect')}</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors" 
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} L-VS. {t('footer.copyright')}
          </p>
          
          <p className="text-gray-400 text-sm mt-4 md:mt-0 flex items-center">
            <span className="mr-2">{t('footer.made_with')}</span>
            <Heart className="h-4 w-4 text-white fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
}
