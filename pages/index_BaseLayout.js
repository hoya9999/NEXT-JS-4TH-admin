import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';

  const { Header, Content, Sider } = Layout;
  const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });

export default function Home() {
  return (
    // <div>
    //     Admin
    // </div>
    // <Layout className="min-h-screen">
    <Layout style={{minHeight: '100vh'}}>    
    <Header className="header">
      <div className="logo" style={{  //로고위치에 Antd에 style 추가
        float: 'left',
        width: '120px',
        height: '31px',
        margin: '16px 24px 16px 0', 
        background: 'rgba(255, 255, 255, 0.3)'
      }}/>
      {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />      
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{
            height: '100%',
            borderRight: 0,
          }}
          items={items2}
        />
      </Sider>
      <Layout
        style={{
          padding: '0 24px 24px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#fff',   //Antd에 추가
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  </Layout>    
  )
}
