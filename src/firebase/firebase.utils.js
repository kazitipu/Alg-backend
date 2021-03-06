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

export const uploadImage = async (file) => {
  const imageRef = storage.ref(`products/${file.name}`);

  await imageRef.put(file);
  var imgUrl = [];
  await imageRef.getDownloadURL().then((url) => {
    console.log(url);
    imgUrl.push(url);
  });
  // var uploadTask = imageRef.put(file)
  // uploadTask.on('state_changed',
  // (snapShot)=>{
  //   var progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
  //   // alert(`upload is ${progress}% done`)
  // },
  // (error)=>{
  //   alert(error)
  // },
  // ()=>{
  //   // alert('successfully uploaded the file')
  //   imageRef.getDownloadURL().then((url)=>{
  //     imgUrl.push(url)
  //     console.log(imgUrl[0])
  //   }).catch((error)=>alert(error))
  // })

  return imgUrl[0];
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
  const lotOrdersRef = firestore.doc(
    `orders${orderObj.shipmentMethod}/${orderObj.lotNo}`
  );
  const snapShot = await lotOrdersRef.get();
  if (!snapShot.exists) {
    try {
      await lotOrdersRef.set({
        lotNo: orderObj.lotNo,
        orders: [orderObj],
      });
      const uploadedSnapShot = await lotOrdersRef.get();
      console.log(uploadedSnapShot.data());
      updateToMyParcelOfUser(orderObj);
      return uploadedSnapShot.data();
    } catch (error) {
      alert(error);
    }
  } else {
    try {
      if (
        snapShot
          .data()
          .orders.find((order) => order.cartonNo == orderObj.cartonNo)
      ) {
        alert(
          "this carton no already exist in this lot. please change the carton no and try again."
        );
      } else {
        await lotOrdersRef.update({
          lotNo: orderObj.lotNo,
          orders: [...snapShot.data().orders, orderObj],
        });
        const updatedSnapShot = await lotOrdersRef.get();
        updateToMyParcelOfUser(orderObj);
        return updatedSnapShot.data();
      }
    } catch (error) {
      alert(error);
    }
  }
};
export const updateOrder = async (orderObj) => {
  const lotOrdersRef = firestore.doc(
    `orders${orderObj.shipmentMethod}/${orderObj.lotNo}`
  );

  try {
    const snapShot = await lotOrdersRef.get();
    const parcelObj = snapShot
      .data()
      .orders.find((parcel) => parcel.parcelId == orderObj.parcelId);
    parcelObj.editApproved = true;
    const filteredParcelArray = snapShot
      .data()
      .orders.filter((parcel) => parcel.parcelId !== orderObj.parcelId);
    await lotOrdersRef.update({
      lotNo: orderObj.lotNo,
      orders: [...filteredParcelArray, parcelObj],
    });
    const updatedSnapShot = await lotOrdersRef.get();
    updateToMyParcelOfUserEditApproved(orderObj);
    return updatedSnapShot.data();
  } catch (error) {
    alert(error);
  }
};
export const updateOrderBeforeInvoice = async (orderObj) => {
  const lotOrdersRef = firestore.doc(
    `orders${orderObj.shipmentMethod}/${orderObj.lotNo}`
  );

  try {
    const snapShot = await lotOrdersRef.get();
    const filteredParcelArray = snapShot
      .data()
      .orders.filter((parcel) => parcel.parcelId !== orderObj.parcelId);
    await lotOrdersRef.update({
      lotNo: orderObj.lotNo,
      orders: [...filteredParcelArray, orderObj],
    });
    const updatedSnapShot = await lotOrdersRef.get();
    updateToMyParcelOfUserBeforeInvoice(orderObj);
    return updatedSnapShot.data();
  } catch (error) {
    alert(error);
  }
};
export const updateOrderAfterInvoice = async (orderObj) => {
  const lotOrdersRef = firestore.doc(
    `orders${orderObj.shipmentMethod}/${orderObj.lotNo}`
  );

  try {
    const snapShot = await lotOrdersRef.get();
    console.log(snapShot.data());
    const filteredParcelArray = snapShot
      .data()
      .orders.filter((parcel) => parcel.parcelId !== orderObj.parcelId);
    await lotOrdersRef.update({
      lotNo: orderObj.lotNo,
      orders: [...filteredParcelArray, orderObj],
    });
    const updatedSnapShot = await lotOrdersRef.get();
    updateToMyParcelOfUserAfterInvoice(orderObj);
    return updatedSnapShot.data();
  } catch (error) {
    alert(error);
  }
};

