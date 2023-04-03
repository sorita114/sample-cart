import React, {FC} from 'react';
import { ProductItem } from '@type/dto';
import Image from 'next/image'


type Props = {
  products: ProductItem[]
}

const List:FC<Props> = ({products}) => {
  return (
    <section>
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
                <button>123</button>
              </div>
            </section>
          </li>
        )}
      </ul>
    </section>
  )
}

export default List;