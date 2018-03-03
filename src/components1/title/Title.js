import React,{ Component } from 'react';
import { connect } from 'react-redux';

class TitleUI extends Component{
    render (){
        console.log(this.props);
        return (
            <span>
                {this.props.hehe}
            </span>
        )
    }
}

const mapStateToProps = (state,props)=>{
    return {
        hehe : state.todo_list
    }
}

const mapDispatchToProps = (dispatch,props)=>{
    return {
        addToDo : (function(){
            var tt = localStorage.getItem("titles") ? localStorage.getItem("titles") : "卖座电影";
            dispatch({
                type : "ADD_TO_DO",
                payload : tt
            })
        })()
    }
}

const Title = connect(mapStateToProps,mapDispatchToProps)(TitleUI);

export default Title;