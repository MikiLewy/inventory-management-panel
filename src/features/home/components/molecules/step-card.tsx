'use client';

import { type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const StepCard = ({ icon: Icon, title, description, className }: StepCardProps) => {
  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <div className="relative mb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full dark:bg-white/90 bg-black/90 text-primary-foreground">
          <Icon className="h-8 w-8 dark:text-black text-white" />
        </div>
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
