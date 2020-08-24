import React, {FC, ReactElement} from 'react'
import css from './index.css'
import {PayCard} from './components'

export const App: FC = (): ReactElement => {
  return (
    <div className={css.Background}>
      <PayCard />
    </div>
  )
}
