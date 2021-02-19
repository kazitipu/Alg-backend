import { combineReducers } from "redux";
import setAdminsReducer from "./admins";
import setOrdersReducer from "./orders";
import setPaymentsReducer from "./payments";
import setProductsReducer from "./products";
import setLotsReducer from "./lots";
import setOrdersAlgReducer from "./ordersAlg";
import setExpressRatesDocumentsReducer from "./expressRatesDocuments";
import setExpressRatesParcelReducer from "./expressRatesParcel";
import setD2DRatesReducer from "./d2dRates";
const rootReducer = combineReducers({
  lots: setLotsReducer,
  orders: setOrdersReducer,
  payments: setPaymentsReducer,
  admins: setAdminsReducer,
  products: setProductsReducer,
  ordersAlg: setOrdersAlgReducer,
  expressRatesDocuments: setExpressRatesDocumentsReducer,
  expressRatesParcel: setExpressRatesParcelReducer,
  d2dRates: setD2DRatesReducer,
});

export default rootReducer;
