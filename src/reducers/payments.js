const INITIAL_STATE = {payments:[]}

const setPaymentsReducer = (state =INITIAL_STATE, action)=>{
    switch (action.type){
        case 'SET_ALL_PAYMENTS':
            return {...state, payments :[...action.payload]}
        default:
            return {...state}
    }
        
}
export default setPaymentsReducer;