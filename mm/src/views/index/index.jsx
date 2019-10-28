import React, { Component } from 'react'
import {Link}from 'react-router-dom';
import './index.css'
import RouterView from '@/router/routerView';
import { connect } from "react-redux";
class Index extends Component {
    state={
        show:false
    }
    changeCount(item){
        
    }
    render() {
        let {show}=this.state;
        let {list}=this.props;
        return (
            <div className='index'> 
                <header>
                    <Link to="/">首页</Link>
                    <Link to="/">one</Link>
                    <Link to="/">tow</Link>
                </header>
                <RouterView routes={this.props.routes}/>
                <footer onClick={()=>{this.setState({show:true})}}>
                    购物车{list.reduce((prev,cur)=>prev+cur.count,0)}
                </footer>
                {
                    show?<div className='shade'>
                        <div>
                            {
                                list&&list.map((item,index)=>{
                                    return <div key={index}>
                                        <div>{item.name}</div>
                                        <div>{item.price}</div>
                                        <div>
                                            <span>-</span>
                                            <span>{item.count}</span>
                                            <span onClick={this.changeCount.bind(item)}>+</span>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>:null
                }
            </div>
        )
    }
}
export default connect((state)=>{
    return {
        ...state.shopList,
        list:[...state.shopList.list]
    }
},(dispatch)=>{
    return  {

    }
})(Index)