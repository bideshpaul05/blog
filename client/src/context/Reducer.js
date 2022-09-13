const Reducer = (state,action)=>{
    switch(action.type){
        case "loginstart":
            return {
                user:null,
                isFetching:true,
                error:false
            }
            case "loginsuccess":
                return {
                    user:action.payload,
                    isFetching:false,
                    error:false
                }
                case "loginfailure":
            return {
                user:null,
                isFetching:false,
                error:true
            }
            case "logout":
               
                return {
                    user:null,
                    isFetching:false,
                    error:false
                }
            case "updatestart":
                return {
                   ...state,
                    error:false
                }
                case "updatesuccess":
                    return {
                        user:action.payload,
                        isFetching:false,
                        error:false
                    }
                case "updatefailure":
                return {
                    user:state.user,
                    isFetching:false,
                    error:true
                }
      

            default : return state
    }
}
export default Reducer