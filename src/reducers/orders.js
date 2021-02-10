const INITIAL_STATE = {orders:[]}

const setOrdersReducer = (state =INITIAL_STATE, action)=>{
    switch (action.type){
        case 'SET_ALL_ORDERS':
            return {...state, orders :[...action.payload]}
        default:
            return {...state}
    }
        
}
export default setOrdersReducer;