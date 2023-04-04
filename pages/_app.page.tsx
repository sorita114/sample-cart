import '@styles/globals.css';
import DefaultLayout from '@layouts/default';
import type { AppProps } from 'next/app';
import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ProductItem } from '@type/dto';

interface IGlobalMyCartContext {
  myCarts?: ProductItem[]
  setMyCarts?: Dispatch<SetStateAction<ProductItem[]>>
};

export const GlobalMyCartContext = createContext<IGlobalMyCartContext>({});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

const App = ({ Component, pageProps }: AppProps) => {
  const [myCarts, setMyCarts] = useState<ProductItem[]>([]);
 
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalMyCartContext.Provider value={{myCarts, setMyCarts}}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </GlobalMyCartContext.Provider>
    </QueryClientProvider>
  )
}

export default App;
