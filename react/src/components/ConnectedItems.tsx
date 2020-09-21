import React from 'react'
import { connect } from 'react-redux'

import { entitySelectors } from '../state/items/selectors'
import { actions } from '../state/items/slice'

import Items from './Items'

const mapStateToProps = state => ({
  items: entitySelectors.selectAll(state),
})

const mapDispatchToProps = {
  loadItems: actions.loadItems,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

class ConnectedItems extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.loadItems()
  }

  render() {
    return <Items items={this.props.items} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedItems)
