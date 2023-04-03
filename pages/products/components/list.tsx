import React, {FC} from 'react';
import { ProductItem } from '@types/dto';
import Image from 'next/image'


type Props = {
  products: ProductItem[],
  isLoading: boolean
}

const List:FC<Props> = ({products, isLoading}) => {
  return (
    <section>
      <ul>
      {!isLoading ? (
        <>
        {products.map((item, index) => 
          <li key={index}>
            <section>
              <div>
                <Image src={item.detail_image_url} alt={item.item_name} width={500} height={500}/>
              </div> 
              <header>{item.item_name}</header>
              <div>
                <strong>{item.price}</strong>
                <button>123</button>
              </div>
            </section>
          </li>
        )}
        </>
      ) : (
        <li>Loading...</li>
      )}
      </ul>
    </section>
  )
}

export default List;