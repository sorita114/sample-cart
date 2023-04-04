import { useRouter, withRouter } from 'next/router';
import {FC, useEffect, useState } from 'react';
import List from '@pages/products/components/list';
import { ProductItem } from '@type/dto';
import Spinner from '@/@components/spinner';
import useProducts from '@/@hooks/use-product';

const Products: FC= () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const router = useRouter();

  const {isLoading, products, setIsLoading, totalCount} = useProducts({page, limit});

  const handlerIntersect: IntersectionObserverCallback  = ([{isIntersecting }]) => {
    if(isIntersecting && !isLoading) {
      if(!isEnd()) {
        setIsLoading(true);
        router.push(`/products?page=${page + 1}&limit=${limit}`, undefined, {scroll: false});
      }
    }
  };

  const isEnd = () => {
    return products.length === totalCount;
  };

  useEffect(() => {
    if(page === 0) {
      router.push(`/products?page=${page + 1}&limit=${limit}`, undefined, {scroll: false});
    }
  }, []);

  useEffect(() => {
    if(router && router.query) {

      const {page, limit} = router.query;

      setPage(page ? Number(page) : 0);
      setLimit(limit ? Number(limit) : 5);
    }
  }, [router]);

  return (
    <section>
      <List products={products} />
      {!isLoading && !isEnd() && (
        <Spinner<ProductItem[]> onIntersect={handlerIntersect} page={page} data={products} />
      )}
    </section>
  )
}

export default withRouter(Products);