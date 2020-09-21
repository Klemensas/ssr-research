import { itemsAdapter } from './slice'
import { RootState } from '../index'

export const entitySelectors = itemsAdapter.getSelectors<RootState>(state => state.items)
