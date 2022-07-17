import React ,{useEffect, useState}from 'react'
import { CaretDownOutlined ,SmileOutlined } from '@ant-design/icons';
import { Routes, useNavigate ,Link} from 'react-router-dom';
import { Dropdown, Menu, Space ,message} from 'antd';
import logo from '../assets/logo.png'
import default_girl from '../assets/default_girl.png'
import {connect} from 'react-redux'
import Means from '../Pages/Means';
 function Header(props) {
const navigate = useNavigate()
    const [avatar,setAvatar]=useState([default_girl])
    const [username,setUsername] = useState('大佬')
    useEffect(()=>{//模拟ComponentDidMount生命周期
      let username1 = localStorage.getItem('username');
      let avatar1 =  localStorage.getItem('avatar')
      if(username1){
        setUsername(username1)
      }
      if(avatar1) {
        setAvatar("http://47.93.114.103:6688/"+avatar1)
      }
 
    },[props.mykey])
    //退出登录
    function comback(e){
      e.preventDefault();
      localStorage.clear()
      setTimeout(()=>{
        message.success('退出成功')
        navigate('/login')
      },1000)
    }
    const menu = (
        <Menu style={{height:'70px'}}
          items={[
            {
              key: '1',
              label: (
             
                <Link to='/means'>修改资料</Link>
              ),
            },
            {
                type: 'divider',
              },
            {
              key: '2',
              label: (
             
               <a onClick={comback}>退出登录</a>
       
              ),
             
                
            
          
            },
           
          ]}
        />
      );
      
  return (
    <div><header>
    <img src={logo} alt="" className='logoimg'/>
    <div className='rights'>
    <Dropdown overlay={menu}>
    <a className='a' onClick={(e) => e.preventDefault()}>
      <Space>
        <img src={avatar} className='head' alt="" />
        <span style={{color:'black'}}>{username}</span>
        <CaretDownOutlined />
      </Space>
    </a>
  </Dropdown>

    </div>
  </header></div>
  )
}
const mapStateToProps =(state)=>{
return {
  mykey:state.mykey
}
}
export default connect(mapStateToProps)(Header)