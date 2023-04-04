import { ProductItemsResult, ProductItem } from '@type/dto';
import axios from 'axios';
import { useState } from 'react'
import { useQuery } from 'react-query';

type Props = {
  page: number,
  limit: number
}

const useProducts = ({page, limit}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0)

  useQuery<ProductItemsResult, Error>([`/products?page=${page}&limit=${limit}`], () => {
    return axios.get(`/datas/products.json?page=${page}&limit=${limit}`).then((res) => res.data)
  }, {
    onSuccess: async (res) => {
      await setIsLoading(true)
      await setProducts((prev) => {
        const start = (page - 1) * limit;
        const end = start + limit;

        const _next: ProductItem[] = res.sort((prev, next) => next.score - prev.score).slice(start, end)
        return prev.concat(_next)
      })

      await setTotalCount(res.length)
      await setIsLoading(false)
    },
    enabled: page > 0
  })

  return {
    isLoading,
    products,
    setIsLoading,
    totalCount
  }
}

export default useProducts