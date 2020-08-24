import React, {FC, ReactElement, CSSProperties} from 'react'
import css from './index.css'
import {useSpring, animated} from 'react-spring'

interface PayCardI {
  cardNumber: number
  expDate: {m: number; y: number}
  cvv: number
  cardHolderName: string
}

type PayCardProps = Partial<PayCardI>

const getTransformValue = (x: number, y: number, s: number): string =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const calculateRotateDegrees = (x: number, y: number): Array<number> => [
  -(y - window.innerHeight / 2) / 70,
  (x - window.innerWidth / 2) / 70,
  1.01,
]

export const PayCard: FC<PayCardProps> = (
  props: PayCardProps
): ReactElement => {
  console.log('props: ', props)
  const [cardProps, setCardProps] = useSpring(() => ({
    xys: [0, 0, 1],
    config: {mass: 7, tension: 350, friction: 35},
  }))
  const style: CSSProperties = {
    transform: cardProps.xys.interpolate(getTransformValue as any),
  }
  return (
    <animated.div
      onMouseMove={({
        clientX: x,
        clientY: y,
      }: {
        clientX: number
        clientY: number
      }) => setCardProps({xys: calculateRotateDegrees(x, y)})}
      onMouseLeave={() => setCardProps({xys: [0, 0, 1]})}
      className={css.Card}
      style={style}>
      <h1>test</h1>
    </animated.div>
  )
}
