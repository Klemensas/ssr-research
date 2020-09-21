import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './state'
import ConnectedItems from './components/ConnectedItems'

import './main.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedItems />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
