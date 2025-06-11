import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
import { useTheme } from 'next-themes';

import { StepValue } from './step/step';

interface StepConnectorProps {
  value: StepValue;
}

export const StepConnector = ({ value }: StepConnectorProps) => {
  const { theme } = useTheme();

  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: 'transparent' },
    complete: { width: '100%', backgroundColor: theme === 'dark' ? '#41a772' : '#63ca63' },
  };

  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-neutral-300 dark:bg-neutral-600">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={value === StepValue.COMPLETE ? 'complete' : 'incomplete'}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
};
