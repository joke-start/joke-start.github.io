import {Navigate,Route,Routes,BrowserRouter} from 'react-router-dom'
import App from "../App";
import Edit from "../Pages/Edit";
import ListTable from '../components/listTable';
import ListLists from '../components/listLists';
import Login from "../Pages/Login";
import Means from "../Pages/Means";
import Register from "../Pages/Register";

const BaseRouter = ()=>(
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<App/>}>
        <Route path='/edit' element={<Edit/>}></Route>
        <Route path='/edit/:id' element={<Edit/>}></Route>
        <Route path='/listtable' element={<ListTable/>}></Route>
        <Route path= '/listlists' element={<ListLists/>}></Route>
        <Route path='/means' element={<Means/>}></Route>
        </Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
      
    </Routes>
    </BrowserRouter>
)
export default BaseRouter

// export default [
 
//     {
//         path:'/app',
//         element:<App/>,
//         children:[
//             {
//                 path:'/edit',
//                 element:<Edit/>
//             },
//             {
//                 path:'/list',
//                 element:<List/>
//             },
//             {
//                 path:"/means",
//                 element:<Means/>
//             }
//         ]
//     },
//     {
//         path:'/register',
//         element:<Register/>
//     },
//     {
//         path:'/login',
//         element:<Login/>
//     },
//     {
//         path:'/',
//         element:<Navigate to='/app'/>
//     },
// ]