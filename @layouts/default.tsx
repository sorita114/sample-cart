import type { FC, ReactNode } from 'react';
import Nav from '@components/nav';
import { css } from '@emotion/react';

type Props = { children: ReactNode };

const DefaultLayout:FC<Props> = ({ children }) => (
  <main css={styled}>
    <Nav />
    <section>
      {children}
    </section>
  </main>
);

const styled = css({
  '> section': {
    padding: '0 50px'
  }
});

export default DefaultLayout;