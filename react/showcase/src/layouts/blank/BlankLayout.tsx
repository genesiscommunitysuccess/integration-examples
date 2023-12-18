import React, { ReactNode } from 'react';

interface BlankLayoutProps {
  children: ReactNode;
}

const BlankLayout: React.FC<BlankLayoutProps> = ({ children }) => <div>{children}</div>;

export default BlankLayout;