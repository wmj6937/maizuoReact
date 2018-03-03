import React,{ Component } from 'react';
import '../../style/main1.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Main1 extends Component {
    constructor(){
        super();
        this.state = {
            films1 : []
        }
        this.toDeatils = this.toDeatils.bind(this);
        this.toList = this.toList.bind(this);
    }
    componentDidMount(){
        axios.get('v4/api/film/now-playing?__t=1518256185124&page=1&count=5')
        .then((res)=>{
            // console.log(res);
            this.setState({
                films1 : res.data.data.films
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
    render (){
        var that = this;
        return (
            <article>
                {     
                    this.state.films1.map(function(item,index){
                        return (
                            <dl key={item.id} onClick={()=>that.toDeatils(item.id,item.name)}>
                                <dt><img src={item.cover.origin} alt=""/></dt>
                                <dd>
                                    <div id="left">
                                        <h4>{item.name}</h4>
                                        <p>{item.cinemaCount}家影院上线{item.watchCount}人购票</p>
                                    </div>
                                    <div className="right">
                                        <span>{item.grade}</span>
                                    </div>
                                </dd>
                            </dl>
                        )
                    })
                }
                <h3 onClick={()=>that.toList(0)}>更多热映电影</h3>
            </article>
        )
    }
}

export default withRouter(Main1);