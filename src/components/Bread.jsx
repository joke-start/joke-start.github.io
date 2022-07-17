import React ,{useState,useEffect}from 'react'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
export default function Bread() {

    const {pathname} =useLocation()
    const [curName,setcurName] = useState('')

    useEffect(()=>{
      
 
        setcurName(()=>{
            switch(pathname){
                case'/listlists':
                setcurName('查看列表List')
                break;
                case'/listtable':
                setcurName('查看列表Table')
                case'/edit':
                setcurName('文章编辑')
                break;
                case'/means':
                setcurName('修改资料')
                break;
                default:
                  setcurName(pathname.includes('edit')?'文章编辑':'')
                   break;
            }
        })
    },[pathname])
  return (
    <div>
          <Breadcrumb>
    <Breadcrumb.Item href='/'>
      <HomeOutlined />
    </Breadcrumb.Item>
    <Breadcrumb.Item >
      <UserOutlined/>
     <span>{curName}</span>
    </Breadcrumb.Item>
  
  </Breadcrumb>
    </div>
  )
}
