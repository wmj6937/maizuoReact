export default function(state = "卖座电影",action){
    switch(action.type){
        case "ADD_TO_DO" :
            var newState = action.payload;
            return newState;
        case "DETAILS_ADD_TO_DO" :
            var newStateDetaile = action.payload;
            return newStateDetaile;    
        default : 
            return state;    
    }
}