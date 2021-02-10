const INITIAL_STATE = {products:[]}

const setProductsReducer = (state =INITIAL_STATE, action)=>{
    switch (action.type){
        case 'SET_ALL_PRODUCTS':
            return {...state, products :[...action.payload]}
        default:
            return {...state}
    }
        
}
export default setProductsReducer;