import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PhotoItem } from '../../types/photo'

export enum UiState {
  Idle = 'IDLE',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
}

export const itemsAdapter = createEntityAdapter<PhotoItem>({
  selectId: item => item.id,
})

const itemsSlice = createSlice({
  name: 'items',
  initialState: itemsAdapter.getInitialState({
    uiState: UiState.Idle,
  }),
  reducers: {
    loadItems(state) {
      state.uiState = UiState.Pending
    },
    loadItemsFailed(state) {
      state.uiState = UiState.Failure
    },
    itemAdded: itemsAdapter.addOne,
    itemsReceived(state, action: PayloadAction<{ items: Array<PhotoItem> }>) {
      itemsAdapter.setAll(state, action.payload.items)
      state.uiState = UiState.Success
    },
  },
})

export const { actions, reducer } = itemsSlice
