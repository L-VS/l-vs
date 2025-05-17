import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Project } from '@shared/schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Button 
            onClick={onClick} 
            variant="default" 
            className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium"
          >
            <Eye className="h-4 w-4 mr-2" />
            {t('projects.view_details')}
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-black">{project.title}</h3>
          <Badge variant="outline" className="px-2 py-1 bg-gray-100 text-xs font-medium rounded-full text-gray-700">
            {project.category}
          </Badge>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech, index) => (
            <Badge key={index} variant="secondary" className="px-2 py-1 bg-gray-100 text-xs font-medium rounded-full text-gray-700">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
