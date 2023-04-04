import axios from 'axios';
import { useQuery } from 'react-query';
import type { CouponsResult } from '@type/dto';

const useCoupon = () => {
  const { data: coupons } = useQuery<CouponsResult, Error>([ '/coupons' ], () => axios.get("/datas/coupon.json").then(res => res.data));

  return { coupons };
};

export default useCoupon;