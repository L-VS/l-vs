import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { insertProjectSchema, Project } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const stringToArray = (value: string): string[] => {
  return value.split(',').map(item => item.trim()).filter(Boolean);
};

const arrayToString = (arr: string[] | undefined): string => {
  return Array.isArray(arr) ? arr.join(', ') : '';
};

// Convert schema to support string inputs for arrays
const projectFormSchema = insertProjectSchema
  .extend({
    technologies: z.string(),
    challenges: z.string(),
    solutions: z.string(),
  });

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function ProjectForm({ project, onSubmit, onCancel, isSubmitting }: ProjectFormProps) {
  const { t } = useTranslation();
  const { toast } = useToast();

  // Transform project data for the form
  const defaultValues: Partial<ProjectFormValues> = project
    ? {
        title: project.title,
        description: project.description,
        category: project.category,
        imageUrl: project.imageUrl,
        technologies: arrayToString(project.technologies),
        challenges: arrayToString(project.challenges),
        solutions: arrayToString(project.solutions),
        projectUrl: project.projectUrl || '',
        featured: project.featured,
      }
    : {
        title: '',
        description: '',
        category: 'web',
        imageUrl: '',
        technologies: '',
        challenges: '',
        solutions: '',
        projectUrl: '',
        featured: false,
      };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  });

  const handleSubmit = (values: ProjectFormValues) => {
    // Convert string fields to arrays
    const transformedData = {
      ...values,
      technologies: stringToArray(values.technologies),
      challenges: stringToArray(values.challenges),
      solutions: stringToArray(values.solutions),
    };
    
    onSubmit(transformedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('admin.projects.form.title')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('admin.projects.form.category')}</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="web">{t('projects.filters.web')}</SelectItem>
                    <SelectItem value="mobile">{t('projects.filters.mobile')}</SelectItem>
                    <SelectItem value="design">{t('projects.filters.design')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('admin.projects.form.description')}</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('admin.projects.form.image_url')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('admin.projects.form.technologies')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  {t('admin.projects.form.technologies')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('admin.projects.form.project_url')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="challenges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('admin.projects.form.challenges')}</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    rows={3}
                  />
                </FormControl>
                <FormDescription>
                  {t('admin.projects.form.challenges')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="solutions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('admin.projects.form.solutions')}</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    rows={3}
                  />
                </FormControl>
                <FormDescription>
                  {t('admin.projects.form.solutions')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t('admin.projects.form.featured')}
                </FormLabel>
                <FormDescription>
                  This project will be featured on the homepage
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            {t('admin.projects.form.cancel')}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              t('admin.projects.form.submit')
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
