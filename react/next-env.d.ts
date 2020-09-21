/// <reference types="next" />
/// <reference types="next/types/global" />

import { Store } from 'redux'

declare module 'redux' {
  export interface Store {
    close: () => Promise<void>
  }
}
