import React,{ Component } from 'react';
import axios from 'axios';
import '../style/moveTimes.css';
import MoveDate from "./movetimes/MoveDate";
import {Route,BrowserRouter as Router} from 'react-router-dom';
import { Tabs, WhiteSpace ,Badge } from 'antd-mobile';

export default class MoveTimes extends Component {
    constructor(props){
        super(props);
        this.state = {
            MoveList : [],
            tabs : []
        }
        this.toMoveDate = this.toMoveDate.bind(this);
        this.getTimeMove = this.getTimeMove.bind(this);
    }
    componentDidMount(){
        var id = this.props.match.params.mid;
        axios.get("/v4/api/cinema/" + id + "/film")
        .then((res)=>{
            this.getTimeMove(res.data.data.filmList);
            this.toMoveDate(0);
        })
    }
    getTimeMove(arr){
        var len = arr.length;
        var mTabs = []
        for(var i = 0;i < len;i ++){
            mTabs[i] = {
                title : <Badge className="moveImg"><img src={arr[i].posterAddress} alt=""/></Badge>
            };
        }
        this.setState({
            MoveList : arr,
            tabs : mTabs
        })
    }
    toMoveDate(inde){
        var getid = this.state.MoveList[inde];
        if(getid){
            this.props.history.push(this.props.match.url + "/moveDate/" + getid.filmID);
        }
    }
    render() {
        var that = this;
        return (
            <Router>
                <div className="moveTimes">
                    <div className="warpTop">
                        <div className="moveTop">
                            <WhiteSpace />
                                <Tabs 
                                tabs={this.state.tabs} 
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
                    <Route path={this.props.match.path + "/moveDate/:did"} component={MoveDate}></Route>
                </div>
            </Router>
        );
    }
}