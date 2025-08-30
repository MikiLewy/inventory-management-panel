import { Step, StepValue } from '../step';

export const getStepsWithStepValue = (steps: Step[], currentStep: string) => {
  return steps.map(step => {
    switch (true) {
      case currentStep === step.step:
        return { ...step, value: StepValue.ACTIVE };
      case currentStep < step.step:
        return { ...step, value: StepValue.INACTIVE };
      case currentStep > step.step:
        return { ...step, value: StepValue.COMPLETE };
      default:
        return { ...step, value: StepValue.INACTIVE };
    }
  });
};
