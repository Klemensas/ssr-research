import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { all } from 'redux-saga/effects'

import { reducer as itemsReducer } from './items/slice'
import itemsSagas from './items/sagas'

export function* rootSaga() {
  yield all([itemsSagas()])
}

function configureStore(isServer = false, initialState: any = {}) {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = applyMiddleware(sagaMiddleware)

  if (!isServer) {
    initialState = window.__PRELOADED_STATE__
  }

  const store = createStore(
    combineReducers({
      items: itemsReducer,
    }),
    initialState,
    middleware,
  )

  const sagaStore = Object.assign(
    {
      runSaga: sagaMiddleware.run,
      close: () => store.dispatch(END),
    },
    store,
  )

  return sagaStore
}

export type RootState = ReturnType<ReturnType<typeof configureStore>['getState']>

export default configureStore
