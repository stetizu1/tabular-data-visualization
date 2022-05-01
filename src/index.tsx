import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { App } from './app/App'
import './index.css'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById(`root`),
)
