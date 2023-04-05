import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect, useState, useContext } from 'react';
import { css } from '@emotion/react';
import theme from '@styles/theme';
import { GlobalMyCartContext } from '@pages/_app.page';


const Nav:FC = () => {
  const router = useRouter();
  const { myCarts } = useContext(GlobalMyCartContext);
  const { pathname } = router;
  const [categories, setCategories] = useState<{name: string, url: string}[]>([]);

  const handleMyCart = () => {
    router.push("/cart");
  };

  useEffect(() => {
    setCategories([{ name: '상품', url: '/products'}]);
  }, []);

  return (
    <section css={styled}>
      <nav>
        {categories.map((category, index) => (
          <Link key={index} href={category.url} className={`${pathname.includes("products") ? 'linker active' : 'linker'}`}>
            {category.name}
          </Link>
        ))}
      </nav>
      <button onClick={() => handleMyCart()} className={`${pathname.includes("cart") ? 'active' : ''}`}>
        <span>My Cart</span>
        {Boolean(myCarts?.length) && (
          <span>{myCarts?.length}</span>
        )}
      </button>
    </section>
  );
};

const styled = css({
  height: 50,
  display: 'flex',
  alignItems: 'center',
  '.linker': {
    fontSize: '1.5rem',
    textDecoration: 'none',
    color: `${theme.colors.black}`,
    padding: '10px 0',
    '&:hover': {
      fontWeight: 'bold',
      borderBottom: `2px solid ${theme.colors.black}`
    },
    '&.active': {
      fontWeight: 'bold',
      borderBottom: `2px solid ${theme.colors.black}`
    }
  },
  '> button': {
    marginLeft: 'auto',
    fontSize: '0.9rem',
    backgroundColor: `${theme.colors.white}`,
    border: `1px solid ${theme.colors.black}`,
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    gap: 5,
    '&:hover': {
      fontWeight: 'bold',
      border: `1px solid ${theme.colors.black}`
    },
    '&.active': {
      fontWeight: 'bold',
      border: `2px solid ${theme.colors.black}`
    }
  }
});
export default Nav;