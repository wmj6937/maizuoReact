export default function(state = "",action){
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