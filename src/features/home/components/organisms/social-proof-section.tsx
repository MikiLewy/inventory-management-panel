'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useI18n } from '@/locales/client';

import { AnimatedElement } from '../atoms/animated-element';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const SocialProofSection = () => {
  const t = useI18n();

  const testimonials = [
    {
      quoteKey: 'home.socialProof.testimonial1.quote' as const,
      nameKey: 'home.socialProof.testimonial1.name' as const,
      roleKey: 'home.socialProof.testimonial1.role' as const,
      initials: 'AJ',
    },
    {
      quoteKey: 'home.socialProof.testimonial2.quote' as const,
      nameKey: 'home.socialProof.testimonial2.name' as const,
      roleKey: 'home.socialProof.testimonial2.role' as const,
      initials: 'MG',
    },
    {
      quoteKey: 'home.socialProof.testimonial3.quote' as const,
      nameKey: 'home.socialProof.testimonial3.name' as const,
      roleKey: 'home.socialProof.testimonial3.role' as const,
      initials: 'DC',
    },
  ];

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <AnimatedElement>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">{t('home.socialProof.title')}</h2>
            <p className="text-lg text-muted-foreground">{t('home.socialProof.subtitle')}</p>
          </div>
        </AnimatedElement>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col pt-6">
                  <Quote className="mb-4 h-8 w-8 text-primary/40" />
                  <p className="mb-6 flex-1 text-muted-foreground">{t(testimonial.quoteKey)}</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{t(testimonial.nameKey)}</p>
                      <p className="text-sm text-muted-foreground">{t(testimonial.roleKey)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
