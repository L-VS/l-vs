import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { AccessibilityMenu } from './AccessibilityMenu';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHomePage = location === '/';

  const navigationItems = [
    { label: t('navigation.home'), id: 'home', href: '/' },
    { label: t('navigation.projects'), id: 'projects', href: '/#projects' },
    { label: t('navigation.about'), id: 'about', href: '/#about' },
    { label: t('navigation.contact'), id: 'contact', href: '/#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Logo />
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <React.Fragment key={item.id}>
                {isHomePage ? (
                  <button 
                    onClick={() => scrollToSection(item.id)}
                    className={`text-gray-900 hover:text-black dark:text-gray-200 dark:hover:text-white font-medium transition-colors duration-200 ${
                      location === item.href ? 'font-semibold' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <a 
                    href={item.href}
                    className="text-gray-900 hover:text-black dark:text-gray-200 dark:hover:text-white font-medium transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                )}
              </React.Fragment>
            ))}
            
            {isAuthenticated && (
              <a 
                href="/admin" 
                className="text-gray-900 hover:text-black dark:text-gray-200 dark:hover:text-white font-medium transition-colors duration-200"
              >
                {t('navigation.admin')}
              </a>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            <AccessibilityMenu />
            <ThemeToggle />
            <LanguageSelector />
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden ml-4 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationItems.map((item) => (
                <React.Fragment key={item.id}>
                  {isHomePage ? (
                    <button 
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a 
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    >
                      {item.label}
                    </a>
                  )}
                </React.Fragment>
              ))}
              
              {isAuthenticated && (
                <a 
                  href="/admin" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  {t('navigation.admin')}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
