import type { FC } from 'react';
import { useContext } from 'react';
import Image from 'next/image';
import type { ProductItem } from '@type/dto';
import { GlobalMyCartContext } from '@pages/_app.page';


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
    <section key={myCarts?.length}>
      <ul>
        {products.map((item, index) => <li key={index}>
          <section>
            <div>
              <Image src={item.detail_image_url} alt={item.item_name} width={500} height={500} />
            </div>
            <header>{item.item_name}</header>
            <div>
              <strong>{item.price}</strong>
              <button onClick={() => handleClick(item)} disabled={!isAddCart(item) && disabledAddCart()}>{`${isAddCart(item) ? "장바구니 제거" : "장바구니담기"}`}</button>
            </div>
          </section>
        </li>
        )}
      </ul>
    </section>
  );
};

export default List;