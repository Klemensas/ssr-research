import ReactOnRails from 'react-on-rails'

import Items from './Items'
import { configureStore } from '../state/rorState'

ReactOnRails.registerStore({
  main: configureStore,
} as any)

ReactOnRails.register({
  Items,
} as any)
