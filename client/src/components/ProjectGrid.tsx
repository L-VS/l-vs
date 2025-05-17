import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '@/hooks/useTranslation';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Project } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from './LoadingSpinner';

export function ProjectGrid() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['/api/projects'],
  });

  const filterProjects = (projects: Project[] | undefined, filter: string) => {
    if (!projects) return [];
    return filter === 'all' 
      ? projects 
      : projects.filter(project => project.category.toLowerCase() === filter.toLowerCase());
  };

  const filteredProjects = filterProjects(projects, filter);

  const handleOpenProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsModalOpen(false);
  };

  const categories = [
    { value: 'all', label: t('projects.filters.all') },
    { value: 'web', label: t('projects.filters.web') },
    { value: 'mobile', label: t('projects.filters.mobile') },
    { value: 'design', label: t('projects.filters.design') }
  ];

  return (
    <section id="projects" className="py-20 sm:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">{t('projects.title')}</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">{t('projects.subtitle')}</p>
        </div>

        {/* Project Filters */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              onClick={() => setFilter(category.value)}
              variant={filter === category.value ? 'default' : 'outline'}
              className={`px-5 py-2 rounded-full ${
                filter === category.value
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">Error loading projects. Please try again later.</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">{t('projects.empty')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => handleOpenProjectModal(project)}
              />
            ))}
          </div>
        )}

        <div className="text-center">
          <Button
            variant="outline"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-900 bg-white hover:bg-gray-50 transition-colors duration-200 group"
          >
            <span>{t('projects.view_all')}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Button>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseProjectModal}
          project={selectedProject}
        />
      )}
    </section>
  );
}
