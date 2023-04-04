import Nav from '@components/nav';
import React, { FC, ReactNode } from 'react';

type Props = { children: ReactNode };

const DefaultLayout: FC<Props> = ({children}) => {
  return (
    <main>
      <Nav />
      {children}
    </main>
  )
}

export default DefaultLayout