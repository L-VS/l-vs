import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const { tHtml, t } = useTranslation();
  
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[calc(100vh-4rem)] flex items-center bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white mb-6 leading-tight transition-colors duration-300" 
              dangerouslySetInnerHTML={{ __html: t('hero.title') }}>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl transition-colors duration-300">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="default" 
                onClick={scrollToProjects}
                className="bg-black hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-white dark:text-black text-white rounded-full px-6 py-3 transition-colors duration-300"
              >
                {t('hero.cta')}
              </Button>
              <Button 
                variant="outline"
                onClick={scrollToContact}
                className="border-gray-300 text-gray-900 dark:border-gray-600 dark:text-gray-200 rounded-full px-6 py-3 transition-colors duration-300"
              >
                {t('hero.secondary_cta')}
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, filter: "blur(15px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=1200&q=80" 
              alt="Abstract digital art representation" 
              className="w-full h-auto rounded-3xl shadow-lg"
            />
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 12, 0], opacity: [0.7, 1, 0.7], filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <button 
          onClick={scrollToProjects} 
          className="text-black dark:text-white bg-white dark:bg-black rounded-full p-2 shadow-lg"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </motion.div>
    </section>
  );
}
