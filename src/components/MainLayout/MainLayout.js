import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Sider , Content } = Layout;

import Header from './Header';
import Footer from './Footer';
import SiderMenue from './Sider';

function MainLayout({ children, exit }) {
  return (
    <Layout>
      <Header exit={exit}/>
      <Layout>
        <Sider>
          <SiderMenue />
        </Sider>
        <Layout style={{ padding: '0', width: '83%' }}>
          <Content style={{ background: '#fff', padding: 24, marginLeft: 24, marginTop: 24, minHeight: 649 , overflow: 'hidden'}}>
            { children }
          </Content>
        </Layout>
      </Layout>
      <Footer/>
    </Layout>
  );
}

export default MainLayout;
