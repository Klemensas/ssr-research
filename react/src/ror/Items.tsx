import ReactOnRails from 'react-on-rails'
import React from 'react'
import { Provider } from 'react-redux'

import Items from '../components/ConnectedItems'

import 'antd/dist/antd.css'

const ItemsWrapper = props => {
  const store = ReactOnRails.getStore('main', true)

  if (!store) return

  return (
    <Provider store={store}>
      <Items />
    </Provider>
  )
}

export default ItemsWrapper
