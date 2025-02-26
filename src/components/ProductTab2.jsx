import React from 'react';
import { Avatar, List, Space, Rate } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import SampleImage from '../assets/images/AVRG750LCD_F-1024x1024.jpg';


const data = Array.from({ length: 23 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `Ant Design Part ${i + 1}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns, and high-quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function ProductTab2() {
  return (
    <div>
      <List
        itemLayout="vertical"
        size="medium"
        pagination={{
          pageSize: 3,
        }}
        dataSource={data}
        footer={
          <div>
            <b>Ant Design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              <img
                width={150}
                alt="Product"
                src={`${SampleImage}`}
                />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href} style={{ marginBottom: 0, display: 'block' }}>{item.title}</a>}
              description={
                <>
                  {item.description}
                  <div style={{ marginTop: 5 }}>
                    <Rate disabled allowHalf defaultValue={3.5} />
                  </div>
                </>
              }
            />

            <p>{item.content}</p>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ProductTab2;
