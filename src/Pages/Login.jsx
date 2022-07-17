import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { Button, Checkbox, Form, Input ,message} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './less/Login.less'
import  logo from '../assets/logo.png'
import { LoginApi } from '../request/api';


export default function Login() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log('Success:', values);
    LoginApi({
      username:values.username,
      password:values.password
    }).then(resolve=>{
  
      console.log(resolve)
      if(resolve.errCode ==0){
        localStorage.setItem('avatar',resolve.data.avatar)
        localStorage.setItem('cms-token',resolve.data['cms-token'])
        localStorage.setItem('editable',resolve.data.editable)
        localStorage.setItem('player',resolve.data.player)
        localStorage.setItem('username',resolve.data.username)
        message.success(resolve.message)
      
      setTimeout(()=>{
        navigate('/')
      },2000)
      }else{
        message.error(resolve.message)
      }
    })
  };

  return (
    <div className="login">
    <div className='login_box'>
    <img src={logo} alt='图片加载中'/>
  <Form
      name="basic"
  
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}

      autoComplete="off"
    >
      <Form.Item
       
        name="username"
     
        rules={[
          {
            required: true,
            message: '请输入你的名字',
          },
        ]}
      >
        <Input  size='large'  placeholder='请输入用户名' prefix={<UserOutlined  />}/>
      </Form.Item>

      <Form.Item
        
        name="password"
      
        rules={[
          {
            required: true,
            message: '请输入你的密码',
          },
        ]}
      >
        <Input.Password  size='large' placeholder="请输入密码"   prefix={<LockOutlined />} />
      </Form.Item>

     <Form.Item>
      <Link to='/register'>还没账号？立即注册</Link>
     </Form.Item>

      <Form.Item>
        <Button type='primary' size='large' htmlType="submit" block>
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div>
  )
}
