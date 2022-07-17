import React ,{useState}from 'react'
import {Outlet} from 'react-router-dom'
import { Layout ,Sider} from 'antd'
import List from './Pages/List'
import Edit from './Pages/Edit' 
import './assets/base.less'
import Header from './components/Header'
import Aside from './components/Aside'
import Means from './Pages/Means'
import Bread from './components/Bread'
import {connect} from 'react-redux'
 export default function App() {
  const {Sider, Content } = Layout;

  return (
    <Layout id='app'>
    <Header />
    <Layout>
    <Sider><Aside/></Sider>
     <div className='container_son'>
      <Bread/>
       <div className="container_content">
       <Outlet />
       </div>
        </div>
    </Layout>
    <footer>2022 6月 | Author 胡明昌</footer>
  </Layout>
   
  )
}
