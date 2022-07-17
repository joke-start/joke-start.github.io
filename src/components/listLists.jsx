
import { Avatar, Button, List, Skeleton,Pagination,message} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleListApi,ArticleDeleteApi} from '../request/api';

import moment from 'moment';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
export default function ListLists() {

  const [list, setList] = useState([]);
  const [total,setTotal] = useState(0)
  const [current,setCurrent] = useState(0)
  const [deletes,setDelete] = useState(1)//删除数据
  const [pageSize,setPageSize] = useState(8)
  const navigate = useNavigate()
  const getList =(num)=>{
    ArticleListApi({
      num,
      count:pageSize
    }).then((resovle)=>{

      if(resovle.errCode == 0){
       let {arr,count,total,num} =resovle.data
       setTotal(total);
       setCurrent(num);//因为钩子是异步所以直接把num写活最好
       setPageSize(count)
      
       setList(arr) 
      }
    })
  }
  useEffect(()=>{
  getList(current)//调用
  },[])

  useEffect(()=>{
    getList(current)//调用
    },[deletes])//检测数据改变，然后刷新

const onChange =(pages)=>{

  
  getList(pages)//修改完之后再调用
}
const delFn = (id)=>{
  ArticleDeleteApi({id}).then((res)=>{
  if(res.errCode == 0){
    message.success(res.message);
    setDelete(deletes+1)
  }
  })
}
  return (
    <div className='list_table' style={{padding:'20px'}}>
    <List
      className="demo-loadmore-list"

      itemLayout="horizontal"
      
      dataSource={list}
      renderItem={(item) => {

        return(
        <List.Item
          actions={[<Button type="primary" onClick={()=>{navigate(`/edit/${item.id}`)}}>编辑</Button>,     <Button type="primary"
           danger onClick = {()=>{delFn(item.id)}}> 删除</Button>]}
          
        >
          <Skeleton loading={false} active>
            <List.Item.Meta
    
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.subTitle}
            />
            <div>{moment(item.date).format('YYYY-MM-DD hh:mm:ss')}</div>
          </Skeleton>
        </List.Item>
        )
   }
  }
    />
    <Pagination defaultCurrent={1} onChange={onChange} total={total} current={current} pageSize={pageSize}/>
    </div>
  );
      }


