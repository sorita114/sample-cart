import { CouponsResult } from '@/@type/dto'
import axios from 'axios'
import { useQuery } from 'react-query'

const useCoupon = () => {
  const {data: coupons} = useQuery<CouponsResult, Error>(['/coupons'], () => {
    return axios.get('/datas/coupon.json').then((res) => res.data)
  })

  return {coupons}
}

export default useCoupon