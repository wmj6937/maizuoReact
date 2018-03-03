import React,{ Component } from 'react';
import { connect } from 'react-redux';

class DUpdateTitleUI extends Component{
    render (){
        return (
            <div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch,props)=>{
    return {
        detailsAddToDo : (function(){
            var tts = localStorage.getItem("titles") ? localStorage.getItem("titles") : "卖座电影";
            dispatch({
                type : "DETAILS_ADD_TO_DO",
                payload : tts
            })
        })()
    }
}

const DUpdateTitle = connect(null,mapDispatchToProps)(DUpdateTitleUI);

export default DUpdateTitle;