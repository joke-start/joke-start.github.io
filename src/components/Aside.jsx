import React,{useState,useEffect}from 'react'
import { useNavigate ,useLocation} from 'react-router-dom';
import {EditOutlined, ReadOutlined , SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
 
import './Aside.less'

export default function Aside() {
    const navigate = useNavigate()
    const location = useLocation()
    const [defaultKey,setDefaultKey]=useState('')
    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }
      useEffect(()=>{
       const path = location.pathname;
       let keys = path.split('/')[1];
       setDefaultKey(keys)
     
   
      },[location.pathname])
      
const items = [
    getItem('查看文章列表list', 'listlists',<ReadOutlined />),
    getItem('查看文章列表table', 'listtable',<ReadOutlined />),
    getItem('文本编辑', 'edit', <EditOutlined />),
    getItem('修改资料', 'means', <SettingOutlined />),
  ];
  const onClick = (e) => {
   navigate('/' +e.key)
   setDefaultKey(e.key)
  };

 
  return (
   <div>
     <Menu
      onClick={onClick}
      style={{
        background:'rgba(0, 0, 0, 0.1)',
        color:'white',
        width: 201,
      }}
    selectedKeys={[defaultKey]}
   
      mode="inline"
      items={items}
    />
   </div>
  )
}
