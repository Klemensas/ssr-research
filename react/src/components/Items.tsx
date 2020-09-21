import React from 'react'
import { Typography, Row, Col, Layout } from 'antd'

import ItemCard from './ItemCard'
import { PhotoItem } from '../types/photo'

class Items extends React.Component<{ items: PhotoItem[] }> {
  render() {
    return (
      <Layout style={{ alignItems: 'center' }}>
        <Layout.Content style={{ maxWidth: '100%', width: 1280, padding: 24 }}>
          <Typography.Title>Items</Typography.Title>
          <Row gutter={[16, 16]}>
            {this.props.items.map(item => (
              <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                <ItemCard item={item} />
              </Col>
            ))}
          </Row>
        </Layout.Content>
      </Layout>
    )
  }
}

export default Items
