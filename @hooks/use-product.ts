import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import type { ProductItemsResult, ProductItem } from '@type/dto';

type Props = {
  'page': number,
  'limit': number
};

const useProducts = ({ page, limit }:Props) => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ products, setProducts ] = useState<ProductItem[]>([]);
  const [ totalCount, setTotalCount ] = useState<number>(0);

  useQuery<ProductItemsResult, Error>([ `/products?page=${page}&limit=${limit}` ], () => axios.get(`/datas/products.json?page=${page}&limit=${limit}`).then(res => res.data), {
    onSuccess: async res => {
      await void setIsLoading(true);
      await void setProducts(prev => {
        const start = (page - 1) * limit;
        const end = start + limit;

        const item:ProductItem[] = res.sort((pv, next) => next.score - pv.score).slice(start, end);
        return prev.concat(item);
      });

      await void setTotalCount(res.length);
      // NOTE loading UI 표시를 위해서 delay 추가
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    },
    enabled: page > 0
  });

  return {
    isLoading,
    products,
    setIsLoading,
    totalCount
  };
};

export default useProducts;