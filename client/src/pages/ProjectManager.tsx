import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { AdminSidebar } from '@/components/AdminSidebar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ProjectForm } from '@/components/ProjectForm';
import { Project } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenSquare, Trash2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

enum FormMode {
  None,
  Add,
  Edit
}

export default function ProjectManager() {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formMode, setFormMode] = useState<FormMode>(FormMode.None);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
    enabled: isAuthenticated,
  });
  
  const createProjectMutation = useMutation({
    mutationFn: (data: any) => {
      return apiRequest('POST', '/api/admin/projects', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setFormMode(FormMode.None);
      toast({
        title: 'Project created successfully',
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        title: 'Failed to create project',
        variant: 'destructive',
        duration: 3000,
      });
    },
  });
  
  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => {
      return apiRequest('PUT', `/api/admin/projects/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setFormMode(FormMode.None);
      setSelectedProject(null);
      toast({
        title: 'Project updated successfully',
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        title: 'Failed to update project',
        variant: 'destructive',
        duration: 3000,
      });
    },
  });
  
  const deleteProjectMutation = useMutation({
    mutationFn: (id: number) => {
      return apiRequest('DELETE', `/api/admin/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setProjectToDelete(null);
      toast({
        title: 'Project deleted successfully',
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        title: 'Failed to delete project',
        variant: 'destructive',
        duration: 3000,
      });
    },
  });
  
  const isLoading = authLoading || projectsLoading;
  const isSubmitting = createProjectMutation.isPending || updateProjectMutation.isPending;
  
  if (authLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    window.location.href = '/api/login';
    return null;
  }
  
  const handleAddProject = () => {
    setSelectedProject(null);
    setFormMode(FormMode.Add);
  };
  
  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setFormMode(FormMode.Edit);
  };
  
  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
  };
  
  const confirmDeleteProject = () => {
    if (projectToDelete) {
      deleteProjectMutation.mutate(projectToDelete.id);
    }
  };
  
  const handleCancelForm = () => {
    setFormMode(FormMode.None);
    setSelectedProject(null);
  };
  
  const handleSubmitForm = (data: any) => {
    if (formMode === FormMode.Add) {
      createProjectMutation.mutate(data);
    } else if (formMode === FormMode.Edit && selectedProject) {
      updateProjectMutation.mutate({ id: selectedProject.id, data });
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Manage Projects - L-VS Admin</title>
      </Helmet>
      
      <div className="flex h-screen">
        <AdminSidebar />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{t('admin.projects.title')}</h1>
            {formMode === FormMode.None && (
              <Button onClick={handleAddProject} className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                {t('admin.projects.add')}
              </Button>
            )}
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : formMode !== FormMode.None ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>
                  {formMode === FormMode.Add ? t('admin.projects.add') : t('admin.projects.edit')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectForm
                  project={selectedProject || undefined}
                  onSubmit={handleSubmitForm}
                  onCancel={handleCancelForm}
                  isSubmitting={isSubmitting}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                {projects && projects.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((project: Project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{project.category}</Badge>
                          </TableCell>
                          <TableCell>{project.featured ? 'Yes' : 'No'}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditProject(project)}
                              >
                                <PenSquare className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteProject(project)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-gray-500 mb-4">No projects found</p>
                    <Button onClick={handleAddProject}>Add your first project</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Delete Project Confirmation Dialog */}
      <AlertDialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.projects.confirm_delete')}</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project
              "{projectToDelete?.title}" from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteProject}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
