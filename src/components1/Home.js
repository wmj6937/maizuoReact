import React,{ Component } from 'react';
import Swiper from './home/Swiper';
import Main1 from './home/Main1';
import Main2 from './home/Main2';
import HomeTitle from './title/UpdateTitle';
import '../style/Home.css';


export default class Home extends Component {
    render (){
        return (
            <div className="homePage">
                <HomeTitle/>
                <Swiper/>
                <Main1/>
                <Main2/>
            </div>
        )
    }
}