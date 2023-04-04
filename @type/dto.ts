import { COUPON_TYPE } from '@type/coupon';

export type ProductItem = {
  item_no: number,
  item_name: string,
  detail_image_url: string,
  price: number,
  score: number,
  availableCoupon?: boolean,
};

export type Coupons = {
  type: COUPON_TYPE,
  title: string,
  discountRate?: number
  discountAmount?: number,
};

type Payment = {
  counts: number,
  isPayment: boolean,
  totalPrice: number
};

export type PaymentItem = ProductItem & Payment;

export type ProductItemsResult = ProductItem[];
export type CouponsResult = Coupons[];