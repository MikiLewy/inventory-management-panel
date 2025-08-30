import { ReactNode } from 'react';

interface Props {
  title: string;
  children?: ReactNode;
  description?: string;
}

const PageHeader = ({ title, children, description }: Props) => {
  return (
    <header className="flex items-center justify-between mt-3 mb-8">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-2xl font-semibold">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </header>
  );
};

export default PageHeader;
