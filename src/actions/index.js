import {
  uploadLot,
  updateLot,
  getAllLots,
  uploadOrderD2D,
  getAllOrdersD2D,
  getAllExpressOrders,
  updateExpressOrder,
  getAllDocumentExpressRates,
  uploadExpressRatesDocuments,
  updateExpressRatesDocuments,
  deleteExpressRatesDocuments,
  getAllExpressRatesParcel,
  uploadExpressRatesParcel,
  updateExpressRatesParcel,
  deleteExpressRatesParcel,
} from "../firebase/firebase.utils";

export const setAllOrders = (ordersArray) => ({
  type: "SET_ALL_ORDERS",
  payload: ordersArray,
});
export const setAllPayments = (paymentsArray) => ({
  type: "SET_ALL_PAYMENTS",
  payload: paymentsArray,
});
export const setAllAdmins = (adminsArray) => ({
  type: "SET_ALL_ADMINS",
  payload: adminsArray,
});
export const setCurrentAdmin = (adminObj) => ({
  type: "SET_CURRENT_ADMIN",
  payload: adminObj,
});

export const setAllProducts = (productsArray) => ({
  type: "SET_ALL_PRODUCTS",
  payload: productsArray,
});

export const rechargeAdminredux = (adminIdArray, balance) => {
  return {
    type: "RECHARGE_ADMIN",
    payload: {
      adminIdArray,
      balance,
    },
  };
};
//  lots
export const getAllLotsRedux = () => async (dispatch) => {
  const lotsArray = await getAllLots();
  dispatch({ type: "GET_ALL_LOTS", payload: lotsArray });
};

export const uploadLotRedux = (lotObj) => async (dispatch) => {
  const uploadedlotObj = await uploadLot(lotObj);
  dispatch({ type: "UPLOAD_LOT", payload: uploadedlotObj });
};

export const updateLotRedux = (lotObj) => async (dispatch) => {
  const updatedLotObj = await updateLot(lotObj);
  dispatch({ type: "UPDATE_LOT", payload: updatedLotObj });
};

export const updateProfileImageRedux = (imgUrl) => {
  return {
    type: "UPDATE_PROFILE_IMAGE",
    payload: imgUrl,
  };
};

// Orders

export const getAllOrdersD2DRedux = () => async (dispatch) => {
  const ordersArrayD2D = await getAllOrdersD2D();
  dispatch({ type: "GET_ALL_ORDERS_D2D", payload: ordersArrayD2D });
};

export const uploadOrderD2DRedux = (orderObj) => async (dispatch) => {
  const uploadedOrderObj = await uploadOrderD2D(orderObj);
  dispatch({ type: "UPLOAD_ORDERS_D2D", payload: uploadedOrderObj });
};

// Express
export const getAllExpressOrdersRedux = () => async (dispatch) => {
  const ordersArrayExpress = await getAllExpressOrders();
  dispatch({ type: "GET_ALL_EXPRESS_ORDERS", payload: ordersArrayExpress });
};

export const updateExpressOrderStatusRedux = (id, month) => async (
  dispatch
) => {
  const updatedExpressOrder = await updateExpressOrder(id, month);
  dispatch({
    type: "UPDATE_EXPRESS_ORDER_STATUS",
    payload: updatedExpressOrder,
  });
};

// Express Rates

export const getAllDocumentExpressRatesRedux = () => async (dispatch) => {
  const documentExpressRatesArray = await getAllDocumentExpressRates();
  dispatch({
    type: "GET_ALL_DOCUMENT_EXPRESS_RATES",
    payload: documentExpressRatesArray,
  });
};

export const uploadExpressRatesDocumentsRedux = (countryObj) => async (
  dispatch
) => {
  const uploadedExpressRatesDocumentsObj = await uploadExpressRatesDocuments(
    countryObj
  );
  dispatch({
    type: "UPLOAD_EXPRESS_RATES_DOCUMENTS",
    payload: uploadedExpressRatesDocumentsObj,
  });
};

export const updateExpressRatesDocumentsRedux = (countryObj) => async (
  dispatch
) => {
  const updatedExpressRatesDocumentsObj = await updateExpressRatesDocuments(
    countryObj
  );
  dispatch({
    type: "UPDATE_EXPRESS_RATES_DOCUMENTS",
    payload: updatedExpressRatesDocumentsObj,
  });
};
export const deleteExpressRatesDocumentsRedux = (countryId) => async (
  dispatch
) => {
  await deleteExpressRatesDocuments(countryId);
  dispatch({
    type: "DELETE_EXPRESS_RATES_DOCUMENTS",
    payload: countryId,
  });
};

// Parcel Rates

export const getAllExpressRatesParcelRedux = () => async (dispatch) => {
  const expressRatesParcelArray = await getAllExpressRatesParcel();
  dispatch({
    type: "GET_ALL_EXPRESS_RATES_PARCEL",
    payload: expressRatesParcelArray,
  });
};

export const uploadExpressRatesParcelRedux = (countryObj) => async (
  dispatch
) => {
  const uploadedExpressRatesParcelObj = await uploadExpressRatesParcel(
    countryObj
  );
  dispatch({
    type: "UPLOAD_EXPRESS_RATES_PARCEL",
    payload: uploadedExpressRatesParcelObj,
  });
};

export const updateExpressRatesParcelRedux = (countryObj) => async (
  dispatch
) => {
  const updatedExpressRatesParcelObj = await updateExpressRatesParcel(
    countryObj
  );
  dispatch({
    type: "UPDATE_EXPRESS_RATES_PARCEL",
    payload: updatedExpressRatesParcelObj,
  });
};
export const deleteExpressRatesParcelRedux = (countryId) => async (
  dispatch
) => {
  await deleteExpressRatesParcel(countryId);
  dispatch({
    type: "DELETE_EXPRESS_RATES_PARCEL",
    payload: countryId,
  });
};
