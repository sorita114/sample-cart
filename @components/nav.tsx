import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {FC} from 'react';
import { css } from '@emotion/react';


const Nav: FC = () => {
  const router = useRouter();

  const handleMyCart = () => {
    router.push('/cart')
  }
  return (
    <section css={styled}>
      <nav>
        <Link href='/products' className="linker">
          상품
        </Link>
      </nav>
      <button onClick={() => handleMyCart()}>
        <span>My Cart</span>
      </button>
    </section>
  )
}

const styled = css({
  display: 'flex',
  '.liner': {
    textDecoration: 'none'
  },
  'button': {
    marginLeft: 'auto'
  }
})
export default Nav