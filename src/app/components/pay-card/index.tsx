import React, {FC, ReactElement, CSSProperties, MouseEvent} from 'react'
import css from './index.css'
import {useSpring, animated} from 'react-spring'

interface PayCardI {
  cardNumber: number
  expDate: {m: number; y: number}
  cvv: number
  cardHolderName: string
}

type PayCardProps = Partial<PayCardI>

const calculateRotateDegrees = (x: number, y: number): Array<number> => [
  -(y - window.innerHeight / 2) / 70,
  (x - window.innerWidth / 2) / 70,
  1.01,
]

const getTransformValue = (x: number, y: number, s: number): string =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export const PayCard: FC<PayCardProps> = (
  props: PayCardProps
): ReactElement => {
  console.log('props: ', props)
  const [flipped, setFlipped] = React.useState<boolean>(false)
  const [cardProps, setCardProps] = useSpring(() => ({
    xys: [0, 0, 1],
    config: {mass: 7, tension: 350, friction: 35},
  }))
  const {transform, opacity} = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(1000px) rotateY(${flipped ? 180 : 0}deg)`,
    config: {mass: 5, tension: 600, friction: 90},
  })
  const style: CSSProperties = {
    transform: cardProps.xys.interpolate(getTransformValue as any),
  }
  return (
    <animated.div
      onClick={() => setFlipped((state) => !state)}
      style={{transform: transform}}>
      <animated.div
        onMouseMove={({clientX: x, clientY: y}: MouseEvent) =>
          setCardProps({xys: calculateRotateDegrees(x, y)})
        }
        onMouseLeave={() => setCardProps({xys: [0, 0, 1]})}
        className={css.Card}
        style={style}>
        <animated.div
          style={{opacity: opacity.interpolate((o: any) => 1 - o), transform}}
          className={css.CardSide}>
          <h1 style={{color: '#fff'}}>front</h1>
        </animated.div>
        <animated.div
          style={{
            opacity,
            transform: transform.interpolate((t) => `${t}`),
          }}
          className={css.CardSide}>
          <h1 style={{color: '#fff'}}>back</h1>
        </animated.div>
      </animated.div>
    </animated.div>
  )
}
