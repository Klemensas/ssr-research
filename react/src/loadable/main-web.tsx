import 'core-js'
import 'regenerator-runtime/runtime'

import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { loadableReady } from '@loadable/component'

import configureStore, { rootSaga } from '../state/loadableState'
import Items from './LoadableItems'

import '../main.css'

const store = configureStore()
store.runSaga(rootSaga)

loadableReady(() => {
  const root = document.getElementById('root')
  hydrate(
    <Provider store={store}>
      <Items />
    </Provider>,

    root,
  )
})
