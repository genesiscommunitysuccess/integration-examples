import React, { ReactNode } from 'react';
import './SimpleLayout.css';
import AppFooter from '../../components/AppFooter/AppFooter';

interface SimpleLayoutProps {
  children: ReactNode;
}

const SimpleLayout: React.FC<SimpleLayoutProps> = ({ children }) => (
  <zero-design-system-provider>
    <section className="content">
      {children}
    </section>
    <AppFooter></AppFooter>
  </zero-design-system-provider>
);

export default SimpleLayout;
