import '@styles/globals.css'
import DefaultLayout from '@layouts/default'
import type { AppProps } from 'next/app'
import { createContext } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </QueryClientProvider>
  )
}

export default App
