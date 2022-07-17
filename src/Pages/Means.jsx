import React, { useEffect, useState } from 'react';
import { Button, Form, Input,message, Upload  } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ArticleGetUser,ChangeUsers} from '../request/api';
import './less/Means.less'
import {connect} from 'react-redux'

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 /1024 /1024 < 200;

  if (!isLt2M) {
    message.error('图片只能传小于200kb以内的图!');
  }

  return isJpgOrPng && isLt2M;
};
 function Means(props) {
  const [usernames,setUsernames] = useState('')
  const [passwords,setPasswords] = useState('')
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');


  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
     
      getBase64(info.file.originFileObj, imageUrl => {
        setLoading(false);
        setImageUrl(imageUrl);
        localStorage.setItem('avatar',info.file.response.data.filePath)
        props.addKey()
 
     
  
      });
    }
  };

  const uploadButton = (  
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  useEffect(()=>{
    ArticleGetUser().then(res=>{
      const {username,password} =res.data
      if(res.errCode == 0){
        {/* //异步所以无法及时更新
       setUsernames(username);
        setPasswords(passwords) */}
        sessionStorage.setItem('username',username);
        sessionStorage.setItem('password',password)
      }
     
    })
  },[])
  const onFinish = (values) => {
    console.log('Success:', values);
    if(values.username && values.username !== sessionStorage.getItem('username') && values.password.trim()!== ''){
      ChangeUsers({
        username:values.username,
        password:values.password
      }).then(res=>{
     console.log(res)
      })
    }
   
   
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='change_Means'> <Form
    name="basic"
   
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
  
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item  label="用户名"  name="username"    >
    <Input placeholder='请输入新用户名'/>
    
    </Form.Item> 
     
    <Form.Item  label="重置密码"     name="password"  >
    <Input.Password placeholder='请输入新的密码'/>
    </Form.Item>
     
    <Form.Item name="remember"      valuePropName="checked"
     wrapperCol={{
      offset: 8,
      span: 16,
    }}
      
    >
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" style={{float:'right'}}>
       提交
      </Button>
    </Form.Item>
  </Form>
  <div>更换头像
  <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action='/api/upload'
      beforeUpload={beforeUpload}
      onChange={handleChange}
      headers={{'cms-token':localStorage.getItem('cms-token')}}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  </div>
  </div>
  )
}
const mapDispatchToProps=(dispatch)=>{
  return{
    addKey(){
      dispatch({type:'addKeyFn'})
    }
  }

}
export default connect(null,mapDispatchToProps)(Means)