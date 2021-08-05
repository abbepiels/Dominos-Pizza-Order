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
  // https://order.dominos.com/power/store-locator?type=Delivery&c=Livingston%2C%20NJ%2007039&s=6%20Baldwin%20Terrace
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
      Street: '6 BALDWIN TER',
      City: 'LIVINGSTON',
      Region: 'NJ',
      PostalCode: '07039-2702',
      Type: 'House',
      StreetName: 'BALDWIN TER',
      StreetNumber: '6',
    },
    Coupons: [
      {
        Code: '9193',
        Qty: 1,
        ID: 1,
        IsBelowMinimumOrderAmount: false,
        IsBelowMinimumPaymentAmount: false,
        Tags: {
          Hash: '1628188303176',
        },
      },
    ],
    CustomerID: '',
    Email: '',
    Extension: '',
    FirstName: '',
    LastName: '',
    LanguageCode: 'en',
    OrderChannel: 'OLO',
    OrderID: '-jHOCaO60qWgshUPYgUb',
    OrderMethod: 'Web',
    OrderTaker: null,
    Payments: [],
    Phone: '',
    PhonePrefix: '',
    Products: [
      {
        Code: '12SCREEN',
        Qty: 1,
        ID: 2,
        isNew: true,
        Options: {
          X: {
            '1/1': '1',
          },
          C: {
            '1/1': '1',
          },
        },
      },
      {
        Code: 'B8PCCT',
        Qty: 1,
        ID: 3,
        isNew: true,
        Options: {
          SIDICE: 1,
        },
      },
    ],
    ServiceMethod: 'Delivery',
    SourceOrganizationURI: 'order.dominos.com',
    StoreID: '3948',
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
getOrderPrice(order).then((orderPrice) => console.log(orderPrice));
// checkIfOrderValid(order).then((orderValid) => console.log(orderValid.Order.Products));
// Test methods
/*
getStoresNearArea(typesOfOrders.Delivery, '07039', '6 Baldwin Terrace').then((storesNear) => console.log(storesNear.Stores[0]));
getStoreInfo('3948').then((oneStoreInfo) => console.log(oneStoreInfo));
getMenu('3948').then((menuInfo) => console.log(menuInfo));
getCoupon('3948', '9193').then((couponInfo) => console.log(couponInfo));
getStoresNearArea('Delivery', '07039', '6 Baldwin Terrace').then((storesNear) => console.log(storesNear.Stores[0]));
getStoreInfo('3948').then((oneStoreInfo) => console.log(oneStoreInfo));
*/
