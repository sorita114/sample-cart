import type { CouponType } from '@type/coupon';

export type ProductItem = {
  'item_no': number,
  'item_name': string,
  'detail_image_url': string,
  'price': number,
  'score': number,
  'availableCoupon'?: boolean
};

export type Coupons = {
  'type': CouponType,
  'title': string,
  'discountRate'?: number,
  'discountAmount'?: number
};

type Payment = {
  'counts': number,
  'isPayment': boolean,
  'totalPrice': number,
  'couponType': CouponType,
};

export type PaymentItem = ProductItem&Payment;

export type ProductItemsResult = ProductItem[];
export type CouponsResult = Coupons[];