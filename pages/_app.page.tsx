import '@styles/globals.css';
import type { AppProps } from 'next/app';
import type { Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@emotion/react';
import DefaultLayout from '@layouts/default';
import type { ProductItem } from '@type/dto';
import theme from '@styles/theme';

interface IGlobalMyCartContext{
  myCarts?:ProductItem[];
  setMyCarts?:Dispatch<SetStateAction<ProductItem[]>>;
}

export const GlobalMyCartContext = createContext<IGlobalMyCartContext>({});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const App = ({ Component, pageProps }:AppProps) => {
  const [ myCarts, setMyCarts ] = useState<ProductItem[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalMyCartContext.Provider value={{ myCarts, setMyCarts }}>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </GlobalMyCartContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;