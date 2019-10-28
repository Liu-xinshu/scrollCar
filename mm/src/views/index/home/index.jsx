import React, { Component } from 'react'
import axios from 'axios';
import '@/mock/mock';
import './index.scss';
import BScroll from 'better-scroll';
import {connect}from 'react-redux';
import {ADD_LIST}from '@/store/type';
 class Home extends Component {
    state={
        list:[],
        ind:0,
        listH:[]
    }
    changeInd(index){
      this.myscroll.scrollToElement('.id'+index,1500)
      this.setState({
          ind:index
      })
    }
    changeCount(index,index1,count){
       let {list}=this.state;
       list[index].foods[index1].count=count;
       list[index].sum=list[index].foods.reduce((prev,cur)=>prev+cur.count,0)
       this.props.changeShopList({
           obj:list[index].foods[index1]
       })
        this.setState({list})
    }
    render() {console.log(this.props)
        let {list,ind}=this.state;
        return (
            <div className='home'>
                <ul>
                    {
                        list&&list.map((item,index)=>{
                            return <li key={index} className={index===ind?"active":''} onClick={this.changeInd.bind(this,index)}>{item.name}{item.sum}</li>
                        })
                    }
                </ul>
                <div className='scroll'>
                    <div ref="div">
                        {
                            list&&list.map((item,index)=>{
                                return <div key={index} className={'id'+index}>
                                    <h3>{item.name}</h3>
                                    {
                                        item.foods.map((item1,index1)=>{
                                            return<dl key={index1}>
                                            <dt>
                                                <img src={item1.image} alt=""/>
                                            </dt>
                                            <dd>
                                                <p>{item1.name}</p>
                                               <div>
                                                    <div>
                                                        ￥{item1.price}
                                                    </div>
                                                    <div>
                                                        {item1.count>0?<span onClick={this.changeCount.bind(this,index,index1,item1.count-1)}>-</span>:null}
                                                        <span>{item1.count}</span>
                                                        <span onClick={this.changeCount.bind(this,index,index1,item1.count+1)}>+</span>
                                                    </div>
                                               </div>
                                            </dd>
                                        </dl>
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
   async componentDidMount(){
    let res= await axios.get('/get/data');
    let data=res.data.goods;
    data.forEach(item=>{
        item.sum=0;
        item.foods.forEach(item1=>{
            item1.count=0;
        })
    })
    console.log(data)
    this.setState({list:data
    },()=>{
        this.myscroll=new BScroll('.scroll',{
            click:true,
            probeType:3
        })
        let child=Array.from(this.refs.div.children);
        let last=child[child.length-1];
        this.setState({
            listH:child.map(item=>item.offsetTop).concat(last.offsetTop+last.offsetHeight)
        },()=>{
            let {listH}=this.state;
            this.myscroll.on('scroll',({y})=>{
                let t=Math.abs(y);
                listH.forEach((item,index)=>{
                    if(t+50>=item&&t<listH[index+1]){
                        this.setState({ind:index})
                    }
                })
            })
           
        })
       
    })
    console.log(res)
    }   
}
export default connect((state)=>{
    return {
        ...state.shopList,
        list:[...state.shopList.list]
    }
},(dispatch)=>{
    return {
        changeShopList(obj){
           dispatch({
               type:ADD_LIST,
               obj
           })
        }
    }
})(Home)