import React,{ Component } from 'react';
import '../../style/main2.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Main2 extends Component {
    constructor(){
        super();
        this.state = {
            films2 : []
        }
        this.toDeatils = this.toDeatils.bind(this);
        this.toList = this.toList.bind(this);
        this.mGetdate = this.mGetdate.bind(this);
    }
    componentDidMount(){
        axios.get('v4/api/film/coming-soon?__t=1518256185130&page=1&count=3')
        .then((res)=>{
            // console.log(res);
            this.setState({
                films2 : res.data.data.films
            })
        })
    }
    toDeatils(id,name){
        localStorage.setItem("titles",name);
        this.props.history.push("/details/" + id);
    }
    toList(ind){
        localStorage.setItem("titles","卖座电影");
        this.props.history.push('/list/' + ind);
    }
    mGetdate(time){
        var data = new Date(time);
        return (
            <p><i>{data.getMonth() + 1}月{data.getDate()}日上映</i></p>
        );
    }
    render (){
        var that = this;
        return (
            <div className="mymain2">
                <div id="soon_box">
                <div className="soon">
                    <span>
                        即将上映
                    </span>
                </div>
                </div>
                <main>
                    {
                        this.state.films2.map(function(item,index){
                            return (
                                <dl key={item.id} onClick={()=>that.toDeatils(item.id,item.name)}>
                                    <dt><img src={item.cover.origin} alt=""/></dt>
                                    <dd>
                                        <h4>{item.name}</h4>
                                        {that.mGetdate(item.premiereAt)}
                                    </dd>
                                </dl>
                            )
                        })
                    }
                    <h3 onClick={()=>that.toList(1)}>更多即将上映电影</h3>
                </main>
            </div>
        )
    }
}

export default withRouter(Main2);