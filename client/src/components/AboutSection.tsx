import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { 
  Code, 
  Server, 
  Smartphone, 
  Ruler, 
  Database, 
  Cloud,
  Download
} from 'lucide-react';

export function AboutSection() {
  const { t } = useTranslation();

  const skillItems = [
    { icon: <Code className="h-5 w-5 text-black" />, text: t('about.skills.frontend') },
    { icon: <Server className="h-5 w-5 text-black" />, text: t('about.skills.backend') },
    { icon: <Smartphone className="h-5 w-5 text-black" />, text: t('about.skills.mobile') },
    { icon: <Ruler className="h-5 w-5 text-black" />, text: t('about.skills.design') },
    { icon: <Database className="h-5 w-5 text-black" />, text: t('about.skills.database') },
    { icon: <Cloud className="h-5 w-5 text-black" />, text: t('about.skills.cloud') }
  ];

  return (
    <section id="about" className="py-20 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            className="w-full lg:w-1/2 order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">{t('about.title')}</h2>
            <div className="space-y-4 text-gray-700">
              <p>{t('about.paragraph1')}</p>
              <p>{t('about.paragraph2')}</p>
              <p>{t('about.paragraph3')}</p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold text-black mb-4">{t('about.skills_title')}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {skillItems.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {skill.icon}
                    <span>{skill.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <Button variant="link" className="flex items-center text-black font-medium hover:underline">
                <span>{t('about.download_cv')}</span>
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-5/12 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80" 
                alt="Developer workspace" 
                className="w-full h-auto rounded-3xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-black rounded-2xl flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-xs uppercase tracking-wider">Years<br/>Experience</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
