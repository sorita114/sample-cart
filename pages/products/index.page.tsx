import { useRouter, withRouter } from 'next/router';
import React, {FC, useCallback, useEffect, useState } from 'react';
import List from '@pages/products/components/list';
import { ProductItem } from '@type/dto';
import axios from 'axios';
import { useQuery } from 'react-query';
import Spinner from '@/@components/spinner';

const Products: FC= () => {
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(5)
  const [products, setProducts] = useState<ProductItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const router = useRouter();

  useQuery<ProductItem[], Error>([`/products?page=${page}&limit=${limit}`], () => {
    return axios.get(`/datas/products.json?page=${page}&limit=${limit}`).then((res) => res.data)
  }, {
    onSuccess: async (res) => {
      await setIsLoading(true)
      await setProducts((prev) => {
        const start = (page - 1) * limit;
        const end = start + limit;

        const _next: ProductItem[] = res.slice(start, end)
        return prev.concat(_next)
      })

      await setTotalCount(res.length)
      await setIsLoading(false)
    },
    enabled: page > 0
  })
  
  const handlerIntersect: IntersectionObserverCallback  = ([{isIntersecting }]) => {
    if(isIntersecting && !isLoading) {
      if(!isEnd()) {
        setIsLoading(true)
        router.push(`/products?page=${page + 1}&limit=${limit}`, undefined, {scroll: false})
      }
    }
  }

  const isEnd = () => {
    return products.length === totalCount
  }

  useEffect(() => {
    if(page === 0) {
      router.push(`/products?page=${page + 1}&limit=${limit}`, undefined, {scroll: false})
    }
  }, [])

  useEffect(() => {
    if(router && router.query) {

      const {page, limit} = router.query;

      setPage(page ? Number(page) : 0)
      setLimit(limit ? Number(limit) : 5)
    }
  }, [router])

  return (
    <section>
      <List products={products} />
      {!isLoading && !isEnd() && (
        <Spinner<ProductItem[]> onIntersect={handlerIntersect} page={page} data={products} />
      )}
    </section>
  )
}

export default withRouter(Products)