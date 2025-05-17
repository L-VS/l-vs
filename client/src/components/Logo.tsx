import React from 'react';
import { Link } from 'wouter';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/">
      <a className={`font-bold text-2xl text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-200 transition-colors ${className}`}>
        L-VS
      </a>
    </Link>
  );
}
