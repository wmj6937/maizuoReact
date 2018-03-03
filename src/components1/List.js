import React,{ Component } from 'react';
import { Tabs , Badge} from 'antd-mobile';
import axios from 'axios';
import '../style/list.css';
import ListTitle from './title/UpdateTitle';

const tabs = [
    { title: <Badge>正在热映</Badge> },
    { title: <Badge>即将上映</Badge> }
];

export default class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            now : [],
            the : []
        }
        this.getNow = this.getNow.bind(this);
        this.getThe = this.getThe.bind(this);
        this.getdate = this.getdate.bind(this);
        this.getdateils = this.getdateils.bind(this);
        this.toDetails = this.toDetails.bind(this);
    }
    componentDidMount(){
        this.getThe(0);
        this.getNow(0);
    }
    getNow(page){
        axios.get('/v4/api/film/now-playing?page='+ (page + 1) +'&count=7')
        .then((res)=>{
            // console.log(res);
            var nows = this.state.now;
            nows.splice(page,1,res.data.data.films);
            this.setState({
                now : nows
            })
        })
    }
    getThe(page){
        axios.get('/v4/api/film/coming-soon?page='+ (page + 1) +'&count=7')
        .then((res)=>{
            // console.log(res);
            var thes = this.state.the;
            thes.splice(page,1,res.data.data.films);
            this.setState({
                the : thes
            })
        })
    }
    getdate(time){
        var data = new Date(time);
        var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        var index = data.getDay();
        return (
            <p><i>{data.getMonth() + 1}月{data.getDate()}日上映</i>{weeks[index]}</p>
        );
    }
    getdateils(){
        var sH = this.refs.warp_Height.scrollTop + this.refs.oneHeight.offsetHeight * 3;
        var H = this.refs.oneHeight.offsetHeight * 7;
        let page = Math.floor(this.refs.list_Height.offsetHeight / H);
        if(sH >= this.refs.list_Height.offsetHeight * 0.8 && this.state.now.length === page){
            this.getNow(page);
            this.getThe(page);
        }
    }
    toDetails(id){
        this.props.history.push("/details/" + id);
    }
    render(){
        var that = this;
        return(
            <div className='warp_list' onScroll={this.getdateils} ref="warp_Height">
                <ListTitle/>
                <div className="list" ref='list_Height'> 
                    <Tabs tabs={tabs}
                    initialPage= {window.parseInt(this.props.match.params.ind)}
                    >
                        <div>
                            {
                                this.state.now.map((val,index)=>{
                                    return (
                                        <ul key={index}>
                                            {
                                                val.map((item,index)=>{
                                                    return(
                                                        <li ref="oneHeight" onClick={()=>that.toDetails(item.id)} key={item.id}>
                                                            <img src={item.cover.origin} alt=""/>
                                                            <div className='movie_details'>
                                                                <h1><span>{item.name}</span><span>{item.grade}</span></h1>
                                                                <p>{item.intro}</p>
                                                                <p><i>{item.cinemaCount}家影院上线</i>{item.watchCount}人购票</p>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    )
                                })
                            }
                        </div>
                        <div>
                            {
                                this.state.the.map((val,index)=>{
                                    return (
                                        <ul key={index}>
                                        {
                                            val.map((item,index)=>{
                                                return(
                                                    <li onClick={()=>that.toDetails(item.id)} key={item.id}>
                                                        <img src={item.cover.origin} alt=""/>
                                                        <div className='movie_details'>
                                                            <h1><span>{item.name}</span></h1>
                                                            <p>{item.intro}</p>
                                                            {that.getdate(item.premiereAt)}
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    )
                                })
                            }
                        </div>
                    </Tabs>
                </div>
            </div>
        )
    }
}