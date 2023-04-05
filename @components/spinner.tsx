import { useEffect, useRef } from 'react';
import { css } from '@emotion/react';

type Props<T> = {
  'page': number,
  'data': T,
  'onIntersect': IntersectionObserverCallback
};

const Spinner = <T, >({ onIntersect, page, data }:Props<T>) => {
  const $ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if(!$ref.current) return;

    const target = $ref.current;
    const observer = new IntersectionObserver(onIntersect);
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [ $ref, page, data ]);
  return (
    <section ref={$ref} css={styled}>
      <div className="lds-ellipsis"><div /><div /><div /><div /></div>
    </section>
  );
};
// NOTE: 출처 : https://loading.io/css/
const styled = css({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  '.lds-ellipsis': {
    display: 'inline-block',
    position: 'relative',
    width: '80px',
    height: '80px'
  },
  '.lds-ellipsis div': {
    position: 'absolute',
    top: '33px',
    width: '13px',
    height: '13px',
    borderRadius: '50%',
    background: '#5d5d5d',
    animationTimingFunction: 'cubic-bezier(0, 1, 1, 0)'
  },
  '.lds-ellipsis div:nth-of-type(1)': {
    left: '8px',
    animation: 'lds-ellipsis1 0.6s infinite'
  },
  '.lds-ellipsis div:nth-of-type(2)': {
    left: '8px',
    animation: 'lds-ellipsis2 0.6s infinite'
  },
  '.lds-ellipsis div:nth-of-type(3)': {
    left: '32px',
    animation: 'lds-ellipsis2 0.6s infinite'
  },
  '.lds-ellipsis div:nth-of-type(4)': {
    left: '56px',
    animation: 'lds-ellipsis3 0.6s infinite'
  },
  '@keyframes lds-ellipsis1': {
    '0%': {
      transform: 'scale(0)'
    },
    '100%': {
      transform: 'scale(1)'
    }
  },
  '@keyframes lds-ellipsis3': {
    '0%': {
      transform: 'scale(1)'
    },
    '100%': {
      transform: 'scale(0)'
    }
  },
  '@keyframes lds-ellipsis2': {
    '0%': {
      transform: 'translate(0, 0)'
    },
    '100%': {
      transform: 'translate(24px, 0)'
    }
  }

});

export default Spinner;