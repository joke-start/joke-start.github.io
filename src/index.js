import React,{Component} from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import {Provider} from 'react-redux'
import store from './store/index'
ReactDOM.createRoot(document.querySelector('#root')).render(
<Provider store={store}>
<Router/>

</Provider>

       


)
