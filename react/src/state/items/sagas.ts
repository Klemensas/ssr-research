import { takeEvery, put, call } from 'redux-saga/effects'
import axios from 'axios'

import { actions } from './slice'
import photos from '../../photos.json'

// export const getItems = () => axios.get('http://localhost:9000/api/items').then(r => r.data)
export const getItems = () => Promise.resolve(photos)

export function* loadItems() {
  const data = yield call(getItems)

  if (data) {
    yield put(actions.itemsReceived({ items: data }))
    return
  }

  yield put(actions.loadItemsFailed())
}

export default function* saga() {
  yield takeEvery(actions.loadItems, loadItems)
}
