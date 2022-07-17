import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { Button, Checkbox, Form, Input,message} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './less/Login.less'
import  logo from '../assets/logo.png'
import { RegisterApi } from '../request/api';

export default function Register() {
  const navigate = useNavigate()
  const onFinish = (values) => {

    RegisterApi({
      username: values.username,
      password:values.password 
    }).then(resolve=>{
     
      if(resolve.errCode == 0){
        message.success(resolve.message);
       setTimeout(()=>{
        navigate('/login')
       },2000)
      }
      else{
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
            message:'请输入你的名字',
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
            message: "请输入密码",
          },
        ]}
      >
        <Input.Password  size='large' placeholder="请输入密码"   prefix={<LockOutlined />} />
      </Form.Item>
    
      <Form.Item
        name="confirm"
      
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请再次输入密码',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('请输入相同密码!'));
            },
          }),
        ]}
      >
        <Input.Password  size='large' placeholder="请再输入密码"   prefix={<LockOutlined />}/>
      </Form.Item>

     <Form.Item>
      <Link to='/login'>已有账号?前往登录</Link>
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
