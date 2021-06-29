import {
  getAllBookings,
  getAllReceivedExpressBookings,
  updateBooking,
  getSingleBooking,
  uploadLot,
  updateLot,
  getAllLots,
  uploadOrder,
  updateOrder,
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
  getAllAdmins,
  getAllRechargeRequest,
  updateRechargeRequestStatus,
  rechargeUser,
  rechargeUserFromRechargeRequest,
  updateUserStatus,
  updateAdminStatus,
  getAllRechargeDays,
  getAllRechargesOfSingleDate,
  getAllPaymentDays,
  getAllPaymentsOfSingleDate,
  getAllRefundRequest,
  updateRefund,
  createNotice,
  createIntro,
  updateNotice,
  getAllNotices,
  getAllIntros,
  uploadImage,
  updateAdmin,
  getAllBookingsOfSingleUser,
  getAllParcelsOfSingleUser,
  getAllRechargeRequestsOfSingleUser,
  getAllRechargeOfSingleUser,
  getAllPaymentOfSingleUser,
} from "../firebase/firebase.utils";

export const getAllUsersRedux = () => async (dispatch) => {
  const allUsers = await getAllUsers();
  dispatch({
    type: "GET_ALL_USERS",
    payload: allUsers,
  });
};

export const getAllBookingsOfSingleUserRedux = (userId) => async (dispatch) => {
  const bookingsArray = await getAllBookingsOfSingleUser(userId);
  dispatch({ type: "GET_ALL_BOOKINGS_OF_SINGLE_USER", payload: bookingsArray });
};

export const getAllParcelsOfSingleUserRedux = (userId) => async (dispatch) => {
  const parcelsArray = await getAllParcelsOfSingleUser(userId);
  dispatch({ type: "GET_ALL_PARCELS_OF_SINGLE_USER", payload: parcelsArray });
};
export const getAllRechargeRequestsOfSingleUserRedux =
  (userId) => async (dispatch) => {
    const rechargeRequestArray = await getAllRechargeRequestsOfSingleUser(
      userId
    );
    dispatch({
      type: "GET_ALL_RECHARGE_REQUEST_OF_SINGLE_USER",
      payload: rechargeRequestArray,
    });
  };
export const getAllRechargeOfSingleUserRedux = (userId) => async (dispatch) => {
  const rechargeArray = await getAllRechargeOfSingleUser(userId);
  dispatch({
    type: "GET_ALL_RECHARGE_OF_SINGLE_USER",
    payload: rechargeArray,
  });
};
export const getAllPaymentOfSingleUserRedux = (userId) => async (dispatch) => {
  const paymentArray = await getAllPaymentOfSingleUser(userId);
  dispatch({
    type: "GET_ALL_PAYMENT_OF_SINGLE_USER",
    payload: paymentArray,
  });
};

