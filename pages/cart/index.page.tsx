import type { ChangeEvent, FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import { GlobalMyCartContext } from '@pages/_app.page';
import type { PaymentItem, Coupons } from '@type/dto';
import useCoupon from '@hooks/use-coupon';
import type { ErrorMessage } from '@type/erros';
import { ErrorType } from '@type/erros';
import { CouponType } from '@type/coupon';
import theme from '@styles/theme';
import currency from '@utils/currency';

const Cart:FC = () => {
  const { myCarts, } = useContext(GlobalMyCartContext);
  const [ payments, setPayments ] = useState<PaymentItem[]>([]);
  const [ errors, setErrors ] = useState<ErrorMessage | undefined>();
  const { coupons } = useCoupon();

  const handleAddPayment = (e:ChangeEvent<HTMLInputElement>, item:PaymentItem) => {
    const { checked } = e.currentTarget;
    setPayments(prev => prev.map(v => ({
      ...v,
      isPayment: v.item_no === item.item_no ? checked : v.isPayment
    })
    )
    );
  };

  const handleChangeCount = (e:ChangeEvent<HTMLInputElement>, item:PaymentItem) => {
    const { value } = e.target;

    if(!value){
      setErrors({
        type: ErrorType.MIN,
        message: '최소 1개이상 주문이 가능합니다.'
      });
      return;
    }

    setErrors(undefined);

    setPayments(prev => prev.map(v => ({
      ...v,
      counts: v.item_no === item.item_no ? Number(value) : v.counts,
      totalPrice: v.item_no === item.item_no ? Number(value) * item.price : v.counts * v.price
    })
    )
    );
  };

  const totalPrice = (item:PaymentItem, coupon:Coupons):number => {
    switch(coupon.type){
      case CouponType.AMOUNT:
        return item.totalPrice - Number(coupon?.discountAmount);
      case CouponType.RATE:
        return item.totalPrice * ((100 - Number(coupon?.discountRate)) / 100);
      default:
        return item.price;
    }
  };

  const paymentTotalPrice = ():string => {
    const items = payments.filter(value => value.isPayment);
    if(items.length === 0) {
      return currency(0);
    }
    const total = items.reduce((pv, current) => pv + current.totalPrice, 0);
    return `${items.reduce((prv, cur) => prv = `${prv ? prv + ' + ' : ''}${currency(cur.totalPrice)}`, '')} = ${currency(total)}`;
  };

  const handelSelectCoupon = (e:ChangeEvent<HTMLSelectElement>, item:PaymentItem) => {
    const { value } = e.target;

    setPayments(prev => prev.map(v => ({
      ...v,
      totalPrice: v.item_no === item.item_no ? totalPrice(item, JSON.parse(value)) : v.totalPrice
    })
    )
    );
  };

  useEffect(() => {
    if(myCarts){
      const convertToItem:PaymentItem[] = myCarts.map(cart => ({
        ...cart,
        counts: 1,
        isPayment: false,
        totalPrice: cart.price
      })
      )
;

      setPayments(convertToItem);
    }
  }, [ myCarts, setPayments ]);

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
                    <input
                      type="checkbox"
                      name="cartItem"
                      onChange={e => handleAddPayment(e, payment)}
                      checked={payment.isPayment}
                    />
                    <div>
                      <Image src={payment.detail_image_url} alt={payment.item_name} width={150} height={150} />
                    </div>
                    <div className="information">
                      <header>{payment.item_name}</header>
                      <div>
                        <input
                          type="text" value={payment.counts}
                          onChange={e => handleChangeCount(e, payment)}
                          className={errors?.type === ErrorType.MIN ? 'error' : ''}
                        />
                        <strong>{currency(payment.price)}</strong>
                      </div>
                      {errors && errors.type === ErrorType.MIN && (
                          <p className='error'>
                            <span>{errors.message}</span>
                          </p>
                        )}
                      <div className="coupon-box">
                        <p>
                          <span>예상 할인 금액 : </span>
                          <strong>{currency(payment.totalPrice - payment.price)}</strong>
                        </p>
                        <select
                          onChange={e => handelSelectCoupon(e, payment)}
                          disabled={payment.availableCoupon}

                        >
                          <option value={JSON.stringify({ type: CouponType.EMPTY, title: '', discountRate: 0 })}>쿠폰을 선택해주세요.</option>
                          {coupons && coupons.map((coupon, idx) => (
                            <option key={idx} value={JSON.stringify(coupon)}>
                              {coupon.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </section>
                </li>
              ))}
            </ul>
          </section>
          <footer>
            <span>총 {payments.filter(value => value.isPayment).length} 개</span>
            <span>|</span>
            <strong>
              {paymentTotalPrice()}
            </strong>
          </footer>
        </>
      ) : (
        <div className='empty'>
          <p>
            장바구니에 상품이 없습니다.
          </p>
          <p>
            상품을 추가해보세요.
          </p>
        </div>
      )}
    </section>
  );
};

const styled = css({
  'h1': {
    fontWeight: 'bold',
    fontSize: `${theme.fontSize.large}`,
    margin: '10px 0'
  },
  'ul': {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 20,
    '> li': {
      width: '100%',
      '> section': {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        '.information': {
          width: '100%',
          'header': {
            margin: '5px 0',
            fontWeight: 'bold',
            color: `${theme.colors.gray}`,
            textDecoration: 'underline'
          },
          '> div': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            'strong': {
              fontWeight: 'bold'
            },
            'input': {
              '&.error': {
                marginBottom: 5,
                border:`1px solid ${theme.colors.error}`
              }
            }
          },
          '.coupon-box': {
            marginTop: 10,
            'strong': {
              color: `${theme.colors.gray}`
            }
          }
        }
      }
    }
  },
  'footer': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 20,
    borderTop: `1px solid ${theme.colors.gray}`,
    fontSize: '1.2rem',
    bottom: 0,
    height: 50,
    gap: 10
  },
  '.error': {
    color: theme.colors.error,
    fontWeight: 'bold',
    fontSize: theme.fontSize.small
  },
  '.empty': {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: '1.1rem',
    color: theme.colors.gray,
    gap: 30,
    top: '50%',
    left: '50%',
    transfrom: 'translateY(-50%)',
    transform: 'translateX(-50%) '
  }
});

export default Cart;