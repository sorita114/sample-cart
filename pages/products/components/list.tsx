import React, {FC, useContext} from 'react';
import { ProductItem } from '@type/dto';
import Image from 'next/image'
import { GlobalMyCartContext } from '@pages/_app.page';


type Props = {
  products: ProductItem[]
}

const List:FC<Props> = ({products}) => {
  const {myCarts, setMyCarts} = useContext(GlobalMyCartContext);

  const isAddCart = (item: ProductItem) => {
    return myCarts?.find((cart) => cart.item_no === item.item_no);
  }

  const handleClick = (value: ProductItem) => {
    if(isAddCart(value)) {
      const _mycart: ProductItem[] = myCarts?.filter((cart) => cart.item_no !== value.item_no) || [];

      setMyCarts && setMyCarts(_mycart)
    } else {
      setMyCarts && setMyCarts((prev) => {
        return [
          ...prev,
          value
        ]
      })
    }
  }

  return (
    <section key={myCarts?.length}>
      <ul>
        {products.map((item, index) => 
          <li key={index}>
            <section>
              <div>
                <Image src={item.detail_image_url} alt={item.item_name} width={500} height={500}/>
              </div> 
              <header>{item.item_name}</header>
              <div>
                <strong>{item.price}</strong>
                <button onClick={() => handleClick(item)}>{`${isAddCart(item) ? "장바구니 제거" : "장바구니담기"}`}</button>
              </div>
            </section>
          </li>
        )}
      </ul>
    </section>
  )
}

export default List;