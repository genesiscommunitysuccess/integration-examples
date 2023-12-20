import React, { ReactNode } from 'react';
import './BlankLayout.css';

interface BlankLayoutProps {
  children: ReactNode;
}

const BlankLayout: React.FC<BlankLayoutProps> = ({ children }) => (
  <zero-design-system-provider>
    <section className="content">
    {children}
    </section>
  </zero-design-system-provider>
);

export default BlankLayout;