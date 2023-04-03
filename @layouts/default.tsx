import React, { FC, ReactNode } from 'react';

type Props = { children: React.ReactNode };

const DefaultLayout: FC<Props> = ({children}) => {
  return (
    <main>{children}</main>
  )
}

export default DefaultLayout