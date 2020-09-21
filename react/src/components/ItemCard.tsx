import React from 'react'
import { Card, Avatar } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'

import { PhotoItem } from '../types/photo'

const ItemCard = ({ item }: { item: PhotoItem }) => {
  const LikeAction = item.liked_by_user ? HeartFilled : HeartOutlined

  return (
    <a href={item.links.html}>
      <Card
        cover={
          <img
            alt={item.alt_description || item.description || undefined}
            src={item.urls.small}
            style={{ objectFit: 'cover', height: 200 }}
          />
        }
        actions={[<LikeAction onClick={e => e.preventDefault()} key="favourite" />]}
        hoverable
      >
        <Card.Meta
          avatar={<Avatar src={item.user.profile_image.small} />}
          title={item.user.name}
          description={
            <div
              style={{
                height: 18,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {item.description}
            </div>
          }
        />
      </Card>
    </a>
  )
}

export default ItemCard
