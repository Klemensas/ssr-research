import { useSelector } from 'react-redux'

import { wrapper } from '../state/nextState'
import { entitySelectors } from '../state/items/selectors'
import { actions } from '../state/items/slice'

import Items from '../components/Items'
import itemData from '../photos.json'

const ItemsPage = () => {
  const items = useSelector(entitySelectors.selectAll)

  return <Items items={items} />
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  store.dispatch(actions.itemsReceived({ items: itemData }))

  await store.close()
})

export default ItemsPage
