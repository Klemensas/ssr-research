/// <reference types="react-scripts" />

import { Store } from 'redux'

declare module 'redux' {
  export interface Store {
    close: () => Promise<void>
  }
}

declare global {
  interface Window {
    __PRELOADED_STATE__: Object
  }
}
