import { useRouter } from 'next/router';
import React, {FC, useEffect, useState, useRef} from 'react';
import List from '@pages/products/components/list';
import { ProductItem } from '@types/dto';
import axios from 'axios';
import { useQuery } from 'react-query';

const Products: FC= () => {
  const [index, setIndex] = useState<number>(0)
  const [limit, setLimit] = useState<number>(5)
  const [products, setProducts] = useState<ProductItem[]>([])
  const router = useRouter();
  const $ref = useRef<HTMLElement>(null)

  const {isLoading, data} = useQuery<ProductItem[], Error>([`/products?index=${index}&limit=${limit}`], () => {
    return axios.get('/datas/products.json').then((res) => res.data)
  }, {
    enabled: !!router,
  })

  useEffect(() => {
    if(router) {
      const {index, limit} = router.query;

      setIndex(Number(index));
      setLimit(Number(limit));
    }
  }, [router])

  useEffect(() => {
    if(data) {
      setProducts((prev) => {
        const start = index * limit;
        const end = start + limit;

        const _next: ProductItem[] = data.slice(start, end)
        return prev.concat(_next)
      })
    }
  }, [data, index, limit]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement
      if (window.innerHeight + scrollTop >= offsetHeight) {
        if(data && data.length <= index * limit) {
          return;
        }
        router.push(`/products?index=${index + 1}&limit=${limit}`, undefined, {scroll: false})
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [index, data])

  return (
    <section ref={$ref}>
      <List products={products} isLoading={isLoading}/>
    </section>
  )
}

export default Products