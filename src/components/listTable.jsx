import React ,{Fragment,useState,useEffect}from 'react'
import { Link,useNavigate} from 'react-router-dom';
import { Space, Table,Button,message} from 'antd';
import { ArticleListApi,ArticleDeleteApi} from '../request/api';
import moment from 'moment';
import '../assets/listTable.less'



function Mytitle(props){
  return(
    <Fragment>
    <a href={'http://codesohigh.com:8765/article'+props.id} target='_blank'>{props.title}</a>
    <span style={{color:'gray',display:"block"}}>{props.subTitle }</span>
    </Fragment>
  )
}
export default function ListTable() {
  const navigate = useNavigate()
  const [deletes,setDelete] = useState(1)
    const [arr,setArr] = useState([
        {
            key: '1',
            name: 'John Brown',//1.思路antdUI只能获取name一个值,所以可以变成一组标签,也相当于一个值
       
            address: 'one',
            tags: ['nice', 'developer'],
          },
    ])
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 8,
      total:0,
    });
    const getArticleList = (current,pageSize)=>{
      ArticleListApi({
        num:current,
        count:pageSize
      }).then((resolve)=>{
        const {data} = resolve
      
         message.success(resolve.message)
         if(resolve.errCode == 0){
           
             const{num,count,total} = resolve.data
             setPagination({
              current:num,
              pageSize:count,
              total,
             })
             let Arrays =[];
             //7.6下午以获取到接口数据,下一步将数据渲染到页面
             let newArr = JSON.parse(JSON.stringify(data.arr))//2.
            newArr.map((item)=>{

             let obj = {
               key:item.id,
               date:moment(item.date).format('YYYY-MM-DD hh:mm:ss') ,//优化后
               mytitle:<Mytitle title = {item.title} subTitle ={item.subTitle} id={item.id}/>,

             }
             Arrays.push(obj)
            })
         
            setArr(Arrays)
          

         }
     })
    }
    useEffect(()=>{
     getArticleList(pagination.current,pagination.pageSize)
    },[])
    //每一列的内容
    const pageChange =(arg)=>{
 
      getArticleList(arg.current,arg.pageSize)
      
     
  
    }
    const delFn = (id)=>{
      ArticleDeleteApi({id}).then((res)=>{
      if(res.errCode == 0){
        message.success(res.message);
        setDelete(deletes+1)
      }
      })
    }
    const columns = [
        {
         
          dataIndex: 'mytitle',
          key: 'mytitle',
          width:'60%',
          render:text=><p >{text}</p>//难点

        },
     
        {
         
          dataIndex: 'date',
          key: 'date',
          render: text => <p>{text}</p>,
        },
    
        {
  
          key: 'action',
          render: (_, record) => {
     
      return(
        <div className="list_table">
            <Space size="middle">
     <Button type="primary" onClick={()=>{navigate(`/edit/${record.key}`)}} >
       编辑
      </Button>
      <Button type="primary" className='Table_edit' onClick = {()=>{delFn(record.key)}}>
        删除
      </Button>
            </Space>
            </div>
            )
          }
        },
      ];
   
      
  return (
    <div className='list_table'>
        <Table columns={columns} showHeader={false} dataSource={arr} onChange={pageChange} pagination={pagination}/>
    </div>
  )
}
