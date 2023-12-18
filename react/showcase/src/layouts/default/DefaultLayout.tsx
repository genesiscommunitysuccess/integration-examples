import React, { ReactNode } from 'react';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => (
  <div>
    <header>Default Header</header>
    <main>{children}</main>
    <footer>Default Footer</footer>
  </div>
);

export default DefaultLayout;
