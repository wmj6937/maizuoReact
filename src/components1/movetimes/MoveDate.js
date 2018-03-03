import React,{ Component } from 'react';
import axios from 'axios';
import '../../style/moveTimes.css';
import { Tabs, WhiteSpace } from 'antd-mobile';
import {withRouter} from 'react-router-dom';

class MoveTimes extends Component {
    constructor(props){
        super(props);
        this.state = {
            MoveDList : [],
            tabs : []
        }
        this.successData = this.successData.bind(this);
        this.createAttrMove = this.createAttrMove.bind(this);
        this.toChoose = this.toChoose.bind(this);
    }
    componentDidMount(){
        this.successData();
    }
    successData(){
        var did = this.props.match.params.did;
        var mid = this.props.match.params.mid;
        axios.get("/v4/api/schedule?__t=1519725751382&film=" + did + "&cinema=" + mid)
        .then((res)=>{
            var arr = res.data.data.schedules;
            // console.log(arr);
            var len = arr.length;
            var num = [];
            var all = [];
            var nowIndex = -1;
            var MoveDListS = [];
            var tabsS = [];
            for(var i = 0;i < len;i ++){
                var data = new Date(arr[i].showAt);
                if(all.indexOf(data.getDate()) === -1){
                    nowIndex ++;
                    all.push(data.getDate());
                    num.push(i);
                    MoveDListS[nowIndex] = {
                        type : data.getDate(),
                        childs : [arr[i]]
                    }
                }else{
                    if(MoveDListS[nowIndex].type === data.getDate()){
                        MoveDListS[nowIndex].childs.push(arr[i]);
                    }
                }
            }
            for(var j = 0;j < num.length;j ++){
                var D = new Date(arr[num[j]].showAt)
                switch(j){
                    case 0 : tabsS[0] = {
                        "title" : "今天(" + (D.getMonth() + 1) + "/" + D.getDate() + ")"
                    };break;
                    case 1 : tabsS[1] = {
                        "title" : "明天(" + (D.getMonth() + 1) + "/" + D.getDate() + ")"
                    };break;
                    case 2 : tabsS[2] = {
                        "title" : "后天(" + (D.getMonth() + 1) + "/" + D.getDate() + ")"
                    };break;
                    default : tabsS[j] = {
                        "title" : (D.getMonth() + 1) + "月" + D.getDate() + "日"
                    };break;
                }
            }
            this.setState({
                MoveDList : MoveDListS,
                tabs : tabsS
            })
        })
    }
    createAttrMove(obj){
        var tShowAt = new Date(obj.showAt);
        var tStopSellingAt = new Date(obj.stopSellingAt);
        var yPrice = obj.price.cinema;
        var xPrice = obj.price.maizuo;
        var language = obj.film.language;
        var name = obj.hall.name;
        return (
            <dl>
                <dt>
                    <span>{tShowAt.getHours() + ":" + tShowAt.getMinutes()}</span>
                    <span>￥{xPrice}</span>
                </dt>
                <dd>
                    <p>
                        <span>预计{tStopSellingAt.getHours() + ":" + tStopSellingAt.getMinutes()}结束/{language}{obj.imagery}/{name}</span>
                        <span>￥{yPrice}</span>
                    </p>
                    <i>&#xe610;</i>
                </dd>
            </dl> 
        )
    }
    toChoose(id,name){
        localStorage.setItem("titles",name);
        this.props.history.push('/choose/' + id);
    }
    render() {
        var that = this;
        return (
            <div className="moveDate">
                <WhiteSpace />
                    <Tabs 
                    tabs={this.state.tabs} 
                    tabBarActiveTextColor="#e9681f" 
                    animated={false} 
                    distanceToChangeTab={0.3}>
                    {
                        this.state.MoveDList.map((item,index)=>{
                            return(
                                <div className="dateList" key={index}>
                                    {
                                        item.childs.map((items,index)=>{
                                            return(
                                                <div key={items.id} onClick={()=>that.toChoose(items.id,items.film.name)}>
                                                    {that.createAttrMove(items)}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }    
                    </Tabs>
                <WhiteSpace />
            </div>
        );
    }
}

export default withRouter(MoveTimes);