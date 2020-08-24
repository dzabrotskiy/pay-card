import React from 'react'
import {render} from 'react-dom'
import './index.css'
import {App} from './app'

const rootElement = document.getElementById('root') as HTMLDivElement

render(<App />, rootElement)
