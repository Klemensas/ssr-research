import path from 'path'
import express from 'express'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { ChunkExtractor } from '@loadable/server'
import { Provider } from 'react-redux'

import configureStore, { rootSaga } from '../state/loadableState'

const app = express()

app.use(express.static('build'))

if (process.env.NODE_ENV !== 'production') {
  const webpackConfig = require('./webpack.client')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpack = require('webpack')

  const compiler = webpack(webpackConfig)

  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'silent',
      publicPath: '/web',
      writeToDisk(filePath) {
        return /node/.test(filePath) || /assets/.test(filePath) || /loadable-stats/.test(filePath)
      },
    }),
  )
}

const nodeStats = path.resolve('build/node/loadable-stats.json')
const webStats = path.resolve('build/web/loadable-stats.json')

app.get('/items', async (req, res) => {
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats })
  const { default: Items } = nodeExtractor.requireEntrypoint()

  const webExtractor = new ChunkExtractor({ statsFile: webStats })

  const store = configureStore(true)

  const jsx = webExtractor.collectChunks(
    <Provider store={store}>
      <Items />
    </Provider>,
  )

  const sagaPromise = store.runSaga(rootSaga).toPromise()

  /* The current implementation is naive and runs sagas to fetch the items.
  So two renders are needed - 1st for triggering sagas, 2nd for rendering loaded items */
  renderToString(jsx)
  store.close()

  await sagaPromise

  const html = renderToString(jsx)

  const stringifiedState = JSON.stringify(store.getState())

  const css = await nodeExtractor.getInlineStyleTags()
  const linkElements = webExtractor
    .getLinkElements()
    .filter(({ props }: any) => !/\.css$/.test(props.href)) as any
  const linkTags = renderToString(linkElements)

  res.set('content-type', 'text/html')
  res.send(`
      <!DOCTYPE html>
      <html>
        <head>
        ${linkTags}
        ${css}
        </head>
        <body>
          <div id="root">${html}</div>
          <script>window.__PRELOADED_STATE__ = ${stringifiedState}</script>
          ${webExtractor.getScriptTags()}
        </body>
      </html>
    `)
})

app.listen(3000, () => console.log('Server started http://localhost:3000'))
