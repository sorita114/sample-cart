import { FC } from 'react';
import Link from 'next/link';

const Home: FC = () => {
  return (
      <main>
        <Link href='/products'>
          /products
        </Link>
      </main>
  )
}

export default Home;
