import React, { ReactNode } from 'react';

interface SimpleLayoutProps {
  children: ReactNode;
}

const SimpleLayout: React.FC<SimpleLayoutProps> = ({ children }) => (
  <div>
    <header>Simple Header</header>
    {children}
  </div>
);

export default SimpleLayout;
