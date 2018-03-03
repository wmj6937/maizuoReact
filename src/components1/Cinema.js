import React,{ Component } from 'react';
import axios from 'axios';
import '../style/cinema.css';
import { Accordion, List } from 'antd-mobile';
import CinemaTitle from './title/UpdateTitle';

export default class Cinema extends Component {
    constructor(){
        super();
        this.state = {
            cinemaList : []
        }
        this.toCinemaDetails = this.toCinemaDetails.bind(this);
    }
    componentDidMount(){
        var id = this.props.match.params.id;
        var url = id === "0" ? "/v4/api/cinema" : "/v4/api/film/" + id + "/cinema";
        axios.get(url)
        .then((res)=>{
            // console.log(res);
            var data = res.data.data.cinemas;
            var arr = [];
            var obj = [];
            var dataLength = data.length;
            for(var i = 0;i < dataLength;i ++){
                if(arr.indexOf(data[i].district.name) === -1){
                    arr.push(data[i].district.name);
                }
            }
            for(var j = 0;j < arr.length;j ++){
                obj[j] = {
                    name : arr[j],
                    childs : []
                };
                for(var z = 0;z < dataLength;z ++){
                    if(arr[j] === data[z].district.name){
                        obj[j].childs.push(data[z]);
                    }
                }
            }
            this.setState({
                cinemaList : obj
            })
        })
    }
    toCinemaDetails(id,name){
        localStorage.setItem("titles",name);
        this.props.history.push("/cinemaDeatils/" + id);
    }
    render (){
        var that = this;
        return (
            <div className="cinema">
                <CinemaTitle/>
                <Accordion defaultActiveKey="0" className="my-accordion">
                    {
                        this.state.cinemaList.map(function(item,index){
                            return(
                                <Accordion.Panel header={item.name} key={item.name}>
                                    <List className="my-list">
                                    {
                                        item.childs.map(function(items,index){
                                            return (
                                                <List.Item key={items.id} className='list_wrap' onClick={()=>that.toCinemaDetails(items.id,items.name)}>
                                                    <div className='cinema_name'>
                                                        <h4>{items.name}</h4>
                                                        <span>￥{items.minimumPrice}</span>
                                                    </div>
                                                    <p>{items.address}</p>
                                                    <p>距离未知<span className='space'>|</span>剩余{items.avaliableSchedule}场</p>
                                                </List.Item>
                                            )    
                                        })
                                    }    
                                    </List>
                                </Accordion.Panel>
                            )
                        })
                    }
                </Accordion>
            </div>
        )
    }
}
