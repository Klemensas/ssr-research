import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { all } from 'redux-saga/effects'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'

import { reducer as itemsReducer } from './items/slice'
import itemsSagas from './items/sagas'

export function* rootSaga() {
  yield all([itemsSagas()])
}

function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = applyMiddleware(sagaMiddleware)
  const reducers = combineReducers({
    items: itemsReducer,
  })

  const withHydrate = (baseReducers: typeof reducers) => (state, action) => {
    if (action.type === HYDRATE) return { ...state, ...action.payload }

    return baseReducers(state, action)
  }

  const store = createStore(withHydrate(reducers), middleware)
  const sagaRun = sagaMiddleware.run(rootSaga)

  store.close = () => {
    store.dispatch(END)

    return sagaRun.toPromise()
  }

  return store
}

export type RootState = ReturnType<ReturnType<typeof configureStore>['getState']>
export const wrapper = createWrapper(configureStore)
