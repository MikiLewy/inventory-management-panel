import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const PageContentContainer = ({ children }: Props) => {
  return <div className="flex flex-col grow gap-6">{children}</div>;
};

export default PageContentContainer;
