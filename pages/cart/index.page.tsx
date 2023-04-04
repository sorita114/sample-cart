import React, {ChangeEvent, FC, useContext, useEffect, useState} from 'react';
import { GlobalMyCartContext } from '@pages/_app.page';
import { ProductItem, PaymentItem, Coupons } from '@type/dto';
import useCoupon from '@hooks/use-coupon';
import Image from 'next/image'
import { ErrorMessage, ERROR_TYPE } from '@type/erros';
import { css } from '@emotion/react';
import { COUPON_TYPE } from '@/@type/coupon';

const Cart: FC = () => {
  const {myCarts, setMyCarts} = useContext(GlobalMyCartContext)
  const [payments, setPayments] = useState<PaymentItem[]>([])
  const [errors, setErrors] = useState<ErrorMessage>();
  const {coupons} = useCoupon()

  const handleAddPayment = (e: ChangeEvent<HTMLInputElement>, item: PaymentItem) => {
    const {checked} = e.currentTarget;
    setPayments((prev) => {
      return prev.map(v => {
        return {
          ...v,
          isPayment: v.item_no === item.item_no ? checked : v.isPayment
        }
      })
    })
  }

  const handleChangeCount = (e: ChangeEvent<HTMLInputElement>, item: PaymentItem) => {
    const {value} = e.target;

    if(!value) {
      setErrors({
        type: ERROR_TYPE.MIN,
        message: '최소 1개이상 주문이 가능합니다.'
      })
      return
    }

    setPayments((prev) => {
      return prev.map(v => {
        return {
          ...v,
          counts: v.item_no === item.item_no ? Number(value) : v.counts,
          totalPrice: v.item_no === item.item_no ? Number(value) * item.price : v.counts * v.price,
        }
      })
    })
  }

  const totalPrice = (item: PaymentItem, coupon: Coupons): number => {
    switch(coupon.type) {
      case COUPON_TYPE.AMOUNT:
        return item.totalPrice - Number(coupon?.discountAmount)
      case COUPON_TYPE.RATE:
        return item.totalPrice * ((100 - Number(coupon?.discountRate)) / 100)
      default:
        return item.price
    }
  }

  const paymentTotalPrice = (): number => {
    return payments.filter(payments => payments.isPayment).reduce((prev, current) => prev + current.totalPrice, 0)
  }

  const handelSelectCoupon = (e: ChangeEvent<HTMLSelectElement>, item: PaymentItem) => {
    const {value} = e.target

    setPayments((prev) => {
      return prev.map(v => {
        return {
          ...v,
          totalPrice: v.item_no === item.item_no ? totalPrice(item, JSON.parse(value)) : v.totalPrice
        }
      })
    })
  }

  useEffect(() => {
    if(myCarts) {
      const _payments: PaymentItem[] = myCarts.map(cart => {
        return {
          ...cart,
          counts: 1,
          isPayment: false,
          totalPrice: cart.price
        }
      })

      setPayments(_payments)
    }
  }, [myCarts, setPayments])

  return (
    <section css={styled}>
      <header>
        <h1>My Cart</h1>
      </header>
      {myCarts?.length ? (
        <>
          <section>
              <ul>
              {payments.map((payment, index) => (
                <li key={`${index}_${payment.item_no}`}>
                  <section>
                    <header>
                      <input 
                        type="checkbox" 
                        name="cartItem" 
                        onChange={(e) => handleAddPayment(e, payment)}
                      />
                    </header>
                    <div>
                      <Image src={payment.detail_image_url} alt={payment.item_name} width={500} height={500}/>
                    </div>
                    <header>{payment.item_name}</header>
                    <div>
                      <strong>{payment.price}</strong>
                      <input 
                        type="text" value={payment.counts} 
                        onChange={(e) => handleChangeCount(e, payment)} 
                        className={errors?.type === ERROR_TYPE.MIN ? 'error': ''}
                      />
                      <select 
                        onChange={(e) => handelSelectCoupon(e, payment)}
                        disabled={payment.availableCoupon}
                        >
                          <option value={JSON.stringify({type: COUPON_TYPE.EMPTY, title: '', discountRate: 0})}>쿠폰을 선택해주세요.</option>
                        {coupons && coupons.map((coupon, index) => (
                          <option key={index} value={JSON.stringify(coupon)}>
                            {coupon.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors && errors.type === ERROR_TYPE.MIN && (
                      <p>
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </section>
                </li>
              ))}
            </ul>
          </section>
          <footer>
            <strong>
              {paymentTotalPrice()}
            </strong>
          </footer>
        </>
      ) : (
        <div>
          <p>
          장바구니에 상품이 없습니다.
          </p>
          <p>
            상품을 추가해보세요.
          </p>
        </div>
      )}
    </section>
  )
}

const styled = css({
  '.error': {

  }
})

export default Cart