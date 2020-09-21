import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import { reducer as itemsReducer } from './items/slice'
import itemsSagas from './items/sagas'

// export function configureStore(initialState: any = {}, railsContext: any = {}) {
export function configureStore(initialState, railsContext) {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = applyMiddleware(sagaMiddleware)

  const store = createStore(
    combineReducers({
      items: itemsReducer,
    }),
    { ...initialState, ...railsContext },
    middleware,
  )

  sagaMiddleware.run(function* rootSaga() {
    yield all([itemsSagas()])
  })

  return store
}

export type RootState = ReturnType<ReturnType<typeof configureStore>['getState']>
