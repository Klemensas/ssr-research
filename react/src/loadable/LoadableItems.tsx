import React from 'react'
import loadable from '@loadable/component'

const Items = loadable(() => import('../components/ConnectedItems'), {
  fallback: <span className="loading-state">Loading...</span>,
})

export default Items
