import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export interface Step {
  key: string;
  step: string;
}

export enum StepValue {
  COMPLETE = 'complete',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const Step = ({ children }: Props) => {
  return <div className="px-8">{children}</div>;
};
