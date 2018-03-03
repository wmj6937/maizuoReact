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
            dispatch({
                type : "DETAILS_ADD_TO_DO",
                payload : localStorage.getItem("titles")
            })
        })()
    }
}

const DUpdateTitle = connect(null,mapDispatchToProps)(DUpdateTitleUI);

export default DUpdateTitle;