import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXDRYV_c6zKlhnmZSYCu9i0eBhNDJfo94",
  authDomain: "alg-frontend.firebaseapp.com",
  projectId: "alg-frontend",
  storageBucket: "alg-frontend.appspot.com",
  messagingSenderId: "727083865163",
  appId: "1:727083865163:web:ac807ede63fd56689e29ce",
  measurementId: "G-J59TH8LBYT",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const createAdminProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const adminRef = firestore.doc(`admins/${userAuth.uid}`);

  const snapShot = await adminRef.get();
  if (!snapShot.exists) {
    const { name, email } = userAuth;
    const createdAt = new Date();
    try {
      await adminRef.set({
        name,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating admin", error.message);
    }
  }
  return adminRef;
};

export const uploadLot = async (lotObj) => {
  const lotRef = firestore.doc(`lots/${lotObj.lotNo}`);
  const snapShot = await lotRef.get();
  if (!snapShot.exists) {
    try {
      await lotRef.set({
        ...lotObj,
      });
      console.log(snapShot.data());
      const uploadedSnapShot = await lotRef.get();
      return uploadedSnapShot.data();
    } catch (error) {
      alert(error);
    }
  } else {
    alert(
      "there is already a lot with this given Lot no, please change the Lot no and try again"
    );
    return null;
  }
};
export const createNotice = async (noticeObj) => {
  const noticeRef = firestore.doc(`notices/${noticeObj.id}`);
  const snapShot = await noticeRef.get();
  if (!snapShot.exists) {
    try {
      await noticeRef.set({
        ...noticeObj,
      });

      const uploadedSnapShot = await noticeRef.get();
      return uploadedSnapShot.data();
    } catch (error) {
      alert(error);
    }
  } else {
    alert("there is already a Notice with similar Id, please try again later");
  }
};
export const createIntro = async (introObj) => {
  const introRef = firestore.doc(`intros/${introObj.id}`);
  const snapShot = await introRef.get();

  delete introObj.file;
  if (!snapShot.exists) {
    try {
      await introRef.set({
        ...introObj,
      });

      const uploadedSnapShot = await introRef.get();
      return uploadedSnapShot.data();
    } catch (error) {
      alert(error);
    }
  } else {
    alert(
      "there is already an Intro image with similar Id, please try again later"
    );
  }
};
export const uploadExpressRatesDocuments = async (countryObj) => {
  const countryRef = firestore.doc(
    `expressRatesDocuments/${countryObj.country}`
  );
  const snapShot = await countryRef.get();
  if (!snapShot.exists) {
    try {
      await countryRef.set({
        ...countryObj,
      });
      console.log(snapShot.data());
      const uploadedSnapShot = await countryRef.get();
      return uploadedSnapShot.data();
    } catch (error) {
      alert(error);
    }
  } else {
    alert(
      "there is already a country with similar name, please change the country name and try again"
    );
  }
};
export const uploadExpressRatesParcel = async (countryObj) => {
  const countryRef = firestore.doc(`expressRatesParcel/${countryObj.country}`);
  const snapShot = await countryRef.get();
  if (!snapShot.exists) {
    try {
      await countryRef.set({
        ...countryObj,
      });
      console.log(snapShot.data());
      const uploadedSnapShot = await countryRef.get();
      return uploadedSnapShot.data();
    } catch (error) {
      alert(error);
    }
  } else {
    alert(
      "there is already a country with similar name, please change the country name and try again"
    );
  }
};
export const uploadD2DRates = async (freightType, country, typeObj) => {
  const productTypeRef = firestore.doc(
    `d2d-rates-${freightType}-${country}/${typeObj.id}`
  );
  const snapShot = await productTypeRef.get();
  if (!snapShot.exists) {
    try {
      await productTypeRef.set({
        ...typeObj,
      });
      console.log(snapShot.data());
      const uploadedSnapShot = await productTypeRef.get();
      return uploadedSnapShot.data();
    } catch (error) {
      alert(error);
    }
  } else {
    alert(
      "there is already a product type with similar name, please change the product type name and try again"
    );
  }
};

export const uploadOrder = async (orderObj) => {
  const orderRef = firestore.doc(`orders/${orderObj.parcelId}`);
  const snapShot = await orderRef.get();
  if (!snapShot.exists) {
    try {
      await orderRef.set({
        ...orderObj,
      });
      const uploadedSnapShot = await orderRef.get();
      console.log(uploadedSnapShot.data());
      return uploadedSnapShot.data();
    } catch (error) {
      alert(error);
    }
  } else {
    alert(
      "there is already an order with similar parcel Id. please try again later."
    );
  }
};
export const changeLotOrder = async (orderObj, previousParcelId) => {
  const orderRef = firestore.doc(`orders/${orderObj.parcelId}`);
  const snapShot = await orderRef.get();
  if (!snapShot.exists) {
    try {
      await orderRef.set({
        ...orderObj,
      });
      const uploadedSnapShot = await orderRef.get();
      console.log(uploadedSnapShot.data());
      return uploadedSnapShot.data();
    } catch (error) {
      alert(error);
    }
  } else {
    alert(
      "there is already an order with similar parcel Id. please try again later."
    );
    return null;
  }
};

export const rechargeUser = async (rechargeObj) => {
  // first upload the recharge day in rechargeDays
  console.log(rechargeObj);
  try {
    const rechargeDayRef = firestore.doc(
      `rechargeDays/${rechargeObj.rechargedAt}`
    );
    const snapShot = await rechargeDayRef.get();
    if (!snapShot.exists) {
      try {
        await rechargeDayRef.set({
          date: rechargeObj.rechargedAt,
          day: rechargeObj.day,
          total: rechargeObj.amount,
        });
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        await rechargeDayRef.update({
          total: parseInt(snapShot.data().total) + parseInt(rechargeObj.amount),
        });
      } catch (error) {
        alert(error);
      }
    }

    // update rechargeRequest object to recharged or rejected
    const updatedRechargeRequestObj = await updateRechargeRequestStatus(
      rechargeObj
    );

    // upload full recharge object inside that day of recharge History
    const rechargeRef = firestore.doc(
      `rechargeHistory/${rechargeObj.rechargeId}`
    );
    const recharge = await rechargeRef.get();
    if (!recharge.exists) {
      try {
        await rechargeRef.set({
          ...rechargeObj,
        });
      } catch (error) {
        alert(error);
      }
    } else {
      alert("an error occurred. please try again later");
    }

    // update user object with recharge balance
    const userRef = firestore.doc(`users/${rechargeObj.uid}`);

    try {
      const userSnapShot = await userRef.get();
      console.log(userSnapShot.data());
      await userRef.update({
        myWallet:
          parseInt(userSnapShot.data().myWallet) + parseInt(rechargeObj.amount),

        totalRecharge: userSnapShot.data().totalRecharge
          ? parseInt(userSnapShot.data().totalRecharge) +
            parseInt(rechargeObj.amount)
          : parseInt(rechargeObj.amount),
      });
      const rechargedUserSnapShot = await userRef.get();
      return rechargedUserSnapShot.data();
    } catch (error) {
      alert(error);
    }
  } catch (error) {
    alert(error);
  }
};
export const rechargeUserFromRechargeRequest = async (rechargeObj) => {
  // first upload the recharge day in rechargeDays
  console.log(rechargeObj);
  try {
    const rechargeDayRef = firestore.doc(
      `rechargeDays/${rechargeObj.rechargedAt}`
    );
    const snapShot = await rechargeDayRef.get();
    if (!snapShot.exists) {
      try {
        await rechargeDayRef.set({
          date: rechargeObj.rechargedAt,
          day: rechargeObj.day,
          total: rechargeObj.amount,
        });
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        await rechargeDayRef.update({
          total: parseInt(snapShot.data().total) + parseInt(rechargeObj.amount),
        });
      } catch (error) {
        alert(error);
      }
    }

    // update rechargeRequest object to recharged or rejected
    const updatedRechargeRequestObj = await updateRechargeRequestStatus(
      rechargeObj
    );

    // upload full recharge object inside that day of recharge History
    const rechargeRef = firestore.doc(
      `rechargeHistory/${rechargeObj.rechargeId}`
    );
    const recharge = await rechargeRef.get();
    if (!recharge.exists) {
      try {
        await rechargeRef.set({
          ...rechargeObj,
        });
      } catch (error) {
        alert(error);
      }
    } else {
      alert("an error occurred. please try again later");
    }

    // update user object with recharged balance
    const userRef = firestore.doc(`users/${rechargeObj.uid}`);

    try {
      const userSnapShot = await userRef.get();
      console.log(userSnapShot.data());
      await userRef.update({
        myWallet:
          parseInt(userSnapShot.data().myWallet) + parseInt(rechargeObj.amount),

        totalRecharge: userSnapShot.data().totalRecharge
          ? parseInt(userSnapShot.data().totalRecharge) +
            parseInt(rechargeObj.amount)
          : parseInt(rechargeObj.amount),
      });
      return updatedRechargeRequestObj;
    } catch (error) {
      alert(error);
    }
  } catch (error) {
    alert(error);
  }
};

export const updateOrder = async (orderObj) => {
  const orderRef = firestore.doc(`orders/${orderObj.parcelId}`);
  try {
    if (!orderObj.from) {
      orderObj.editApproved = true;
    }
    await orderRef.update({
      ...orderObj,
    });
    const updatedSnapShot = await orderRef.get();

    return updatedSnapShot.data();
  } catch (error) {
    alert(error);
  }
};

export const uploadImageQcCheck = async (file) => {
  const imageRef = storage.ref(`qcCheck/${file.name}`);
  try {
    await imageRef.put(file);
    var imgUrl = [];
    await imageRef.getDownloadURL().then((url) => {
      console.log(url);
      imgUrl.push(url);
    });

    return imgUrl[0];
  } catch (error) {
    return null;
  }
};
export const uploadImageIntro = async (file) => {
  const imageRef = storage.ref(`intro/${file.name}`);
  try {
    await imageRef.put(file);
    var imgUrl = [];
    await imageRef.getDownloadURL().then((url) => {
      console.log(url);
      imgUrl.push(url);
    });

    return imgUrl[0];
  } catch (error) {
    return null;
  }
};

export const updateUserStatus = async (userObj) => {
  const userRef = firestore.doc(`users/${userObj.uid}`);
  try {
    const snapShot = await userRef.get();
    console.log(snapShot.data());
    await userRef.update({
      status: userObj.status,
    });
    const updatedSnapShot = await userRef.get();
    return updatedSnapShot.data();
  } catch (error) {
    alert(error);
  }
};
export const updateAdminStatus = async (adminObj) => {
  const adminRef = firestore.doc(`admins/${adminObj.adminId}`);
  try {
    const snapShot = await adminRef.get();
    console.log(snapShot.data());
    await adminRef.update({
      status: adminObj.status,
    });
    const updatedSnapShot = await adminRef.get();
    return updatedSnapShot.data();
  } catch (error) {
    alert(error);
  }
};

export const uploadProductTax = async (productObj) => {
  const productRef = firestore.doc(`taxes/${productObj.id}`);
  const snapShot = await productRef.get();
  const newProductObj = { ...productObj };
  if (!snapShot.exists) {
    try {
      productRef.set({
        ...newProductObj,
      });
    } catch (error) {
      alert(error);
    }
  } else {
    alert(
      "there is already a product with this given prodcut Id, please change the product Id and upload again"
    );
  }
};

export const getAllProducts = async () => {
  const productsCollectionRef = firestore.collection("products");
  try {
    const products = await productsCollectionRef.get();
    const productsArray = [];
    products.forEach((doc) => {
      productsArray.push(doc.data());
    });
    return productsArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllLots = async () => {
  const lotsCollectionRef = firestore.collection("lots");
  try {
    const lots = await lotsCollectionRef.orderBy("shipmentDate", "desc").get();
    const lotsArray = [];
    lots.forEach((doc) => {
      lotsArray.push(doc.data());
    });
    return lotsArray;
  } catch (error) {
    alert(error);
  }
};

export const uploadImage = async (currentAdmin, file) => {
  const imageRef = storage.ref(`users/${file.name}`);
  try {
    await imageRef.put(file);
    var imgUrl = [];
    await imageRef.getDownloadURL().then((url) => {
      console.log(url);
      imgUrl.push(url);
    });
    const adminRef = firestore.doc(`admins/${currentAdmin.adminId}`);
    const snapShot = await adminRef.get();
    console.log(snapShot.data());
    try {
      adminRef.update({
        imageUrl: imgUrl[0],
      });
    } catch (error) {
      alert(error);
    }
    const updatedSnapShot = await adminRef.get();
    return updatedSnapShot.data();
  } catch (error) {
    return null;
  }
};

export const updateAdmin = async (currentAdmin) => {
  const adminRef = firestore.doc(`admins/${currentAdmin.adminId}`);
  const snapShot = await adminRef.get();
  console.log(snapShot.data());
  try {
    adminRef.update({
      ...currentAdmin,
    });
  } catch (error) {
    alert(error);
  }
  const updatedSnapShot = await adminRef.get();
  return updatedSnapShot.data();
};

export const getAllNotices = async () => {
  const noticesCollectionRef = firestore.collection("notices");
  try {
    const notices = await noticesCollectionRef.get();
    const noticesArray = [];
    notices.forEach((doc) => {
      noticesArray.push(doc.data());
    });
    return noticesArray;
  } catch (error) {
    alert(error);
  }
};
export const getAllIntros = async () => {
  const introsCollectionRef = firestore.collection("intros");
  try {
    const intros = await introsCollectionRef.get();
    const introsArray = [];
    intros.forEach((doc) => {
      introsArray.push(doc.data());
    });
    return introsArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllRechargeDays = async () => {
  const rechargeDaysCollectionRef = firestore.collection("rechargeDays");

  try {
    const rechargeDays = await rechargeDaysCollectionRef
      .orderBy("date", "desc")
      .get();
    const rechargeDaysArray = [];
    rechargeDays.forEach((doc) => {
      rechargeDaysArray.push(doc.data());
    });
    return rechargeDaysArray;
  } catch (error) {
    alert(error);
    return [];
  }
};
export const getAllPaymentDays = async () => {
  const paymentDaysCollectionRef = firestore
    .collection("paymentDays")
    .orderBy("date", "desc");
  try {
    const paymentDays = await paymentDaysCollectionRef.get();
    const paymentDaysArray = [];
    paymentDays.forEach((doc) => {
      paymentDaysArray.push(doc.data());
    });
    return paymentDaysArray;
  } catch (error) {
    alert(error);
    return [];
  }
};

export const makeBookingReceived = async (bookingObj) => {
  console.log(bookingObj);

  const bookingMonthRef = firestore.doc(`bookingMonths/${bookingObj.month}`);
  const bookingMonth = await bookingMonthRef.get();

  if (!bookingMonth.exists) {
    bookingMonthRef.set({
      totalOrder: 1,
      deliveredOrder: 0,
      pendingOrder: 1,
      month: bookingObj.month,
    });
  } else {
    bookingMonthRef.update({
      totalOrder: bookingMonth.data().totalOrder + 1,
      pendingOrder: bookingMonth.data().pendingOrder + 1,
    });
  }
};

export const getAllRechargeRequest = async () => {
  const rechargeRequestCollectionRef = firestore
    .collection("rechargeRequest")
    .where("status", "==", "pending");

  try {
    const rechargeRequest = await rechargeRequestCollectionRef.get();
    const rechargeRequestArray = [];
    rechargeRequest.forEach((doc) => {
      rechargeRequestArray.push(doc.data());
    });
    console.log(rechargeRequestArray);
    return rechargeRequestArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllBookings = async (bookingStatus) => {
  console.log(bookingStatus);
  const bookingsCollectionRef = firestore
    .collection("bookingRequest")
    .where("bookingStatus", "==", bookingStatus);

  try {
    const bookings = await bookingsCollectionRef.get();
    const bookingsArray = [];
    bookings.forEach((doc) => {
      bookingsArray.push(doc.data());
    });
    return bookingsArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllReceivedExpressBookings = async (month) => {
  const bookingsCollectionRef = firestore
    .collection("bookingRequest")
    .where("bookingStatus", "==", "Received")
    .where("month", "==", month);

  try {
    const bookings = await bookingsCollectionRef.get();
    const bookingsArray = [];
    bookings.forEach((doc) => {
      bookingsArray.push(doc.data());
    });
    return bookingsArray;
  } catch (error) {
    alert(error);
  }
};
export const getAllRefundRequest = async (refundStatus) => {
  const refundsCollectionRef = firestore
    .collection("refundRequest")
    .where("refundStatus", "==", refundStatus);
  try {
    const refunds = await refundsCollectionRef.get();
    const refundsArray = [];
    refunds.forEach((doc) => {
      refundsArray.push(doc.data());
    });
    return refundsArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllDocumentExpressRates = async () => {
  const expressRatesDocumentsCollectionRef = firestore.collection(
    "expressRatesDocuments"
  );
  try {
    const expressRatesDocuments =
      await expressRatesDocumentsCollectionRef.get();
    const expressRatesDocumentsArray = [];
    expressRatesDocuments.forEach((doc) => {
      expressRatesDocumentsArray.push(doc.data());
    });
    return expressRatesDocumentsArray;
  } catch (error) {
    alert(error);
  }
};
export const getAllExpressRatesParcel = async () => {
  const expressRatesParcelCollectionRef =
    firestore.collection("expressRatesParcel");
  try {
    const expressRatesParcel = await expressRatesParcelCollectionRef.get();
    const expressRatesParcelArray = [];
    expressRatesParcel.forEach((doc) => {
      expressRatesParcelArray.push(doc.data());
    });
    return expressRatesParcelArray;
  } catch (error) {
    alert(error);
  }
};
export const getAllD2DRates = async (freightType, country) => {
  const d2dRatesCollectionRef = firestore.collection(
    `d2d-rates-${freightType}-${country}`
  );
  try {
    const d2dRates = await d2dRatesCollectionRef.get();
    const d2dRatesArray = [];
    d2dRates.forEach((doc) => {
      d2dRatesArray.push(doc.data());
    });
    return d2dRatesArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllExpressOrders = async () => {
  const expressOrdersCollectionRef = firestore.collection("bookingMonths");
  try {
    const ordersExpress = await expressOrdersCollectionRef.get();
    const ordersExpressArray = [];
    ordersExpress.forEach((doc) => {
      ordersExpressArray.push(doc.data());
    });
    return ordersExpressArray;
  } catch (error) {
    alert(error);
  }
};
export const updateExpressOrder = async (orderId) => {
  const expressOrdersCollectionRef = firestore.collection("ordersExpress");
  try {
    const ordersExpress = await expressOrdersCollectionRef.get();
    const ordersExpressArray = [];
    ordersExpress.forEach((doc) => {
      if (doc.data().id === orderId) {
      }
    });
    return ordersExpressArray;
  } catch (error) {
    alert(error);
  }
};

export const updateRechargeRequestStatus = async (rechargeRequestObj) => {
  console.log(rechargeRequestObj);
  const rechargeRequestRef = firestore.doc(
    `rechargeRequest/${rechargeRequestObj.rechargeId}`
  );
  const snapshot = await rechargeRequestRef.get();
  if (snapshot.exists) {
    try {
      await rechargeRequestRef.update({
        status: rechargeRequestObj.status,
      });
      const updatedRechargeRequestObj = await rechargeRequestRef.get();
      return updatedRechargeRequestObj.data();
    } catch (error) {
      alert(error);
    }
  } else {
    return null;
  }
};

export const getAllOrdersOfSingleLot = async (lotObj) => {
  const ordersCollectionRef = firestore
    .collection(`orders`)
    .where("lotNo", "==", lotObj.lotNo);
  try {
    const collection = await ordersCollectionRef.get();
    let ordersArray = [];
    collection.forEach((doc) => {
      ordersArray.push(doc.data());
    });
    return ordersArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllRechargesOfSingleDate = async (date) => {
  const rechargesCollectionRef = firestore
    .collection(`rechargeHistory`)
    .where("rechargedAt", "==", date);
  try {
    const recharges = await rechargesCollectionRef.get();
    let rechargesArray = [];
    recharges.forEach((doc) => rechargesArray.push(doc.data()));
    return rechargesArray;
  } catch (error) {
    alert(error);
    return [];
  }
};

export const getAllPaymentsOfSingleDate = async (date) => {
  const paymentsCollectionRef = firestore
    .collection(`paymentHistory`)
    .where("paidAt", "==", date);
  try {
    let paymentsArray = [];
    const payments = await paymentsCollectionRef.get();
    payments.forEach((payment) => {
      paymentsArray.push(payment.data());
    });
    return paymentsArray;
  } catch (error) {
    alert(error);
    return [];
  }
};

export const getAllOrdersInvoiceRateSingleLot = async (lotObj) => {
  let ordersDocumentRef;
  if (lotObj.shipmentMethod.includes("D2D")) {
    ordersDocumentRef = firestore.doc(`ordersD2D/${lotObj.lotNo}`);
  }
  if (lotObj.shipmentMethod.includes("Freight")) {
    ordersDocumentRef = firestore.doc(`ordersFreight/${lotObj.lotNo}`);
  }

  try {
    const snapShot = await ordersDocumentRef.get();
    console.log(snapShot.data());
    const ordersArray = snapShot.data().orders;
    let totalRevenue = 0;
    if (ordersArray.length > 0) {
      const invoicedOrdersArray = ordersArray.filter(
        (order) => order.invoiceTotal
      );
      invoicedOrdersArray.forEach(
        (order) => (totalRevenue += order.invoiceTotal)
      );
    }
    return totalRevenue;
  } catch (error) {
    alert(error);
    return 0;
  }
};

export const getAllProductsTax = async () => {
  const productsCollectionRef = firestore.collection("taxes");
  try {
    const products = await productsCollectionRef.get();
    const productsArray = [];
    products.forEach((doc) => {
      productsArray.push(doc.data());
    });
    return productsArray;
  } catch (error) {
    alert(error);
  }
};

export const updateProduct = async (productObj, discount) => {
  const productRef = firestore.doc(`products/${productObj.id}`);
  const product = await productRef.get();
  if (!product.exists) {
    const aliProductRef = firestore.doc(`aliproducts/${productObj.id}`);
    try {
      const aliProductSnapShot = await aliProductRef.get();
      await aliProductRef.update({
        ...aliProductSnapShot.data(),
        ...productObj,
        discount,
      });
    } catch (error) {
      alert(error);
    }
  } else {
    try {
      delete productObj.file;
      await productRef.update({ ...productObj, discount });
    } catch (error) {
      alert(error);
    }
  }
};
export const deleteProduct = async (id) => {
  const productRef = firestore.doc(`products/${id}`);
  try {
    await productRef.delete();
  } catch (error) {
    alert(error);
  }
};
export const deleteLot = async (id) => {
  const lotRef = firestore.doc(`lots/${id}`);
  try {
    await lotRef.delete();
  } catch (error) {
    alert(error);
  }
};
export const deleteNotice = async (id) => {
  const noticeRef = firestore.doc(`notices/${id}`);
  try {
    await noticeRef.delete();
  } catch (error) {
    alert(error);
  }
};
export const deleteIntro = async (id) => {
  const introRef = firestore.doc(`intros/${id}`);
  try {
    await introRef.delete();
  } catch (error) {
    alert(error);
  }
};
export const selectIntro = async (id) => {
  const introRef = firestore.doc(`intros/${id}`);
  const introCollectionRef = firestore
    .collection("intros")
    .where("selected", "==", true);
  const introCollection = await introCollectionRef.get();
  introCollection.forEach(async (intro) => {
    const previousIntroRef = firestore.doc(`intros/${intro.data().id}`);
    try {
      await previousIntroRef.update({
        selected: false,
      });
    } catch (error) {
      alert(error);
    }
  });
  try {
    await introRef.update({
      selected: true,
    });
  } catch (error) {
    alert(error);
  }
};

export const getAllBookingsOfSingleUser = async (userId) => {
  const bookingsCollectionRef = firestore
    .collection("bookingRequest")
    .where("userId", "==", userId);
  try {
    const bookings = await bookingsCollectionRef.get();
    const bookingsArray = [];
    bookings.forEach((doc) => {
      bookingsArray.push(doc.data());
    });
    return bookingsArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllParcelsOfSingleUser = async (userId) => {
  const ordersCollectionRef = firestore
    .collection("orders")
    .where("customerUid", "==", userId);
  try {
    const orders = await ordersCollectionRef.get();
    const ordersArray = [];
    orders.forEach((doc) => {
      ordersArray.push(doc.data());
    });
    return ordersArray;
  } catch (error) {
    alert(error);
  }
};
export const getAllRechargeRequestsOfSingleUser = async (userId) => {
  const rechargeRequestsCollectionRef = firestore
    .collection("rechargeRequest")
    .where("userId", "==", userId);
  try {
    const rechargeRequests = await rechargeRequestsCollectionRef.get();
    const rechargeRequestssArray = [];
    rechargeRequests.forEach((doc) => {
      rechargeRequestssArray.push(doc.data());
    });
    return rechargeRequestssArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllRechargeOfSingleUser = async (userId) => {
  const rechargeCollectionRef = firestore
    .collection("rechargeHistory")
    .where("uid", "==", userId);
  try {
    const recharges = await rechargeCollectionRef.get();
    const rechargesArray = [];
    recharges.forEach((doc) => {
      rechargesArray.push(doc.data());
    });
    return rechargesArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllPaymentOfSingleUser = async (userId) => {
  const paymentCollectionRef = firestore
    .collection("paymentHistory")
    .where("uid", "==", userId);
  try {
    const payments = await paymentCollectionRef.get();
    const paymentsArray = [];
    payments.forEach((doc) => {
      paymentsArray.push(doc.data());
    });
    return paymentsArray;
  } catch (error) {
    alert(error);
  }
};

export const deleteExpressRatesDocuments = async (id) => {
  const countryRef = firestore.doc(`expressRatesDocuments/${id}`);
  const snapShot = await countryRef.get();
  console.log(snapShot.data());
  try {
    await countryRef.delete();
  } catch (error) {
    alert(error);
  }
};
export const deleteExpressRatesParcel = async (id) => {
  const countryRef = firestore.doc(`expressRatesParcel/${id}`);
  const snapShot = await countryRef.get();
  console.log(snapShot.data());
  try {
    await countryRef.delete();
  } catch (error) {
    alert(error);
  }
};
export const deleteD2DRates = async (freightType, country, id) => {
  const productTypeRef = firestore.doc(
    `d2d-rates-${freightType}-${country}/${id}`
  );
  const snapShot = await productTypeRef.get();
  console.log(snapShot.data());
  try {
    await productTypeRef.delete();
  } catch (error) {
    alert(error);
  }
};

export const deleteProductTax = async (id) => {
  const productRef = firestore.doc(`taxes/${id}`);
  try {
    await productRef.delete();
  } catch (error) {
    alert(error);
  }
};

export const updateProductTax = async (productObj) => {
  const productRef = firestore.doc(`taxes/${productObj.id}`);
  try {
    await productRef.update({ ...productObj });
  } catch (error) {
    alert(error);
  }
};

export const updateLot = async (lotObj) => {
  const lotRef = firestore.doc(`lots/${lotObj.lotNo}`);
  try {
    await lotRef.update({ ...lotObj });
    const snapShot = await lotRef.get();
    return snapShot.data();
  } catch (error) {
    alert(error);
  }
};
export const updateNotice = async (noticeObj) => {
  const noticeRef = firestore.doc(`notices/${noticeObj.id}`);
  try {
    await noticeRef.update({ ...noticeObj });
    const snapShot = await noticeRef.get();
    return snapShot.data();
  } catch (error) {
    alert(error);
  }
};
export const updateBooking = async (bookingObj) => {
  const bookingRef = firestore.doc(`bookingRequest/${bookingObj.bookingId}`);
  try {
    await bookingRef.update({
      bookingStatus: bookingObj.bookingStatus,
      ...bookingObj,
    });
    const snapShot = await bookingRef.get();
    return snapShot.data();
  } catch (error) {
    alert(error);
  }
};
export const updateRefund = async (refundObj) => {
  try {
    // update refundStatus in main ordersArray
    const orderRef = firestore.doc(`orders/${refundObj.parcelId}`);
    const order = await orderRef.get();

    await orderRef.update({
      ...refundObj,
    });
    // create a recharge object

    // update refundStatus in users parcelArray
    // also input it in rechargeArray and transaction array of user
    // input it in rechargeHistory and rechargeDays of admin
    const userRef = firestore.doc(`users/${refundObj.customerUid}`);
    const userSnapShot = await userRef.get();
    await userRef.update({
      myWallet:
        parseInt(userSnapShot.data().myWallet) +
        parseInt(refundObj.refundAmount),
    });

    // update refund object status in refund request
    const refundRef = firestore.doc(`refundRequest/${refundObj.refundId}`);
    await refundRef.update({
      refundStatus: refundObj.refundStatus,
      refundAmount: refundObj.refundAmount,
    });
    const snapShot = await refundRef.get();
    return snapShot.data();
  } catch (error) {
    alert(error);
  }
};

export const updateExpressRatesDocuments = async (countryObj) => {
  const countryRef = firestore.doc(
    `expressRatesDocuments/${countryObj.country}`
  );
  try {
    await countryRef.update({ ...countryObj });
    const snapShot = await countryRef.get();
    return snapShot.data();
  } catch (error) {
    alert(error);
  }
};
export const updateExpressRatesParcel = async (countryObj) => {
  const countryRef = firestore.doc(`expressRatesParcel/${countryObj.country}`);
  try {
    await countryRef.update({ ...countryObj });
    const snapShot = await countryRef.get();
    return snapShot.data();
  } catch (error) {
    alert(error);
  }
};
export const updateD2DRates = async (freightType, country, productTypeObj) => {
  const productTypeRef = firestore.doc(
    `d2d-rates-${freightType}-${country}/${productTypeObj.id}`
  );
  try {
    await productTypeRef.update({ ...productTypeObj });
    const snapShot = await productTypeRef.get();
    return snapShot.data();
  } catch (error) {
    alert(error);
  }
};

export const getSingleProductTax = async (id) => {
  const productRef = firestore.doc(`taxes/${id}`);
  try {
    const product = await productRef.get();
    return product.data();
  } catch (error) {
    alert(error);
  }
};
export const getSingleLot = async (id) => {
  const lotRef = firestore.doc(`lots/${id}`);
  try {
    const lot = await lotRef.get();
    return lot.data();
  } catch (error) {
    alert(error);
  }
};

// get all users
export const getAllUsers = async () => {
  const usersCollectionRef = firestore.collection("users");
  try {
    const users = await usersCollectionRef.get();
    const usersArray = [];
    users.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      usersArray.push({ uid: doc.id, ...doc.data() });
    });
    return usersArray;
  } catch (error) {
    alert(error);
  }
};

export const deleteUser = async (id) => {
  const productRef = firestore.doc(`users/${id}`);
  try {
    await productRef.delete();
  } catch (error) {
    alert(error);
  }
};

// Orders management (get all orders)

export const getAllOrders = async () => {
  const ordersCollectionRef = firestore.collection("orders");
  try {
    const orders = await ordersCollectionRef.get();
    const ordersArray = [];
    orders.forEach((doc) => {
      ordersArray.push({ orderId: doc.id, ...doc.data() });
    });
    return ordersArray;
  } catch (error) {
    alert(error);
  }
};

export const deleteOrder = async (id) => {
  const orderRef = firestore.doc(`orders/${id}`);
  try {
    await orderRef.delete();
  } catch (error) {
    alert(error);
  }
};

export const deleteSingleOrder = async (orderObj) => {
  const orderRef = firestore.doc(`orders/${orderObj.parcelId}`);
  try {
    await orderRef.delete();
  } catch (error) {
    alert(error);
  }
};

export const getSingleOrder = async (parcelId) => {
  const orderRef = firestore.doc(`orders/${parcelId}`);
  try {
    const snapShot = await orderRef.get();
    return snapShot.data();
  } catch (error) {
    return null;
  }
};
export const getSingleBooking = async (bookingId) => {
  const bookingRef = firestore.doc(`bookingRequest/${bookingId}`);
  try {
    const snapShot = await bookingRef.get();
    return snapShot.data();
  } catch (error) {
    return null;
  }
};

// paymet management
export const getAllPayments = async () => {
  const paymentsCollectionRef = firestore.collection("payments");
  try {
    const payments = await paymentsCollectionRef.get();
    const paymentsArray = [];
    payments.forEach((doc) => {
      paymentsArray.push({ uid: doc.id, ...doc.data() });
    });
    return paymentsArray;
  } catch (error) {
    alert(error);
  }
};

export const deletePayment = async (orderId) => {
  const paymentRef = firestore.doc(`payments/${orderId}`);
  try {
    await paymentRef.delete();
  } catch (error) {
    alert(error);
  }
};

// admins
export const getAllAdmins = async () => {
  const adminsCollectionRef = firestore.collection("admins");
  try {
    const admins = await adminsCollectionRef.get();
    const adminsArray = [];
    admins.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      adminsArray.push({ adminId: doc.id, ...doc.data() });
    });
    return adminsArray;
  } catch (error) {
    alert(error);
  }
};

export const updateProfileImage = async (imgUrl, id) => {
  const adminRef = firestore.doc(`admins/${id}`);
  try {
    const admin = await adminRef.get();
    await adminRef.update({ ...admin.data(), image: imgUrl });
  } catch (error) {
    alert(error);
  }
};
