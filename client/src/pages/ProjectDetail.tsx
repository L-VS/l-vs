import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useRoute } from 'wouter';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function ProjectDetail() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const [match, params] = useRoute('/projects/:id');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate page loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);
  
  const { data: project, isLoading: projectLoading, error } = useQuery({
    queryKey: ['/api/projects', params?.id],
    enabled: !!params?.id,
  });
  
  if (isLoading || projectLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 transition-opacity duration-500">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (error || !project) {
    return (
      <>
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('error.title')}</h1>
          <p className="mb-8">Project not found or an error occurred.</p>
          <Button onClick={() => navigate('/')}>{t('error.back_home')}</Button>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{project.title} | L-VS</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} | L-VS`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.imageUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Navigation />
      
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-8 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          
          <div className="mb-8">
            <img 
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto rounded-3xl shadow-lg object-cover"
              style={{ maxHeight: '600px' }}
            />
          </div>
          
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-4xl font-bold text-black">{project.title}</h1>
            <Badge className="px-3 py-1 bg-gray-100 text-sm font-medium rounded-full text-gray-700">
              {project.category}
            </Badge>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-4">{t('projects.overview')}</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies?.map((tech, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1 bg-gray-100 text-sm font-medium rounded-full text-gray-700">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">{t('projects.challenges')}</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                {project.challenges?.map((challenge, index) => (
                  <li key={index} className="text-base">{challenge}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">{t('projects.solutions')}</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                {project.solutions?.map((solution, index) => (
                  <li key={index} className="text-base">{solution}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {project.projectUrl && (
            <div className="text-center">
              <Button
                size="lg"
                className="px-8 py-6 rounded-full text-white bg-black hover:bg-gray-900 transition-colors duration-200"
                as="a"
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-base">{t('projects.visit_site')}</span>
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}
