import {
  uploadLot,
  updateLot,
  getAllLots,
  uploadOrderD2D,
  getAllOrdersD2D,
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
