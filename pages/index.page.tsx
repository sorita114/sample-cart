import React, {FC} from 'react'
import Products from '@pages/products/index.page'
import Link from 'next/link'

const Home: FC = () => {
  return (
      <main>
        <Link href='/products'>
          /products
        </Link>
      </main>
  )
}

export default Home
