import Loadable from 'react-loadable';
import React from 'react';

const Index =Loadable({
    loader:()=>import('@/views/index/index'),
    loading:()=><div>Loading......</div>
})


const Home =Loadable({
    loader:()=>import('@/views/index/home/index'),
    loading:()=><div>Loading......</div>
})
const routes=[
    {
        path:'/index',
        children:[
            {
                path:'/index/home',
                children:[],
                component:Home
            }
        ],
        component:Index
    },
    {
        path:'/',
        to:'/index/home'
    }
]

export default routes;