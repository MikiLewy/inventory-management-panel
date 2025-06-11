interface Props {
  children: React.ReactNode;
}

export const StepContent = ({ children }: Props) => {
  return <div className="flex flex-col grow gap-4 w-full h-full">{children}</div>;
};
