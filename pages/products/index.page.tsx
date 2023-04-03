import { ProductItemsResult } from '@/@types/dto';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import React, {FC, useEffect, useState} from 'react';

const Products: FC= () => {
  const [productItems, setProductItems] = useState<ProductItemsResult>();
  const [index, setIndex] = useState<number>(0)
  const [limit, setLimit] = useState<number>(5)
  const router = useRouter();

  useEffect(() => {
    if(router) {
      const {index, limit} = router.query;

      setIndex(Number(index));
      setLimit(Number(limit));
    }
  }, [router])

  const {isLoading, data} = useQuery([`/products?index=${index}&limit=${limit}`], () => {
    return []
  })

  console.log(isLoading)
  return (
    <section>Products</section>
  )
}

export default Products