export const updateToMyParcelOfUser = async (orderObj) => {
  console.log("update to my parcel of user is called");
  console.log(orderObj.customerUid);
  const userRef = firestore.doc(`users/${orderObj.customerUid}`);
  try {
    const snapShot = await userRef.get();
    console.log(snapShot.data());
    userRef.update({
      parcelArray: [...snapShot.data().parcelArray, orderObj],
    });
  } catch (error) {
    alert(error);
  }
};
export const updateToMyParcelOfUserEditApproved = async (orderObj) => {
  const userRef = firestore.doc(`users/${orderObj.customerUid}`);
  try {
    const snapShot = await userRef.get();
    console.log(snapShot.data());
    const parcelObj = snapShot
      .data()
      .find((parcel) => parcel.parcelId == orderObj.parcelId);
    parcelObj.editApproved = true;
    const filteredArray = snapShot
      .data()
      .parcelArray.filter((parcel) => parcel.parcelId !== orderObj.parcelId);
    userRef.update({
      parcelArray: [...filteredArray, parcelObj],
    });
  } catch (error) {
    alert(error);
  }
};
export const updateToMyParcelOfUserBeforeInvoice = async (orderObj) => {
  const userRef = firestore.doc(`users/${orderObj.customerUid}`);
  try {
    const snapShot = await userRef.get();
    console.log(snapShot.data());
    const filteredArray = snapShot
      .data()
      .parcelArray.filter((parcel) => parcel.parcelId !== orderObj.parcelId);
    userRef.update({
      parcelArray: [...filteredArray, orderObj],
    });
  } catch (error) {
    alert(error);
  }
};
export const updateToMyParcelOfUserAfterInvoice = async (orderObj) => {
  const userRef = firestore.doc(`users/${orderObj.customerUid}`);
  console.log("updateToMyParcelOfUserAfterInvoice is getting called");
  try {
    const snapShot = await userRef.get();
    console.log(snapShot.data());
    const filteredArray = snapShot
      .data()
      .parcelArray.filter((parcel) => parcel.parcelId !== orderObj.parcelId);
    userRef.update({
      parcelArray: [...filteredArray, orderObj],
    });
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
export const uploadAliProduct = async (productObj) => {
  const productRef = firestore.doc(`aliproducts/${productObj.productId}`);
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
      "this product is already added to your website. try adding different product"
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
    const lots = await lotsCollectionRef.get();
    const lotsArray = [];
    lots.forEach((doc) => {
      lotsArray.push(doc.data());
    });
    return lotsArray;
  } catch (error) {
    alert(error);
  }
};
export const getAllDocumentExpressRates = async () => {
  const expressRatesDocumentsCollectionRef = firestore.collection(
    "expressRatesDocuments"
  );
  try {
    const expressRatesDocuments = await expressRatesDocumentsCollectionRef.get();
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
  const expressRatesParcelCollectionRef = firestore.collection(
    "expressRatesParcel"
  );
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
  const expressOrdersCollectionRef = firestore.collection("ordersExpress");
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

export const getAllOrdersOfSingleLot = async (lotObj) => {
  const ordersDocumentRef = firestore.doc(
    `orders${lotObj.shipmentMethod}/${lotObj.lotNo}`
  );
  try {
    const snapShot = await ordersDocumentRef.get();
    if (snapShot.exists) {
      return snapShot.data().orders;
    } else {
      return [];
    }
  } catch (error) {
    alert(error);
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

export const getAllAliProducts = async () => {
  const aliProductsCollectionRef = firestore.collection("aliproducts");
  try {
    const products = await aliProductsCollectionRef.get();
    const aliProductsArray = [];
    products.forEach((doc) => {
      var originalPrice = [];
      if (doc.data().originalPrice.min == doc.data().originalPrice.max) {
        originalPrice.push(Math.round(doc.data().originalPrice.min * 90));
      } else {
        originalPrice.push(
          `${Math.round(doc.data().originalPrice.min * 90)}- ${Math.round(
            doc.data().originalPrice.max * 90
          )}`
        );
      }
      var salePrice = [];
      if (doc.data().salePrice.min == doc.data().salePrice.max) {
        salePrice.push(Math.round(doc.data().salePrice.min * 90));
      } else {
        salePrice.push(
          `${Math.round(doc.data().salePrice.min * 90)}- ${Math.round(
            doc.data().salePrice.max * 90
          )}`
        );
      }
      const newObj = {
        id: doc.data().productId,
        name: doc.data().title,
        price: originalPrice[0],
        salePrice: salePrice[0],
        pictures: [...doc.data().images],
        availability: doc.data().availability,
        rating: doc.data().ratings.averageStar,
        categoryId: doc.data().categoryId,
        description: doc.data().description,
        specs: doc.data().specs,
        feedback: doc.data().feedback,
        orders: doc.data().orders,
        totalAvailableQuantity: doc.data().totalAvailableQuantity,
        variants: doc.data().variants,
      };
      aliProductsArray.push(newObj);
      originalPrice = [];
      salePrice = [];
    });
    return aliProductsArray;
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

export const getSingleProduct = async (id) => {
  const productRef = firestore.doc(`products/${id}`);
  try {
    const product = await productRef.get();
    if (!product.exists) {
      const aliProductRef = firestore.doc(`aliproducts/${id}`);
      try {
        const aliProduct = await aliProductRef.get();
        var originalPrice = [];
        if (
          aliProduct.data().originalPrice.min ==
          aliProduct.data().originalPrice.max
        ) {
          originalPrice.push(
            Math.round(aliProduct.data().originalPrice.min * 90)
          );
        } else {
          originalPrice.push(
            `${Math.round(
              aliProduct.data().originalPrice.min * 90
            )}- ${Math.round(aliProduct.data().originalPrice.max * 90)}`
          );
        }
        var salePrice = [];
        if (
          aliProduct.data().salePrice.min == aliProduct.data().salePrice.max
        ) {
          salePrice.push(Math.round(aliProduct.data().salePrice.min * 90));
        } else {
          salePrice.push(
            `${Math.round(aliProduct.data().salePrice.min * 90)}- ${Math.round(
              aliProduct.data().salePrice.max * 90
            )}`
          );
        }
        const aliProductObj = {
          id: aliProduct.data().productId,
          name: aliProduct.data().title,
          price: originalPrice[0],
          salePrice: salePrice[0],
          pictures: [...aliProduct.data().images],
          availability: aliProduct.data().availability,
          rating: aliProduct.data().ratings.averageStar,
          categoryId: aliProduct.data().categoryId,
          description: aliProduct.data().description,
          specs: aliProduct.data().specs,
          feedback: aliProduct.data().feedback,
          orders: aliProduct.data().orders,
          totalAvailableQuantity: aliProduct.data().totalAvailableQuantity,
          variants: aliProduct.data().variants,
        };
        return aliProductObj;
      } catch (error) {
        alert(error);
      }
    } else {
      return product.data();
    }
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
      console.log(doc.id, " => ", doc.data());
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

// export const updateAllOrders= async ()=> {
//   const collection = await firestore.collection("orders").get()
//   collection.forEach(doc=> {
//     doc.ref
//       .update({
//         ...doc.data(), status: 'order_pending'
//       })
//   })
// }

export const deleteOrder = async (id) => {
  const orderRef = firestore.doc(`orders/${id}`);
  try {
    await orderRef.delete();
  } catch (error) {
    alert(error);
  }
};

export const deleteSingleOrder = async (orderObj) => {
  const singleLotOrdersRef = firestore.doc(`ordersD2D/${orderObj.lotNo}`);
  try {
    const snapShot = await singleLotOrdersRef.get();
    const filteredArray = snapShot
      .data()
      .orders.filter((order) => order.cartonNo !== orderObj.cartonNo);
    singleLotOrdersRef.update({
      lotNo: snapShot.data().lotNo,
      orders: [...filteredArray],
    });
  } catch (error) {
    alert(error);
  }
};

export const getSingleOrder = async (orderObj) => {
  const [lotNo, cartonNo] = orderObj.orderId.split("-");
  console.log(orderObj.shipmentMethod);
  console.log(lotNo);
  console.log("get single order is getting is called");
  const lotOrdersRef = firestore.doc(
    `orders${orderObj.shipmentMethod}/${lotNo}`
  );
  try {
    const snapShot = await lotOrdersRef.get();
    return snapShot.data().orders.find((order) => order.cartonNo == cartonNo);
  } catch (error) {
    // alert(error);
    return null;
  }
};

export const updateMultipleOrder = async (orderIdArray, status) => {
  orderIdArray.forEach(async (orderId) => {
    const orderRef = firestore.doc(`orders/${orderId}`);
    const order = await orderRef.get();
    const userId = await order.data().userId;
    const userRef = firestore.doc(`users/${userId}`);
    const user = await userRef.get();
    var exactOrder = user
      .data()
      .ordersArray.find((order) => order.orderId == orderId);
    exactOrder.status = status;
    var otherOrders = user
      .data()
      .ordersArray.filter((order) => order.orderId !== orderId);
    console.log(status);
    if (status == "delivered") {
      console.log(status);
      const adminsCollectionRef = firestore.collection("admins");
      const admins = await adminsCollectionRef.get();
      admins.forEach(async (doc) => {
        console.log(doc.data().pending_orders.includes(orderId));
        if (doc.data().pending_orders.includes(orderId)) {
          console.log(status);
          var adminRef = firestore.doc(`admins/${doc.id}`);
          var updatedPendingOrders = doc
            .data()
            .pending_orders.filter((order) => order !== orderId);
          var newly_used_balance = order.data().sum;
          var total_used_balance = doc.data().used_balance
            ? doc.data().used_balance + newly_used_balance
            : newly_used_balance;
          await adminRef.update({
            ...doc.data(),
            pending_orders: [...updatedPendingOrders],
            successfully_delivered_orders: doc.data()
              .successfully_delivered_orders
              ? [...doc.data().successfully_delivered_orders, orderId]
              : [orderId],
            used_balance: total_used_balance,
            remaining_balance:
              doc.data().balance - parseInt(total_used_balance),
          });
        }
      });
    }
    try {
      await userRef.update({ ordersArray: [exactOrder, ...otherOrders] });
      return await orderRef.update({ ...order.data(), status: status });
    } catch (error) {
      alert(error);
    }
  });
};

export const updateMultipleOrderwithOrderTo = async (
  orderIdArray,
  status,
  orderTo
) => {
  orderIdArray.forEach(async (orderId) => {
    const orderRef = firestore.doc(`orders/${orderId}`);
    const order = await orderRef.get();
    const userId = await order.data().userId;
    const userRef = firestore.doc(`users/${userId}`);
    const user = await userRef.get();
    var exactOrder = user
      .data()
      .ordersArray.find((order) => order.orderId == orderId);
    exactOrder.status = status;
    if (!exactOrder.orderTo) {
      exactOrder.orderTo = orderTo;
    }
    var otherOrders = user
      .data()
      .ordersArray.filter((order) => order.orderId !== orderId);
    try {
      if (!order.data().orderTo) {
        await orderRef.update({ ...order.data(), status, orderTo });
      } else {
        await orderRef.update({
          ...order.data(),
          orderTo: order.data().orderTo,
          status,
        });
        alert(
          `this ${orderId} order is already ordered to another supplier. check ordered products`
        );
      }
      await userRef.update({ ordersArray: [exactOrder, ...otherOrders] });
    } catch (error) {
      alert(error);
    }
  });
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

export const updatePaymentStatus = async (paymentObj) => {
  const paymentRef = firestore.doc(`payments/${paymentObj.orderId}`);
  const payment = await paymentRef.get();
  var actualPayment = payment
    .data()
    .payments.find((payment) => payment.paymentId == paymentObj.paymentId);
  const orderId = actualPayment.orderId;
  const orderRef = firestore.doc(`orders/${orderId}`);
  const order = await orderRef.get();
  const userId = await order.data().userId;
  const userRef = firestore.doc(`users/${userId}`);
  const user = await userRef.get();
  var exactPayment = user
    .data()
    .paymentsArray.find((payment) => payment.paymentId == paymentObj.paymentId);
  exactPayment.paymentStatus = paymentObj.paymentStatus;
  var otherPayments = user
    .data()
    .paymentsArray.filter(
      (payment) => payment.paymentId !== paymentObj.paymentId
    );

  await userRef.update({ paymentsArray: [exactPayment, ...otherPayments] });
  const updatedPaymentObj = payment
    .data()
    .payments.find((payment) => payment.paymentId == paymentObj.paymentId);
  updatedPaymentObj.paymentStatus = paymentObj.paymentStatus;
  const newPaymentsArray = payment
    .data()
    .payments.filter((payment) => payment.paymentId !== paymentObj.paymentId);
  try {
    await paymentRef.update({
      ...payment.data(),
      payments: [...newPaymentsArray, updatedPaymentObj],
    });
  } catch (error) {
    alert(error);
  }
};

export const updateOrderAmount = async (paymentObj) => {
  const orderRef = firestore.doc(`orders/${paymentObj.orderId}`);
  const order = await orderRef.get();
  const userId = await order.data().userId;
  const userRef = firestore.doc(`users/${userId}`);
  const user = await userRef.get();
  var exactOrder = user
    .data()
    .ordersArray.find((order) => order.orderId == paymentObj.orderId);
  exactOrder.status === "order_pending"
    ? (exactOrder.status = "payment_approved")
    : (exactOrder.status = exactOrder.status);
  exactOrder.paymentStatus.paid =
    parseInt(exactOrder.paymentStatus.paid) + parseInt(paymentObj.amount);
  exactOrder.paymentStatus.due =
    parseInt(exactOrder.paymentStatus.total) -
    parseInt(exactOrder.paymentStatus.paid);
  var otherOrders = user
    .data()
    .ordersArray.filter((order) => order.orderId !== paymentObj.orderId);
  await userRef.update({ ordersArray: [exactOrder, ...otherOrders] });
  try {
    const order = await orderRef.get();
    console.log(order.data());
    await orderRef.update({
      ...order.data(),
      status:
        order.data().status === "order_pending"
          ? "payment_approved"
          : order.data().status,
      paymentStatus: {
        ...order.data().paymentStatus,
        due:
          parseInt(order.data().paymentStatus.total) -
          (parseInt(order.data().paymentStatus.paid) +
            parseInt(paymentObj.amount)),
        paid:
          parseInt(order.data().paymentStatus.paid) +
          parseInt(paymentObj.amount),
      },
    });
  } catch (error) {
    alert(error);
  }
};

// distribute order to managers
export const orderProductsFromChina = async (orderIdArray, orderTo) => {
  const adminsCollectionRef = firestore.collection("admins");
  orderIdArray.forEach(async (orderId) => {
    const orderRef = firestore.doc(`orders/${orderId}`);
    try {
      const order = await orderRef.get();
      if (!order.data().orderTo) {
        try {
          const admins = await adminsCollectionRef.get();
          admins.forEach((doc) => {
            var adminRef = firestore.doc(`admins/${doc.id}`);
            if (doc.data().name == orderTo) {
              adminRef.update({
                ...doc.data(),
                pending_orders: [...doc.data().pending_orders, orderId],
              });
              return;
            }
          });
        } catch (error) {
          alert(error);
        }
      } else {
        console.log(
          `${orderId} is already ordered to another supplier.check ordered item`
        );
      }
    } catch (error) {
      console.log(error);
    }
  });
};

export const productToOrder = async (productsArray) => {
  productsArray.forEach((product) => {
    const productToOrderRef = firestore.doc(`productToOrder/${product.id}`);
    try {
      productToOrderRef.set(product);
    } catch (error) {
      alert(error);
    }
  });
};

// admins
export const getAllAdmins = async () => {
  const adminsCollectionRef = firestore.collection("admins");
  try {
    const admins = await adminsCollectionRef.get();
    const adminsArray = [];
    admins.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      adminsArray.push({ adminId: doc.id, ...doc.data() });
    });
    return adminsArray;
  } catch (error) {
    alert(error);
  }
};

export const rechargeAdmin = async (adminIdArray, balance) => {
  adminIdArray.forEach(async (adminId) => {
    const adminRef = firestore.doc(`admins/${adminId}`);
    try {
      const admin = await adminRef.get();
      var total_balance = parseInt(admin.data().balance) + parseInt(balance);
      await adminRef.update({
        ...admin.data(),
        balance: admin.data().balance
          ? parseInt(admin.data().balance) + parseInt(balance)
          : parseInt(balance),
        remaining_balance: total_balance - parseInt(admin.data().used_balance),
      });
    } catch (error) {
      alert(error);
    }
  });
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
export const setRmbPrice = async (taka) => {
  const currencyRef = firestore.doc(`Currency/taka`);
  let rmbRate;
  if (taka) {
    try {
      const currency = await currencyRef.get();
      if (currency.data()) {
        await currencyRef.update({ ...currency.data(), taka });
        rmbRate = taka;
        return rmbRate;
      } else {
        await currencyRef.set({ taka: taka });
        rmbRate = taka;
        return rmbRate;
      }
    } catch (error) {
      alert(error);
    }
  } else {
    try {
      const currency = await currencyRef.get();
      rmbRate = currency.data().taka;
      return rmbRate;
    } catch (error) {
      alert(error);
    }
  }
};
