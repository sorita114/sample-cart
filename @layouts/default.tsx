import React, { FC, ReactNode, createContext } from 'react';
import { ProductItem } from '@types/dto';

type Props = { children: ReactNode };

const MyCartContext = createContext<ProductItem[]>([])

const MyCartProvider: FC<Props> = ({children}) => {
  return <MyCartContext.Provider value={[]}>{children}</MyCartContext.Provider>
}

const DefaultLayout: FC<Props> = ({children}) => {
  return (
    <MyCartProvider>
      <main>{children}</main>
    </MyCartProvider>
  )
}

export default DefaultLayout