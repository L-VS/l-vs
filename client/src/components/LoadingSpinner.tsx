import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  const { t } = useTranslation();
  
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4'
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeClasses[size]} border-gray-200 border-t-black rounded-full animate-spin`} />
      <span className="mt-4 text-gray-600">{t('loader.loading')}</span>
    </div>
  );
}
