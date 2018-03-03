import React,{ Component } from 'react';
import axios from 'axios';
import '../style/choose.css';
import '../iconfont/iconfont2.css';
import ChooseTitle from './title/UpdateTitle';

export default class Choose extends Component {
    constructor(props){
        super(props);
        this.state = {
            chooseList : [],
            hall : "",
            seatList : {},
            seats : [],
            clickNum : 0,
            seatNum : [],
            totalPrice : 0,
            createI : ""
        }
        this.getChooseTime = this.getChooseTime.bind(this);
        this.createSeatAttr = this.createSeatAttr.bind(this);
        this.createSpan = this.createSpan.bind(this);
        this.setChoose = this.setChoose.bind(this);
        this.getSpan = this.getSpan.bind(this);
        this.rightGudge = this.rightGudge.bind(this);
        this.leftGudge = this.leftGudge.bind(this);
        this.cancelGudge = this.cancelGudge.bind(this);
    }
    componentDidMount(){
        var seatid = this.props.match.params.sid;
        axios.get('/v4/api/schedule/' + seatid)
        .then((res)=>{
            // console.log(res)
            this.state.chooseList.push(res.data.data.schedule);
            this.setState({
                chooseList : this.state.chooseList,
                hall : res.data.data.schedule.hall.name
            })
        })
        axios.get('/v4/api/seating-chart/' + seatid + '?__t=1519907368842&partyId=&fundingId=')
        .then((res)=>{
            this.createSeatAttr(res.data.data.seatingChart);
        })
    }
    getChooseTime(item){
        var chooseTime = new Date(item.showAt);
        // console.log(chooseTime);
        return (
            <p>
                <span>
                    {chooseTime.getFullYear() + "-" + (chooseTime.getMonth() + 1) + "-" + chooseTime.getDate()}
                </span>
                <span>
                    {chooseTime.getHours() + ":" +  chooseTime.getMinutes()}
                </span>
                <span>
                    {item.imagery}
                </span>
            </p>
        )
    }
    createSeatAttr(arrs){
        var seat = arrs.seats;
        var w = arrs.width;
        var h = arrs.height;
        var arr = [];
        for(var i = 0;i < h;i ++){
            arr[i] = [];
            for(var j = 0;j < w;j ++){
                arr[i].push({});
            }
        }
        for(var z = 0;z < seat.length;z ++){
            arr[seat[z]["row"] - 1].splice(seat[z]["column"] - 1,1,seat[z]);
        }
        this.setState({
            seatList : arrs,
            seats : arr
        })
    }
    createSpan(item){
        var spanText = "";
        if(item["row"]){
            if(item["isOccupied"]){
                spanText = <i>&#xe65e;</i>;
            }else{
                spanText = <span>&#xe613;</span>;
            }
        }
        return spanText;
    }
    setChoose(obj){
        if(obj["isOccupied"] === false){
            var indexLi = this.state.seatList.width * (obj["row"] - 1)  + obj["column"] - 1;
            const oLi = document.getElementsByClassName("bgLi");
            var oSpan = oLi[indexLi].getElementsByTagName("span")[0];
            const beforeSpan = this.getSpan(obj,oLi,indexLi,-1);
            const bBeforeSPan = this.getSpan(obj,oLi,indexLi,-2);
            const afterSpan =  this.getSpan(obj,oLi,indexLi,+1);
            const aAfterSpan =  this.getSpan(obj,oLi,indexLi,+2);
            var tipsDiv = document.getElementsByClassName("seatTips")[0];
            var oFooter = document.getElementsByClassName("priceFooter")[0];
            var num = this.state.clickNum;
            var seatnum = [...this.state.seatNum];
            var totalprice = 0;
            var createi = "";
            const oButton = oFooter.getElementsByTagName("button")[0];
            if(oSpan.style.background){
                num --;
                seatnum.splice(seatnum.indexOf(obj),1);
                oSpan.style.background = "";
                oSpan.style.border = "1px solid #ccc";
                this.cancelGudge(afterSpan,beforeSpan,tipsDiv,oButton);
                if(num < 1){
                    oFooter.style.display = "none";
                }
            }else{
                num ++;
                if(num > 4){
                    num = 4;
                    alert("每个用户限购4张票");
                }else{
                    oSpan.style.background = "blue";
                    oSpan.style.border = "none";
                    oFooter.style.display = "block";
                    seatnum.push(obj);
                    this.leftGudge(beforeSpan,bBeforeSPan,tipsDiv,oButton);
                    this.rightGudge(afterSpan,aAfterSpan,tipsDiv,oButton);
                }
            }
            totalprice = (this.state.chooseList[0].price.maizuo + this.state.chooseList[0].price.premium) * num;
            createi = <i>=￥{this.state.chooseList[0].price.maizuo + this.state.chooseList[0].price.premium}×{num}</i>;
            this.setState({
                clickNum : num,
                seatNum : seatnum,
                totalPrice : totalprice,
                createI : createi
            })
        }
    }
    rightGudge(afterSpan,aAfterSpan,oDiv,obtn){
        if(afterSpan){
            if(!afterSpan.style.background){
                if(aAfterSpan){
                    if(aAfterSpan.style.background){
                        obtn.style.disabled = "true";
                        obtn.style.background = "#ccc";
                        oDiv.style.top = "0px";
                        setTimeout(()=>{
                            oDiv.style.top = "-0.5rem";
                        },1000); 
                    }
                }else{
                    oDiv.style.top = "0px";
                    obtn.style.disabled = "true";
                    obtn.style.background = "#ccc";
                    setTimeout(()=>{
                        oDiv.style.top = "-0.5rem";
                    },1000); 
                }
            }
        }else{
            obtn.style.disabled = "false";
            obtn.style.background = "#fe8233";
        }
    }
    leftGudge(beforeSpan,bBeforeSPan,oDiv,obtn){
        if(beforeSpan){
            if(!beforeSpan.style.background){
                if(bBeforeSPan){
                    if(bBeforeSPan.style.background){
                        oDiv.style.top = "0px";
                        obtn.style.disabled = "true";
                        obtn.style.background = "#ccc";
                        setTimeout(()=>{
                            oDiv.style.top = "-0.5rem";
                        },1000); 
                    }
                }else{
                    obtn.style.disabled = "true";
                    obtn.style.background = "#ccc";
                    oDiv.style.top = "0px";
                    setTimeout(()=>{
                        oDiv.style.top = "-0.5rem";
                    },1000); 
                }
            }
        }else{
            obtn.style.disabled = "false";
            obtn.style.background = "#fe8233";
        }
    }
    cancelGudge(afterSpan,beforeSpan,oDiv,obtn){
        if(afterSpan){
            if(afterSpan.style.background){
                if(beforeSpan){
                    if(beforeSpan.style.background){
                        obtn.style.disabled = "true";
                        obtn.style.background = "#ccc";
                        oDiv.style.top = "0px";
                        setTimeout(()=>{
                            oDiv.style.top = "-0.5rem";
                        },1000);
                    }
                }else{
                    obtn.style.disabled = "true";
                    obtn.style.background = "#ccc";
                    oDiv.style.top = "0px";
                    setTimeout(()=>{
                        oDiv.style.top = "-0.5rem";
                    },1000);
                }
            }else{
                if(beforeSpan){
                    if(!beforeSpan.style.background){
                        obtn.style.disabled = "false";
                        obtn.style.background = "#fe8233";
                    }
                }
            }
        }else{
            if(beforeSpan){
                if(beforeSpan.style.background){
                    obtn.style.disabled = "true";
                    obtn.style.background = "#ccc";
                    oDiv.style.top = "0px";
                    setTimeout(()=>{
                        oDiv.style.top = "-0.5rem";
                    },1000); 
                }
            }
        }
    }
    getSpan(nowLi,objLi,nowIndex,num){
        var hehe = this.state.seats[nowLi["row"] - 1][nowLi["column"] - 1 + num];
        if(hehe){
            if(hehe["row"]){
                return objLi[nowIndex + num].getElementsByTagName("span")[0];
            }else{
                return "";
            }
        }else{
            return "";
        }
    }
    render (){
        var that = this;
        var oWarpSeat = document.getElementsByClassName("warpSeat")[0];
        if(oWarpSeat){
            oWarpSeat.addEventListener("gesturechange",editForm);
            function editForm(event){
                if(event.scale > 0.5 && event.scale < 2){
                     oWarpSeat.style.transformOrigin = event.clientX + "px " + event.clientY + "px";
                     oWarpSeat.style.transform = "scale(" + event.scale +")";
                }
            }
        }
        return (
            <div className="choose iconfont2">
                <ChooseTitle/>
                {
                    this.state.chooseList.map((item,index)=>{
                        return (
                            <div className="chooseTop" key={item.id}>
                                <div>
                                    <p>{item.cinema.name}</p>
                                    {that.getChooseTime(item)}
                                </div>
                                <h4>换一场</h4>
                            </div>
                        )
                    })
                }
                <div className="chooseSeat">
                    <div className="warpSeat">
                        <div className="sub-title">{this.state.hall}荧幕方向</div>
                        <div className="seat_warp">
                            {
                                this.state.seats.map((item,index)=>{
                                    return(
                                        <ul key={index} className="seatUl">
                                            <h3><span>{index + 1}</span></h3>
                                            {
                                                item.map((items,indexs)=>{
                                                    return(
                                                        <li key={indexs}  onClick={()=>this.setChoose(items)} className="bgLi">
                                                            {that.createSpan(items)}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="seatTips">选座时请不要留出单个空位哦</div>
                <div className="priceFooter">
                    <ul>
                        {
                            this.state.seatNum.map((itemp,indexp)=>{
                                return(
                                    <li key={itemp.row + "" + itemp.column}>
                                        <span>{itemp.rowName}排{itemp.columnName}座</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div>
                        <p>
                            <span>￥{this.state.totalPrice}.00</span>
                            {this.state.createI}
                        </p>
                        <button>确认</button>
                    </div>
                </div>
            </div>
        )
    }
}
