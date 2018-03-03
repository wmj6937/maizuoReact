import React,{ Component } from 'react';
import axios from 'axios';
import '../style/cinemaDeatils.css';
import { Tabs, WhiteSpace ,Badge } from 'antd-mobile';
import '../iconfont/iconfont1.css';
import CinemaDeatilsTitle from './title/UpdateTitle';

const tabs = [
    { title: <Badge className="cBadge"><span>&#xe6b1;</span><i>取票</i></Badge>},
    { title: <Badge className="cBadge"><span>&#xe673;</span><i>3D</i></Badge>},
    { title: <Badge className="cBadge"><span>&#xe836;</span><i>停车</i></Badge>},
    { title: <Badge className="cBadge"><span>&#xe693;</span><i>优惠</i></Badge>},
    { title: <Badge className="cBadge"><span>&#xe621;</span><i>交通</i></Badge>},
]; 
export default class CinemaDeatils extends Component {
    constructor(props){
        super(props);
        this.state = {
            cDetails : {},
            cDescription : {
                "取票" : "暂无信息",
                "3D" : "暂无信息",
                "停车" : "暂无信息",
                "优惠" : "暂无信息",
                "交通" : "暂无信息"
            }
        }
        this.toMoveTimes = this.toMoveTimes.bind(this);
    }
    componentDidMount(){
        var cid = this.props.match.params.cid;
        axios.get("/v4/api/cinema/" + cid + "?__t=1519646120092")
        .then((res)=>{
            // console.log(res);
            var D = res.data.data.cinema.services;
            var dLength = D.length;
            var cDescriptionS = this.state.cDescription;
            for(var i = 0;i < dLength;i ++){
                cDescriptionS[D[i].name] = D[i].description;
            }
            this.setState({
                cDetails : res.data.data.cinema,
                cDescription : cDescriptionS
            })
        })
    }
    toMoveTimes(mid){
        this.props.history.push("/moveTimes/" + mid);
    }
    render (){
        var that = this;
        return (
            <div className="cinemaDeatils iconfont1">
                <CinemaDeatilsTitle/>
                <h3><img src="https://static.m.maizuo.com/v4/static/app/asset/66461d1a02a9eaa64876c90952c42aed.png" alt=""/></h3>
                <dl>
                    <dt>&#xe615;</dt>
                    <dd>
                        <h4><span>订座票</span><button onClick={()=>that.toMoveTimes(this.state.cDetails.id)}>立即订座</button></h4>
                        <p>选好场次及座位，到影院自助机取票</p>
                    </dd>
                </dl>
                <dl>
                    <dt>&#xe6b1;</dt>
                    <dd>
                        <h4><span>通兑票</span><button>立即订票</button></h4>
                        <p>有效期内到影院前台兑换影票</p>
                    </dd>
                </dl>
                <dl>
                    <dt>&#xe72b;</dt>
                    <dd>
                        <h4><span>小卖品</span><button>购买</button></h4>
                    </dd>
                </dl>
                <dl>
                    <dt>&#xe617;</dt>
                    <dd>
                        <h4>{this.state.cDetails.address}</h4>
                    </dd>
                </dl>
                <dl>
                    <dt>&#xe634;</dt>
                    <dd>
                        <h4>{this.state.cDetails.telephones}</h4>
                    </dd>
                </dl>
                <div className="tips">
                    <WhiteSpace />
                        <Tabs tabs={tabs} initialPage={2} animated={false} useOnPan={false}>
                            <div className="tipsH">
                                {this.state.cDescription["取票"]}
                            </div>
                            <div className="tipsH">
                                {this.state.cDescription["3D"]}
                            </div>
                            <div className="tipsH">
                                {this.state.cDescription["停车"]}
                            </div>
                            <div className="tipsH">
                                {this.state.cDescription["优惠"]}
                            </div>
                            <div className="tipsH">
                                {this.state.cDescription["交通"]}
                            </div>
                        </Tabs>
                    <WhiteSpace />
                </div>
            </div>
        )
    }
}
