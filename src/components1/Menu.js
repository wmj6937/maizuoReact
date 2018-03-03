import React,{ Component } from 'react';
import '../style/menu.css';
import {withRouter} from 'react-router-dom';

class Menu extends Component {
    constructor (){
        super();
        this.state = {
            items : [
                {message : '首页',origin:'/',name:"卖座电影"},
                {message : '影片',origin:'/list/0',name:"卖座电影"},
                {message : '影院',origin:'/cinema/0',name:"全部影院"},
                {message : '商城',origin:'/',name:"卖座电影"},
                {message : '我的',origin:'/',name:"卖座电影"},
                {message : '卖座卡',origin:'/',name:"卖座电影"}
            ]
        }
        this.toSonPage = this.toSonPage.bind(this);
    }
    toSonPage(origin,name){
        this.props.DiLI();
        localStorage.setItem("titles",name);
        this.props.history.push(origin);
    }
    render (){
        var that = this;
        var demoClassName = "warp";
        if (this.props.Fl) {
            demoClassName += " sidebar";
        }
        return (
            <div className={demoClassName} onClick={this.props.Dim}>
                <ul className="sid">
                    {
                        this.state.items.map(function(item,index){
                            return (
                                <li key={item.message} onClick={()=>that.toSonPage(item.origin,item.name)}>
                                    {item.message}<span>&#xe610;</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(Menu);