export const getAllAdminsRedux = () => async (dispatch) => {
  const allAdmins = await getAllAdmins();
  dispatch({
    type: "SET_ALL_ADMINS",
    payload: allAdmins,
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
export const getAllBookingsRedux = (bookingStatus) => async (dispatch) => {
  const bookingsArray = await getAllBookings(bookingStatus);
  dispatch({ type: "GET_ALL_BOOKINGS", payload: bookingsArray });
};
export const getAllReceivedExpressBookingsRedux =
  (month) => async (dispatch) => {
    const bookingsArray = await getAllReceivedExpressBookings(month);
    dispatch({ type: "GET_ALL_EXPRESS_ORDERS", payload: bookingsArray });
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
  return uploadedlotObj;
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

export const getSingleOrderRedux = (parcelId) => async (dispatch) => {
  const resultOrderObj = await getSingleOrder(parcelId);
  dispatch({ type: "GET_SINGLE_ORDER", payload: resultOrderObj });
};
export const getSingleBookingRedux = (bookingId) => async (dispatch) => {
  const resultbookingObj = await getSingleBooking(bookingId);
  dispatch({ type: "GET_SINGLE_BOOKING", payload: resultbookingObj });
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
  const updatedOrderObj = await updateOrder(orderObj);
  dispatch({ type: "UPDATE_ORDER", payload: updatedOrderObj });
  return updatedOrderObj;
};
export const updateOrderAfterInvoiceRedux = (orderObj) => async (dispatch) => {
  const updatedOrderObj = await updateOrder(orderObj);
  dispatch({ type: "UPDATE_ORDER", payload: updatedOrderObj });
  return updatedOrderObj;
};

// Express
export const getAllExpressOrdersRedux = () => async (dispatch) => {
  const ordersArrayExpress = await getAllExpressOrders();
  dispatch({ type: "GET_ALL_EXPRESS_ORDERS", payload: ordersArrayExpress });
};

export const updateExpressOrderStatusRedux =
  (id, month) => async (dispatch) => {
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

export const uploadExpressRatesDocumentsRedux =
  (countryObj) => async (dispatch) => {
    const uploadedExpressRatesDocumentsObj = await uploadExpressRatesDocuments(
      countryObj
    );
    dispatch({
      type: "UPLOAD_EXPRESS_RATES_DOCUMENTS",
      payload: uploadedExpressRatesDocumentsObj,
    });
  };

export const updateExpressRatesDocumentsRedux =
  (countryObj) => async (dispatch) => {
    const updatedExpressRatesDocumentsObj = await updateExpressRatesDocuments(
      countryObj
    );
    dispatch({
      type: "UPDATE_EXPRESS_RATES_DOCUMENTS",
      payload: updatedExpressRatesDocumentsObj,
    });
  };
export const deleteExpressRatesDocumentsRedux =
  (countryId) => async (dispatch) => {
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

export const uploadExpressRatesParcelRedux =
  (countryObj) => async (dispatch) => {
    const uploadedExpressRatesParcelObj = await uploadExpressRatesParcel(
      countryObj
    );
    dispatch({
      type: "UPLOAD_EXPRESS_RATES_PARCEL",
      payload: uploadedExpressRatesParcelObj,
    });
  };

export const updateExpressRatesParcelRedux =
  (countryObj) => async (dispatch) => {
    const updatedExpressRatesParcelObj = await updateExpressRatesParcel(
      countryObj
    );
    dispatch({
      type: "UPDATE_EXPRESS_RATES_PARCEL",
      payload: updatedExpressRatesParcelObj,
    });
  };
export const deleteExpressRatesParcelRedux =
  (countryId) => async (dispatch) => {
    await deleteExpressRatesParcel(countryId);
    dispatch({
      type: "DELETE_EXPRESS_RATES_PARCEL",
      payload: countryId,
    });
  };

// D2D Rates
export const getAllD2DRatesRedux =
  (freightType, country) => async (dispatch) => {
    const allD2DRatesAirArray = await getAllD2DRates(freightType, country);
    dispatch({
      type: "GET_ALL_D2D_RATES",
      payload: allD2DRatesAirArray,
    });
  };

export const uploadD2DRatesRedux =
  (freightType, country, productTypeObj) => async (dispatch) => {
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

export const updateD2DRatesRedux =
  (freightType, country, productTypeObj) => async (dispatch) => {
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
export const deleteD2DRatesRedux =
  (freightType, country, productTypeId) => async (dispatch) => {
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

export const updateRechargeRequestStatusRedux =
  (rechargeRequestObj) => async (dispatch) => {
    const updatedRechargeRequestObj = await updateRechargeRequestStatus(
      rechargeRequestObj
    );
    dispatch({
      type: "UPDATE_RECHARGE_REQUEST_STATUS",
      payload: updatedRechargeRequestObj,
    });
  };

export const rechargeUserRedux = (rechargeObj) => async (dispatch) => {
  const rechargedUserObj = await rechargeUser(rechargeObj);
  dispatch({
    type: "RECHARGE_USER",
    payload: rechargedUserObj,
  });
};
export const rechargeUserFromRechargeRequestRedux =
  (rechargeObj) => async (dispatch) => {
    const updatedRechargeRequestObj = await rechargeUserFromRechargeRequest(
      rechargeObj
    );
    dispatch({
      type: "UPDATE_RECHARGE_REQUEST_STATUS",
      payload: updatedRechargeRequestObj,
    });
  };

export const updateUserStatusRedux = (userObj) => async (dispatch) => {
  const updatedUserObj = await updateUserStatus(userObj);
  dispatch({
    type: "UPDATE_USER_STATUS",
    payload: updatedUserObj,
  });
};
export const updateAdminStatusRedux = (adminObj) => async (dispatch) => {
  const updatedAdminObj = await updateAdminStatus(adminObj);
  dispatch({
    type: "UPDATE_ADMIN_STATUS",
    payload: updatedAdminObj,
  });
};

export const getAllRechargeDayRedux = () => async (dispatch) => {
  const rechargeDaysArray = await getAllRechargeDays();
  dispatch({ type: "GET_ALL_RECHARGE_DAY", payload: rechargeDaysArray });
};

export const getAllRechargesOfSingleDateRedux = (date) => async (dispatch) => {
  const rechargesArray = await getAllRechargesOfSingleDate(date);
  dispatch({
    type: "GET_ALL_RECHARGES_OF_SINGLE_DAY",
    payload: rechargesArray,
  });
  return rechargesArray;
};

// payments
export const getAllPaymentDayRedux = () => async (dispatch) => {
  const paymentDaysArray = await getAllPaymentDays();
  dispatch({ type: "GET_ALL_PAYMENT_DAY", payload: paymentDaysArray });
};

export const getAllPaymentsOfSingleDateRedux = (date) => async (dispatch) => {
  const paymentsArray = await getAllPaymentsOfSingleDate(date);
  dispatch({
    type: "GET_ALL_PAYMENTS_OF_SINGLE_DAY",
    payload: paymentsArray,
  });
  return paymentsArray;
};

// refund
export const getAllRefundRequestRedux = (refundStatus) => async (dispatch) => {
  const refundsArray = await getAllRefundRequest(refundStatus);
  dispatch({ type: "GET_ALL_REFUNDS", payload: refundsArray });
};

export const updateRefundRedux = (refundObj) => async (dispatch) => {
  const updatedRefundObj = await updateRefund(refundObj);
  dispatch({ type: "UPDATE_REFUND", payload: updatedRefundObj });
};

// notice
export const createNoticeRedux = (noticeObj) => async (dispatch) => {
  const createdNoticeObj = await createNotice(noticeObj);
  dispatch({ type: "CREATE_NOTICE", payload: createdNoticeObj });
};
export const createIntroRedux = (introObj) => async (dispatch) => {
  const createdIntroObj = await createIntro(introObj);
  dispatch({ type: "CREATE_INTRO", payload: createdIntroObj });
};

export const getAllNoticesRedux = () => async (dispatch) => {
  const noticesArray = await getAllNotices();
  dispatch({ type: "GET_ALL_NOTICES", payload: noticesArray });
};

export const getAllIntrosRedux = () => async (dispatch) => {
  const introsArray = await getAllIntros();
  dispatch({ type: "GET_ALL_INTROS", payload: introsArray });
};

export const updateNoticeRedux = (noticeObj) => async (dispatch) => {
  const updatedNoticeObj = await updateNotice(noticeObj);
  dispatch({ type: "UPDATE_NOTICE", payload: updatedNoticeObj });
};

export const uploadImageRedux = (currentAdmin, file) => async (dispatch) => {
  const updatedAdminObj = await uploadImage(currentAdmin, file);
  dispatch({
    type: "UPDATE_ADMIN",
    payload: updatedAdminObj,
  });
};

export const updateAdminRedux = (updatedAdmin) => async (dispatch) => {
  console.log(updatedAdmin);
  const updatedUserObj = await updateAdmin(updatedAdmin);
  dispatch({
    type: "UPDATE_ADMIN",
    payload: updatedUserObj,
  });
};
