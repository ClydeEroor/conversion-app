import React, { ReactNode } from 'react';
import Header from '@/src/components/Header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={'flex flex-col w-full h-[100vh] '}>
      <Header />
      <div className={'w-full h-full flex flex-col justify-center '}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
