import React from 'react';

import { Step } from '../atoms/stepper/step/step';
import { getStepsWithStepValue } from '../atoms/stepper/step/utils/get-steps-with-step-value';
import { StepConnector } from '../atoms/stepper/step-connector';
import { StepIndicator } from '../atoms/stepper/step-indicator';

interface Context {
  step: string;
  content: string;
}

interface StepperProps {
  steps: Step[];
  context: Context;
}

export default function Stepper({ steps, context }: StepperProps) {
  const mappedSteps = getStepsWithStepValue(steps, context.step);

  return (
    <div className="flex w-full items-center">
      {mappedSteps.map(step => {
        const isNotLastStep = steps.length !== +step.step;

        return (
          <React.Fragment key={step.key}>
            <StepIndicator step={+step.step} value={step.value} />

            {isNotLastStep && <StepConnector value={step.value} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
