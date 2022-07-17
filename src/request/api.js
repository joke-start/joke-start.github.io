import request from './request'
//注册
export const RegisterApi =(params)=>request.post('/register',params)
//登录
export const LoginApi =(params)=>request.post('/Login',params)

export const ArticleListApi = (params) =>request.get('/article',{params})//get需要解构才能拿到值/名字必须为params

//添加文章
export const ArticleAddApi = (params)=>request.post('/article/add',params)
//查看文章
export const ArticleLookTxt =(params)=>request.get(`/article/${params.id}`)
//重新提交文章
export const ArticleUpdataApi =(params)=>request.put('/article/update',params)  
//删除文章  
export const ArticleDeleteApi =(params)=>request.post('/article/remove',params)
//获取用户
export const ArticleGetUser =()=>request.get('/info',{})
//修改用户资料
export const ChangeUsers =(params)=>request.put('/info',params)