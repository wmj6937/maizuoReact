import React,{ Component } from 'react';
import axios from 'axios';
import '../style/details.css';
import {Link} from 'react-router-dom';
import DetailsTitle from './title/UpdateTitle';

export default class Details extends Component{
    constructor(){
        super();
        this.state = {
            list : []
        }
        this.dGetdate = this.dGetdate.bind(this);
    }
    componentDidMount(){
        var id = this.props.match.params.fid;
        axios.get("/v4/api/film/" + id + "?__t=1516892160333")
        .then((res)=>{
            // console.log(res);
            this.state.list.push(res.data.data.film);
            this.setState({
                list : this.state.list
            })
        })
    }
    dGetdate(time){
        var data = new Date(time);
        return (
            <i>{data.getMonth() + 1}月{data.getDate()}日上映</i>
        );
    }
    render (){
        var that = this;
        return (
            <div className="Datils_warp">
                <DetailsTitle/>
                {
                    this.state.list.map(function(item,index){
                        return (
                            <div className="Datils" key={item.id}>
                                <img src={item.cover.origin} alt=""/>
                                <h3>影片简介</h3>
                                <div><span>导演：</span>{item.director}</div>
                                <div>
                                    <span>主演：</span>
                                    <h4>
                                        {
                                            item.actors.map(function(items,index){
                                                return (
                                                    <i key={items.name}>
                                                        {items.name}
                                                    </i>
                                                )
                                            })
                                        }
                                    </h4>
                                </div>
                                <div><span>地区语言：</span>{item.nation}({item.language})</div>
                                <div><span>类型：</span>{item.category}</div>
                                <div><span>上映日期：</span>{that.dGetdate(item.premiereAt)}</div>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;{item.synopsis}</p>
                                <Link className="ticket" to={"/cinema/" + item.id}>立即购票</Link>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}