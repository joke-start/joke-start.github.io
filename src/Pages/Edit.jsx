


import React, { useState, useEffect } from 'react'
import { Button, PageHeader, Form, Input, Modal, Radio,message} from 'antd';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import moment from 'moment';
import { ArticleAddApi,ArticleLookTxt,ArticleUpdataApi} from '../request/api';
import {useParams,useNavigate} from 'react-router-dom';

export default function Edit() {
  const dates = new Date();
  const [html, setHtml] = useState('')
  const [title,setTitle] = useState('')
  const [subTitle,setSubTitle] = useState('')
  const [editor, setEditor] = useState(null) // 存储 editor 实例
  const params = useParams()
 
  const navigate = useNavigate()
  if(params.id){
    ArticleLookTxt({id:params.id}).then(res=>{
      if(res.errCode == 0 ){
        let {content,subTitle,title} = res.data
     
        setHtml(content)
        setTitle(title);
        setSubTitle(subTitle)
      }
 
    })
  }
 
  const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {

    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="填写文章标题"
        okText="提交"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              // form.resetFields();//重置
              onCreate(values);
              let{title,description} = values
         
if(params.id){
  ArticleUpdataApi({  title,
    subTitle:description,
    content:html,
  id:params.id}).then(res=>{
    if(res.errCode == 0){
      console.log(res)
     message.success(res.message)
     navigate('/listlists')
    }
    else{
      message.error(res.message)
     
    }
  })
  
}else{
      ArticleAddApi({
        title,
        subTitle:description,
        content:html,
        }).then(res=>{
          if(res.errCode == 0){
            console.log(res)
           message.success(res.message)
           navigate('/listlists')
          }
          else{
            message.error(res.message)
           
          }
        })
      }
   setVisible(false);
          
            })
            .catch(() => {
         return;
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
            title,
            description:subTitle

          }}
        >
          <Form.Item
            name="title"
            label="标题"
            rules={[
              {
                required: true,
                message: '请填写标题',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="副标题">
            <Input type="textarea"/>
          </Form.Item>
          <Form.Item name="modifier" className="collection-create-form_last-form-item">
            <Radio.Group>
       
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    );
          }
  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
      setTimeout(() => {
          setHtml('<p>&nbsp;<strong></strong></p>')
      }, 1500)
  }, [])
  


  const toolbarConfig = { }
  const editorConfig = {
      placeholder: '请输入内容...',
  }

  // 及时销毁 editor
  useEffect(() => {
    
   
      return () => {
          if (editor == null) return
          editor.destroy()
          setEditor(null)
      }
  }, [editor])

  // function insertText() {
  //     if (editor == null) return
  //     editor.insertText(' hello ')
  // }

  // function printHtml() {
  //     if (editor == null) return
  //     console.log(editor.getHtml())
  // }

  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {//获取标题值
    

    
  };

  return (
    <div>
        <div className="site-page-header-ghost-wrapper">
    <PageHeader
      ghost={false}
      
      onBack={params.id?()=> window.history.back():null}
      title='文章编辑'
      subTitle={'当前日期:'+moment(dates).format('YYYY-MM-DD')}
      extra={[
    
        <div>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
         提交文章
        </Button>
        <CollectionCreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </div>
      ]}
    >
   
    </PageHeader>
  </div>
<div>
<div>
                {/* <button onClick={insertText}>insert text</button>
                <button onClick={printHtml}>print html</button> */}
            </div>

            <div style={{ border: '1px solid #ccc', zIndex: 100, marginTop: '15px'}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '350px' }}
                />
            </div>
            <div style={{ marginTop: '10px' }}>
      
            </div>
</div>

    </div>
  )
}
