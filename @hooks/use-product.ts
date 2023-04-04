import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import type { ProductItemsResult, ProductItem } from '@type/dto';

type Props = {
  'page': number,
  'limit': number
};

const useProducts = ({ page, limit }:Props) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ products, setProducts ] = useState<ProductItem[]>([]);
  const [ totalCount, setTotalCount ] = useState<number>(0);

  useQuery<ProductItemsResult, Error>([ `/products?page=${page}&limit=${limit}` ], () => axios.get(`/datas/products.json?page=${page}&limit=${limit}`).then(res => res.data), {
    onSuccess: async res => {
      await setIsLoading(true);
      await setProducts(prev => {
        const start = (page - 1) * limit;
        const end = start + limit;

        const item:ProductItem[] = res.sort((pv, next) => next.score - pv.score).slice(start, end);
        return prev.concat(item);
      });

      await setTotalCount(res.length);
      await setIsLoading(false);
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