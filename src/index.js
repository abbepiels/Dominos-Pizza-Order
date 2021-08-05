const fetch = require('node-fetch');
// base URL for functions
const URL = 'https://order.dominos.com/power/';

const typesOfOrders = {
  Delivery: 'Delivery',
  CarryOut: 'Carryout',
};
// used Dev Tools in chrome - copy request as fetch to get fetch information
// use async to make it easier to write - looks more procedural, but behaving asynchronously
async function getStoresNearArea(typesOfOrders, cityRegionOrPostalCode, street = ' ') {
  const response = await fetch(`${URL}store-locator?type=${typesOfOrders}&c=${cityRegionOrPostalCode}&s=${street}`, {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'en-US,en;q=0.9',
      'dpz-language': 'en',
      'dpz-market': 'UNITED_STATES',
      market: 'UNITED_STATES',
    },
    referrer: 'https://order.dominos.com/assets/build/xdomain/proxy.html',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  });
  const storesNear = await response.json();
  return storesNear;
}
async function getStoreInfo(idStore) {
  const response = await fetch(`${URL}store/${idStore}/profile`);
  const oneStoreInfo = await response.json();
  return oneStoreInfo;
}

async function getMenu(idMenu) {
  const response = await fetch(`${URL}store/${idMenu}/menu?lang=en&structured=true`);
  const menuInfo = await response.json();
  return menuInfo;
}

async function getCoupon(idStore, idCoupon) {
  const response = await fetch(`${URL}store/${idStore}/coupon/${idCoupon}?lang=en`);
  const couponInfo = await response.json();
  return couponInfo;
}
async function checkIfOrderValid(order) {
  const response = await fetch(`${URL}validate-order`, {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json; charset=UTF-8',
      'dpz-language': 'en',
      'dpz-market': 'UNITED_STATES',
    },
    referrer: 'https://order.dominos.com/assets/build/xdomain/proxy.html',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: JSON.stringify(order),
    method: 'POST',
  });

  const orderValid = await response.json();
  return orderValid;
}
const order = {
  Order: {
    Address: {
      Street: '1124 GENESEE ST',
      City: 'ROCHESTER',
      Region: 'NY',
      PostalCode: '14611-4108',
      Type: 'House',
      StreetName: 'GENESEE ST',
      StreetNumber: '1124',
    },
    Coupons: [
      {
        Code: '9193',
        Qty: 1,
        ID: 1,
        IsBelowMinimumOrderAmount: false,
        IsBelowMinimumPaymentAmount: false,
        Tags: {
          Hash: '1628193634999',
        },
      },
    ],
    Email: 'apiels19@gmail.com',
    FirstName: 'Abbe',
    LastName: 'Piels',
    LanguageCode: 'en',
    OrderChannel: 'OLO',
    OrderID: 'UH556-fMitmA3UvYvbzk',
    OrderMethod: 'Web',
    OrderTaker: null,
    Payments: [],
    Phone: '9734879830',
    PhonePrefix: '1',
    Products: [
      {
        Code: '12SCREEN',
        Qty: 1,
        ID: 4,
        isNew: true,
        ShowBestPriceMessage: true,
        Options: {
          X: {
            '1/1': '1',
          },
          C: {
            '1/1': '1',
          },
          O: {
            '1/1': '1',
          },
          M: {
            '1/1': '1',
          },
          Td: {
            '1/1': '1',
          },
          Si: {
            '1/1': '1',
          },
          G: {
            '1/1': '1',
          },
        },
      },
      {
        Code: 'B8PCGT',
        Qty: 1,
        ID: 5,
        isNew: true,
        ShowBestPriceMessage: false,
        Options: {
          SIDMAR: 1,
        },
      },
    ],
    ServiceMethod: 'Delivery',
    SourceOrganizationURI: 'order.dominos.com',
    StoreID: '3430',
    Tags: {},
    Version: '1.0',
    NoCombine: true,
    Partners: {},
    HotspotsLite: false,
    OrderInfoCollection: [],
  },
};

async function getOrderPrice(order) {
  const response = await fetch(`${URL}price-order`, {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json; charset=UTF-8',
      'dpz-language': 'en',
      'dpz-market': 'UNITED_STATES',
    },
    referrer: 'https://order.dominos.com/assets/build/xdomain/proxy.html',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: JSON.stringify(order),
    method: 'POST',
  });
  const orderPrice = await response.json();
  return orderPrice;
}

async function getAmount(order) {
  const amt = await getOrderPrice(order);
  const getOrderAmt = amt.Order.Amounts.Customer;
  return getOrderAmt;
}

async function placeOrder(order) {
  const response = await fetch(`${URL}place-order`, {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json; charset=UTF-8',
      'dpz-language': 'en',
      'dpz-market': 'UNITED_STATES',
    },
    referrer: 'https://order.dominos.com/assets/build/xdomain/proxy.html',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: JSON.stringify(order),
    method: 'POST',
  });
  const placed = await response.json();
  return placed;
}
order.Order.Payments.push({
  Type: 'CreditCard',
  Amount: 23.19,
  Number: '4482330087021630',
  CardType: 'VISA',
  Expiration: '1224',
  SecurityCode: '683',
  PostalCode: '07039',
});
/*
// Test methods
//Get stores near specific area
getStoresNearArea(typesOfOrders.Delivery, '14611', '1124  Genesse Street').then((storesNear) => console.log(storesNear.Stores[0]));
//Get specific store's info
getStoreInfo('3430').then((oneStoreInfo) => console.log(oneStoreInfo));
//Get specific store's menu
getMenu('3430').then((menuInfo) => console.log(menuInfo));
//Get coupon ingo
getCoupon('3430', '9193').then((couponInfo) => console.log(couponInfo));
getCoupon('3430', '8223').then((couponInfo) => console.log(couponInfo));
//Check if an order is valid
checkIfOrderValid(order).then((orderValid) => console.log(orderValid.Order.Products));
// Get price of order  and o ther info
getOrderPrice(order).then((orderPrice) => console.log(orderPrice));
//get price
getAmount(order).then((getOrder) => console.log(getOrder));
//Place order
placeOrder(order, pay).then((placed) => console.log(placed));
// getStoresNearArea(typesOfOrders.Delivery, '14611', '1124  Genesse Street').then((storesNear) => console.log(storesNear.Stores[0]));
// checkIfOrderValid(order).then((orderValid) => console.log(orderValid));
getAmount(order).then((getOrder) => console.log(getOrder));
// placeOrder(order, pay).then((placed) => console.log(placed));
getStoresNearArea(typesOfOrders.Delivery, '14611', '1124  Genesse Street').then((storesNear) => console.log(storesNear.Stores[0]));
*/
// getStoresNearArea(typesOfOrders.Delivery, '14611', '1124  Genesse Street').then((storesNear) => console.log(storesNear.Stores[0]));
// checkIfOrderValid(order).then((orderValid) => console.log(orderValid));
// console.log(order.Order.Payments);
placeOrder(order).then((placed) => console.log(placed));
