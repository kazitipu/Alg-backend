import {
  getAllBookings,
  updateBooking,
  uploadLot,
  updateLot,
  getAllLots,
  uploadOrder,
  updateOrder,
  updateOrderBeforeInvoice,
  updateOrderAfterInvoice,
  getAllOrdersOfSingleLot,
  deleteSingleOrder,
  getSingleOrder,
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
  getAllD2DRates,
  updateD2DRates,
  uploadD2DRates,
  deleteD2DRates,
  getAllUsers,
  getAllRechargeRequest,
} from "../firebase/firebase.utils";

export const getAllUsersRedux = () => async (dispatch) => {
  const allUsers = await getAllUsers();
  dispatch({
    type: "GET_ALL_USERS",
    payload: allUsers,
  });
};
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

// bookings
export const getAllBookingsRedux = () => async (dispatch) => {
  const bookingsArray = await getAllBookings();
  dispatch({ type: "GET_ALL_BOOKINGS", payload: bookingsArray });
};
export const updateBookingRedux = (bookingObj) => async (dispatch) => {
  const updatedBookingObj = await updateBooking(bookingObj);
  dispatch({ type: "UPDATE_BOOKING", payload: updatedBookingObj });
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

export const getAllOrdersOfSingleLotRedux = (lotObj) => async (dispatch) => {
  const ordersArray = await getAllOrdersOfSingleLot(lotObj);
  dispatch({ type: "GET_ALL_ORDERS", payload: ordersArray });
  return ordersArray;
};
export const deleteSingleOrderRedux = (orderObj) => async (dispatch) => {
  await deleteSingleOrder(orderObj);
  dispatch({ type: "DELETE_SINGLE_ORDER", payload: orderObj });
};
export const getSingleOrderRedux = (orderObj) => async (dispatch) => {
  const resultOrderObj = await getSingleOrder(orderObj);
  dispatch({ type: "GET_SINGLE_ORDER", payload: resultOrderObj });
};

export const uploadOrderRedux = (orderObj) => async (dispatch) => {
  const uploadedOrderObj = await uploadOrder(orderObj);
  dispatch({ type: "UPLOAD_ORDER", payload: uploadedOrderObj });
  return uploadedOrderObj;
};
export const updateOrderRedux = (orderObj) => async (dispatch) => {
  const updatedOrderObj = await updateOrder(orderObj);
  dispatch({ type: "UPDATE_ORDER", payload: updatedOrderObj });
  return updatedOrderObj;
};
export const updateOrderBeforeInvoiceRedux = (orderObj) => async (dispatch) => {
  const updatedOrderObj = await updateOrderBeforeInvoice(orderObj);
  dispatch({ type: "UPDATE_ORDER", payload: updatedOrderObj });
  return updatedOrderObj;
};
export const updateOrderAfterInvoiceRedux = (orderObj) => async (dispatch) => {
  const updatedOrderObj = await updateOrderAfterInvoice(orderObj);
  dispatch({ type: "UPDATE_ORDER", payload: updatedOrderObj });
  return updatedOrderObj;
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

// D2D Rates
export const getAllD2DRatesRedux = (freightType, country) => async (
  dispatch
) => {
  const allD2DRatesAirArray = await getAllD2DRates(freightType, country);
  dispatch({
    type: "GET_ALL_D2D_RATES",
    payload: allD2DRatesAirArray,
  });
};

export const uploadD2DRatesRedux = (
  freightType,
  country,
  productTypeObj
) => async (dispatch) => {
  const uploadedD2DRatesObj = await uploadD2DRates(
    freightType,
    country,
    productTypeObj
  );
  dispatch({
    type: "UPLOAD_D2D_RATES",
    payload: uploadedD2DRatesObj,
  });
};

export const updateD2DRatesRedux = (
  freightType,
  country,
  productTypeObj
) => async (dispatch) => {
  const updatedD2DRatesObj = await updateD2DRates(
    freightType,
    country,
    productTypeObj
  );
  dispatch({
    type: "UPDATE_D2D_RATES",
    payload: updatedD2DRatesObj,
  });
};
export const deleteD2DRatesRedux = (
  freightType,
  country,
  productTypeId
) => async (dispatch) => {
  await deleteD2DRates(freightType, country, productTypeId);
  dispatch({
    type: "DELETE_D2D_RATES",
    payload: { freightType, country, productTypeId },
  });
};

// Recharge
export const getAllRechargeRequestRedux = () => async (dispatch) => {
  const rechargeRequestArray = await getAllRechargeRequest();
  dispatch({ type: "GET_ALL_RECHARGE_REQUEST", payload: rechargeRequestArray });
};
