import React,{ Component } from 'react';
import { Carousel } from 'antd-mobile';
import axios from 'axios';
import '../../style/swiper.css';

export default class Swiper extends Component {
  state = {
    data : [{"imageUrl":""}, {"imageUrl":""}, {"imageUrl":""}],
    imgHeight: 176
  }
    componentDidMount() {
        axios.get("v4/api/billboard/home?__t=1519826721281")
        .then((res)=>{
            if(res.data.data.billboards){
              this.setState({
                data : res.data.data.billboards
              })
            }
        })
    }
    render() {
      return (
          <Carousel
            autoplay
            infinite     
            autoplayInterval={2000}
            dots={false}
          >
            {this.state.data.map((val,index) => (
              <a
                key={index}
                style={{ display: 'inline-block', width: '100%'}}
              >
                <img
                  src={val.imageUrl}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
          </Carousel>
      );
    }
  }