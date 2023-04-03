import React, {FC, useEffect, useRef} from 'react'

type Props<T> = {
  page: number
  data: T
  onIntersect: IntersectionObserverCallback
}

const Spinner = <T, >({onIntersect, page, data}: Props<T>) => {
  const $ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if(!$ref.current) return

    const target = $ref.current
    const observer = new IntersectionObserver(onIntersect)
    observer.observe(target)

    return () => observer.unobserve(target)
  }, [$ref, page, data])
  return (
    <section ref={$ref}>Loding...</section>
  )
}

export default Spinner;