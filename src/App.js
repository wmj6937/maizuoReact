import React, { Component } from 'react';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Menu from './components/Menu';
import List from './components/List';
import Details from './components/Details';
import Cinema from './components/Cinema';
import CinemaDeatils from './components/CinemaDetails';
import MoveTimes from './components/MoveTimes';
import Choose from './components/Choose';
import './iconfont/iconfont.css';
import './style/App.css';
import './style/reset.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            Flag : false
        }
        this.changeFlag = this.changeFlag.bind(this);
        this.dism = this.dism.bind(this);
        this.dish = this.dish.bind(this);
        this.disLI = this.disLI.bind(this);
    }
    changeFlag(evt){
        evt.stopPropagation();
        this.setState({
            Flag : !this.state.Flag
        })
    }
    dism (evt){
		var e = evt || window.event;
		if(e.target.className.indexOf("sidebar") !== -1){
            this.setState({
                Flag : false
            })
        }
    }
    dish (evt){
        var e = evt || window.event;
        if(e.target.id !== "list"){
            this.setState({
                Flag : false
            })
        }
    }
    disLI (){
        this.setState({
            Flag : false
        })                                                                                                
    }
    render() {
        return (
            <Router>
                <div className="App iconfont">
                    <Header change={this.changeFlag} Dih={this.dish}/>
                    <Menu Fl={this.state.Flag} Dim={this.dism} DiLI={this.disLI}/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/list/:ind" component={List}/>
                    <Route path="/details/:fid" component={Details}/>
                    <Route path="/cinema/:id" component={Cinema}/>
                    <Route path="/cinemaDeatils/:cid" component={CinemaDeatils}/>
                    <Route path="/moveTimes/:mid" component={MoveTimes}/>
                    <Route path="/choose/:sid" component={Choose}/>
                </div>
            </Router>
        );
    }
}

export default App;
