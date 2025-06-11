import { CheckIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

import { StepValue } from './step/step';

interface Props {
  step: number;
  value: StepValue;
}

export const StepIndicator = ({ step, value }: Props) => {
  const { theme } = useTheme();

  return (
    <motion.div className="relative outline-none focus:outline-none" animate={value} initial={false}>
      <motion.div
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: theme === 'dark' ? '#222' : '#d4d4d4',
            color: theme === 'dark' ? '#d4d4d4' : '#222',
          },
          active: {
            scale: 1,
            backgroundColor: theme === 'dark' ? '#41a772' : '#63ca63',
            color: theme === 'dark' ? '#41a772' : '#63ca63',
          },
          complete: {
            scale: 1,
            backgroundColor: theme === 'dark' ? '#41a772' : '#63ca63',
            color: theme === 'dark' ? '#41a772' : '#63ca63',
          },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold">
        {value === StepValue.COMPLETE ? (
          <CheckIcon className="h-4 w-4 dark:text-black text-white" />
        ) : value === StepValue.ACTIVE ? (
          <div className="h-3 w-3 rounded-full dark:bg-[#060606] bg-[#f5f5f5]" />
        ) : (
          <span className="text-sm">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
};
