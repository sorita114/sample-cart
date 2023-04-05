import type { FC } from 'react';
import { css } from '@emotion/react';
import { useContext } from 'react';
import Image from 'next/image';
import type { ProductItem } from '@type/dto';
import { GlobalMyCartContext } from '@pages/_app.page';
import currency from '@utils/currency';
import theme from '@styles/theme';

type Props = {
  products: ProductItem[]
};

const List:FC<Props> = ({ products }) => {
  const { myCarts, setMyCarts } = useContext(GlobalMyCartContext);

  const isAddCart = (item:ProductItem) => myCarts?.find(cart => cart.item_no === item.item_no);

  const disabledAddCart = () => myCarts ? myCarts.length >= 3 : false;

  const handleClick = (value:ProductItem) => {
    if(isAddCart(value)){
      const filterdMycart:ProductItem[] = myCarts?.filter(cart => cart.item_no !== value.item_no) || [];

      if(setMyCarts){
        setMyCarts(filterdMycart);
      }
    }else if(setMyCarts){
      setMyCarts(prev => [
        ...prev,
        value
      ]);
    }
  };


  return (
    <section key={myCarts?.length} css={styled}>
      <ul>
        {products.map((item, index) => (
          <li key={index}>
            <section>
              <div>
                <Image src={item.detail_image_url} alt={item.item_name} width={250} height={250} />
              </div>
              <header>{item.item_name}</header>
              <div className="information">
                <strong>{currency(item.price)}</strong>
                <button onClick={() => handleClick(item)} disabled={!isAddCart(item) && disabledAddCart()}>
                  <span>
                    {`${isAddCart(item) ? "Remove" : "Add"}`}
                  </span>
                </button>
              </div>
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
};

const styled = css({
  marginTop: 20,
  '> ul': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
    '> li': {
      width: 250,
      marginBottom: 20,
      'header': {
        marginTop: 5,
        fontWeight: 'bold',
        color: `${theme.colors.gray}`,
        textDecoration: 'underline'
      },
      '.information': {
        marginTop: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '> strong': {
          fontSize: '1.15rem',
          fontWeight: 'bold'
        },
        '> button': {
          backgroundColor: theme.colors.white,
          border: `1px solid ${theme.colors.black}`,
          padding: '5px 10px',
          '&:hover': {
            fontWeight: 'bold'
          }
        }
      }
    }
  }
});

export default List;