import { JSXElementConstructor, ComponentProps } from 'react'

import { wrapper } from '../state/nextState'

import '../main.css'

function App<T extends JSXElementConstructor<any>>({
  Component,
  pageProps,
}: {
  Component: T
  pageProps: ComponentProps<T>
}) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App)
