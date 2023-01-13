import Head from 'next/head'
import Image from 'next/image'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';

import{ getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebaseApp from '../../net/firebaseApp';
import { useRouter } from 'next/router';

import SignIn from '../views/SignIn';
import Loading from '../views/Loading';

// import Cookies from 'universal-cookie';

  const { Header, Content, Sider } = Layout;
  const items1 = ['nav 1', 'nav 2', 'nav 3', '로그아웃'].map((key) => ({
    key,
    label: `${key}`,
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

export default function BaseLayout({ children }){   //key, children은 예약어 이다.
    const auth = getAuth( firebaseApp );  
    const router = useRouter();
    const [loded, setLoded] = useState(false);
    const [credential, setCredential] = useState(null);

    // const cookies = new Cookies();

    useEffect(() => {
      auth.onAuthStateChanged((credential) => {
        //TODO: 허용된 사용자만 로그인 유지
        // console.log("credential:", credential);
        // const { email } = credential;
        // console.log("email:", credential?.email || 'fighting');
        if (credential) {
          switch( credential?.email ) {
            case "ghkwon9999@naver.com":
                setCredential(credential);
                break;
            default:
                alert("관리자만 로그인 할 수 있습니다.");
          }
        }
        // else {
        //   setCredential(null);
        // }
        setLoded(true);
      });
    }, []);

    if(!loded) {
      return <Loading />
    }

    if(!credential) {
      return <SignIn />
    }

    const clickHandler = (params) => {
    if ( params.key == '로그아웃') {
        setCredential(null);      
        setLoded(false);
        auth.signOut()
            .then(() => console.log("success"))
            .catch(console.warn());

        // cookies.remove();           
        // router.push('/sign-in'); //위의 <Signin /> 로직으로 필요 없음
      }
    }

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
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['nav 2']} items={items1} 
                onClick={clickHandler}
          />
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
              { children }
            </Content>
          </Layout>
        </Layout>
      </Layout>    
      )    
}