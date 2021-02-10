import { combineReducers } from 'redux';
import setAdminsReducer from './admins';
import setOrdersReducer from './orders'
import setPaymentsReducer from './payments'
import setProductsReducer from './products'


const rootReducer = combineReducers({
    orders:setOrdersReducer,
    payments:setPaymentsReducer,
    admins:setAdminsReducer,
    products:setProductsReducer
});

export default rootReducer;