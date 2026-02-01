'use client';

import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface FeatureShowcaseProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  screenshotLabel: string;
  screenshotPlaceholder: string;
  imagePosition?: 'left' | 'right';
  className?: string;
  imageSrc?: string;
  imageSrcDark?: string;
}

export const FeatureShowcase = ({
  icon: Icon,
  title,
  description,
  features,
  screenshotLabel,
  screenshotPlaceholder,
  imagePosition = 'right',
  className,
  imageSrc,
  imageSrcDark,
}: FeatureShowcaseProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const contentOrder = imagePosition === 'left' ? 'md:order-2' : 'md:order-1';
  const imageOrder = imagePosition === 'left' ? 'md:order-1' : 'md:order-2';

  return (
    <div className={cn('grid grid-cols-1 items-center gap-12 lg:gap-16 md:grid-cols-2', className)}>
      <motion.div
        className={cn('flex flex-col', contentOrder)}
        initial={{ opacity: 0, x: imagePosition === 'left' ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mb-4 text-2xl font-semibold md:text-3xl">{title}</h3>
        <p className="mb-6 text-lg text-muted-foreground">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        className={cn('flex items-center justify-center', imageOrder)}
        initial={{ opacity: 0, x: imagePosition === 'left' ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}>
        {imageSrc && imageSrcDark ? (
          <div className="relative overflow-hidden rounded-xl border border-border  bg-background shadow-lg">
            <Image
              src={isDark ? imageSrcDark : imageSrc}
              alt={title}
              width={1200}
              height={600}
              className="h-auto w-full"
            />
          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-border bg-muted text-center text-muted-foreground">
            <div>
              <p className="text-sm font-medium">{screenshotLabel}</p>
              <p className="mt-1 text-xs">{screenshotPlaceholder}</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
