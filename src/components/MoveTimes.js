import React,{ Component } from 'react';
import axios from 'axios';
import '../style/moveTimes.css';
import { Tabs, WhiteSpace ,Badge } from 'antd-mobile';

export default class MoveTimes extends Component {
    constructor(props){
        super(props);
        this.state = {
            MoveList : [],     //影院电影数据
            tabs1 : [],        //电影头部数据
            MoveDList : [],    //电影时间数据 
            tabs2 : []         //时间头部数据 
        }
        this.getTimeMove = this.getTimeMove.bind(this);        //整合电影数据
        this.successData = this.successData.bind(this);        //获取整合电影时间数据：影院id和电影id
        this.toMoveDate = this.toMoveDate.bind(this);          //电影点击事件，时间列表更新 
        this.createAttrMove = this.createAttrMove.bind(this);  //时间列表标签
        this.toChoose = this.toChoose.bind(this);              //跳转选座页面 
    }
    //获取电影数据
    componentDidMount(){
        var id = this.props.match.params.mid;         //影院id
        axios.get("/v4/api/cinema/" + id + "/film")
        .then((res)=>{
            this.getTimeMove(res.data.data.filmList);
        })
    }
    //整合电影数据
    getTimeMove(arr){
        var len = arr.length;
        var mTabs = []
        for(var i = 0;i < len;i ++){
            mTabs[i] = {
                title : <Badge className="moveImg"><img className="imgstyle" src={arr[i].posterAddress} alt=""/></Badge>
            };
        }
        this.setState({
            MoveList : arr,
            tabs1 : mTabs,
        })
        //电影时间数据：影院id和电影id
        this.successData(this.props.match.params.mid,arr[0].filmID);
    }
    //电影时间数据
    successData(mid,did){
        //获取数据
        axios.get("/v4/api/schedule?__t=1519725751382&film=" + did + "&cinema=" + mid)
        .then((res)=>{
            var arr = res.data.data.schedules
            var len = arr.length;
            var num = [];
            var all = [];
            var nowIndex = -1;
            var MoveDListS = [];
            var tabsS = [];
            //整合电影时间数据
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
            //整合电影时间头部数据
            var nowDate = new Date();
            for(var j = 0;j < num.length;j ++){
                var D = new Date(arr[num[j]].showAt);
                switch(j){
                    case 0 : switch(D.getDate()){
                        case nowDate.getDate() : tabsS[0] = {
                            "title" : <Badge className="dateWidth">{"今天(" + (D.getMonth() + 1) + "/" + D.getDate() + ")"}</Badge>
                        };break;
                        case nowDate.getDate() + 1 : tabsS[0] = {
                            "title" : <Badge className="dateWidth">{"明天(" + (D.getMonth() + 1) + "/" + D.getDate() + ")"}</Badge>
                        };break;
                        case nowDate.getDate() + 2 : tabsS[0] = {
                            "title" : <Badge className="dateWidth">{"后天(" + (D.getMonth() + 1) + "/" + D.getDate() + ")"}</Badge>
                        };break;
                        default : tabsS[0] = {
                            "title" : <Badge className="dateWidth">{(D.getMonth() + 1) + "月" + D.getDate() + "日"}</Badge>
                        };break;
                    };break;
                    case 1 : switch(D.getDate()){
                        case nowDate.getDate() + 1 : tabsS[1] = {
                            "title" : <Badge className="dateWidth">{"明天(" + (D.getMonth() + 1) + "/" + D.getDate() + ")"}</Badge>
                        };break;
                        case nowDate.getDate() + 2 : tabsS[1] = {
                            "title" : <Badge className="dateWidth">{"后天(" + (D.getMonth() + 1) + "/" + D.getDate() + ")"}</Badge>
                        };break;
                        default : tabsS[1] = {
                            "title" : <Badge className="dateWidth">{(D.getMonth() + 1) + "月" + D.getDate() + "日"}</Badge>
                        };break;
                    };break;
                    case 2 : switch(D.getDate()){
                        case nowDate.getDate() + 2 : tabsS[2] = {
                            "title" : <Badge className="dateWidth">{"后天(" + (D.getMonth() + 1) + "/" + D.getDate() + ")"}</Badge>
                        };break;
                        default : tabsS[2] = {
                            "title" : <Badge className="dateWidth">{(D.getMonth() + 1) + "月" + D.getDate() + "日"}</Badge>
                        };break;
                    };break;
                    default : tabsS[j] = {
                        "title" : <Badge className="dateWidth">{(D.getMonth() + 1) + "月" + D.getDate() + "日"}</Badge>
                    };break;
                }
            }
            //数据更新刷新dom
            this.setState({
                MoveDList : MoveDListS,
                tabs2 : tabsS
            })
        })
    }
    //电影点击事件触发函数：被点击电影对应的下标
    toMoveDate(inde){
        var imgattr = document.getElementsByClassName("imgstyle");
        for(var a = 0;a < imgattr.length;a ++){
            var imgOpacity = window.getComputedStyle(imgattr[a],1).opacity;
            if(imgOpacity === "1"){
                imgattr[a].style.opacity = 0.5;
            }
        }
        imgattr[inde].style.opacity = 1;
        var getid = this.state.MoveList[inde];
        if(getid){
            //更新电影时间列表
            this.successData(this.props.match.params.mid,getid.filmID);
        }
    }
    createAttrMove(obj){
        var tShowAt = new Date(obj.showAt);
        var tStopSellingAt = new Date(obj.stopSellingAt);
        var yPrice = obj.price.cinema;
        var xPrice = obj.price.maizuo;
        var language = obj.film.language;
        var name = obj.hall.name;
        var showhours = tShowAt.getHours() < 10 ? "0" + tShowAt.getHours() : tShowAt.getHours();
        var showminutes = tShowAt.getMinutes() < 10 ? "0" + tShowAt.getMinutes() : tShowAt.getMinutes();
        var stophours = tStopSellingAt.getHours() < 10 ? "0" + tStopSellingAt.getHours() : tStopSellingAt.getHours();
        var stopminutes = tStopSellingAt.getMinutes() < 10 ? "0" + tStopSellingAt.getMinutes() : tStopSellingAt.getMinutes();
        return (
            <dl>
                <dt>
                    <span>{showhours + ":" + showminutes}</span>
                    <span>￥{xPrice}</span>
                </dt>
                <dd>
                    <p>
                        <span>预计{stophours + ":" + stopminutes}结束/{language}{obj.imagery}/{name}</span>
                        <span>￥{yPrice}</span>
                    </p>
                    <i>&#xe610;</i>
                </dd>
            </dl> 
        )
    }
    //编程式跳转选座页
    toChoose(id,name){
        //本地存储选取的电影名字
        localStorage.setItem("titles",name);
        this.props.history.push('/choose/' + id);
    }
    render() {
        var that = this;
        return (
            <div className="moveTimes">
                {/* 电影列表 */}
                <div className="warpTop">
                    <div className="moveTop">
                        <WhiteSpace />
                            <Tabs 
                            tabs={this.state.tabs1} 
                            animated={false} 
                            tabBarBackgroundColor="#38403e"
                            onTabClick={(tab, index) => {that.toMoveDate(index)}}>
                                {
                                    this.state.MoveList.map((item,index)=>{
                                        return(
                                            <div className="moveBottom" key={item.filmID}>
                                                <p>{item.filmName}</p>
                                            </div>
                                        )
                                    })
                                }   
                            </Tabs>
                        <WhiteSpace />
                    </div>
                </div>
                {/* 电影时间列表 */}
                <div className="moveDate">
                    <WhiteSpace />
                        <Tabs 
                        tabs={this.state.tabs2} 
                        tabBarActiveTextColor="#e9681f" 
                        animated={false}>
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
            </div>
        );
    }
}