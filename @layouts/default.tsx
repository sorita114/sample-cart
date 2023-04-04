import type { FC, ReactNode } from 'react';
import Nav from '@components/nav';

type Props = { children: ReactNode };

const DefaultLayout:FC<Props> = ({ children }) => (
  <main>
    <Nav />
    {children}
  </main>
);

export default DefaultLayout;