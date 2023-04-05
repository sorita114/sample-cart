import { useRouter, withRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import List from '@pages/products/components/list';
import type { ProductItem } from '@type/dto';
import Spinner from '@/@components/spinner';
import useProducts from '@/@hooks/use-product';

const Products:FC = () => {
  const [ page, setPage ] = useState<number>(0);
  const [ limit, setLimit ] = useState<number>(5);
  const router = useRouter();

  const { isLoading, products, setIsLoading, totalCount } = useProducts({ page, limit });

  const handlerIntersect:IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if(isIntersecting && !isLoading){
      if(!isEnd()){
        setIsLoading(true);
        router.push(`/products?page=${page + 1}&limit=${limit}`, undefined, { scroll: false });
      }
    }
  };

  const isEnd = () => products.length === totalCount;

  useEffect(() => {
    if(page === 0){
      router.push(`/products?page=${page + 1}&limit=${limit}`, undefined, { scroll: false });
    }
  }, [ router, page, limit ]);

  useEffect(() => {
    if(router?.query){
      const { page: queryForPage, limit: queryForLimit } = router.query;

      setPage(queryForPage ? Number(queryForPage) : 0);
      setLimit(queryForLimit ? Number(queryForLimit) : 5);
    }
  }, [ router ]);

  return (
    <section>
      <List products={products} />
      {isLoading && !isEnd() && (
        <Spinner<ProductItem[]> onIntersect={handlerIntersect} page={page} data={products} />
      )}
    </section>
  );
};

export default withRouter(Products);