import React, { Component } from 'react';
import '../style/header.css';
import Title from './title/Title';

class Header extends Component {
    constructor(){
        super();
        this.state = {
            city : ""
        }
    }
    componentDidMount(){
        var that = this;
        var geolocation = new window.BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() === 0){
                that.setState({
                    city : r.address.city
                })
            }   
        },{enableHighAccuracy: true})
    }
    render() {
        return (
            <header onClick={this.props.Dih}>
                <div id="list" onClick={this.props.change}>
                    <i>&#xe643;</i>
                </div>
                <div id="honePage">
                    <Title/>
                </div>
                <div id="place">
                    <i>{this.state.city}</i>
                    <span>&#xe687;</span>
                </div>
                <div id="my">&#xe616;</div>
            </header>
        );
    }
}

export default Header;
