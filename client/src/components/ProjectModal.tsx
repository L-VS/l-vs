import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Project } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ExternalLink } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          onClick={onClose}
        >
          <motion.div
            className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl max-w-4xl w-full"
            variants={contentVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="bg-white rounded-full p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="p-6 sm:p-10">
              <div>
                <div className="mb-8">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-black">{project.title}</h2>
                  <Badge className="px-3 py-1 bg-gray-100 text-sm font-medium rounded-full text-gray-700">
                    {project.category}
                  </Badge>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-black mb-3">{t('projects.overview')}</h3>
                  <p className="text-gray-700">{project.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-black mb-3">{t('projects.challenges')}</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {project.challenges?.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-3">{t('projects.solutions')}</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {project.solutions?.map((solution, index) => (
                        <li key={index}>{solution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8">
                  {project.projectUrl && (
                    <Button
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-black hover:bg-gray-900 transition-colors duration-200"
                      as="a"
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{t('projects.visit_site')}</span>
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
