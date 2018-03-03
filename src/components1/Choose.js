import React,{ Component } from 'react';
import axios from 'axios';
import '../style/choose.css';
import { Grid } from 'antd-mobile';
import ChooseTitle from './title/UpdateTitle';

const data = Array.from(new Array(512)).map((_val, i) => ({
}));
  
export default class Choose extends Component {
    constructor(props){
        super(props);
        this.state = {
            chooseList : [],
            hall : ""
        }
        this.getChooseTime = this.getChooseTime.bind(this);
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
    render (){
        var that = this;
        return (
            <div className="choose">
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
                        <Grid data={data} columnNum={32} />
                    </div>
                </div>
            </div>
        )
    }
}
