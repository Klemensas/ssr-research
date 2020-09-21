import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import { reducer as itemsReducer } from './items/slice'
import itemsSagas from './items/sagas'

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(sagaMiddleware)

export const store = createStore(
  combineReducers({
    items: itemsReducer,
  }),
  {},
  middleware,
)

sagaMiddleware.run(function* rootSaga() {
  yield all([itemsSagas()])
})

export type RootState = ReturnType<typeof store.getState>
