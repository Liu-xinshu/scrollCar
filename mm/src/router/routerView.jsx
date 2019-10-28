import React from 'react';
import {Route,Redirect,Switch}from 'react-router-dom';



function RouterView(props){
    let {routes}=props;console.log(props)
    let RouteArr=routes&&routes.filter(item=>!item.to);
    let RedirectArr=routes&&routes.filter(item=>item.to).map((item,index)=><Redirect from ={item.path} to={item.to} key={index}/>);
    return <Switch>
        {
            RouteArr&&RouteArr.map((item,index)=>
            <Route key={index} path={item.path} render={(props)=>{
                return <item.component {...props} routes={item.children}/>
            }}/>
            ).concat(RedirectArr)
        }
    </Switch>
}

export default RouterView;