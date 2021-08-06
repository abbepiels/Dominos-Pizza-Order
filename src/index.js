const order = {
  Order: {
    Address: {
      Street: '***',
      City: '****',
      Region: '****',
      PostalCode: '****',
      Type: 'House',
      StreetName: '****',
      StreetNumber: '****',
    },
    Coupons: [
    ],
    Email: '***',
    FirstName: '***',
    LastName: '***',
    LanguageCode: 'en',
    OrderChannel: 'OLO',
    OrderID: '***',
    OrderMethod: 'Web',
    OrderTaker: null,
    Payments: [],
    Phone: '***',
    PhonePrefix: '***',
    Products: [
    ],
    ServiceMethod: '***',
    SourceOrganizationURI: 'order.dominos.com',
    StoreID: '***',
    Tags: {},
    Version: '1.0',
    NoCombine: true,
    Partners: {},
    HotspotsLite: false,
    OrderInfoCollection: [],
  },
};

const fetch = require('node-fetch');
// base URL for functions
const URL = 'https://order.dominos.com/power/';

function configureAddress(number, streetName, street, state, city, zip) {
  order.Order.Address.StreetNumber = `${number}`;
  order.Order.Address.StreetName = `${streetName}`;
  order.Order.Address.Street = `${street}`;
  order.Order.Address.Region = `${state}`;
  order.Order.Address.City = `${city}`;
  order.Order.Address.PostalCode = `${zip}`;
}
function configureProfile(email, first, last, phone, prefix) {
  order.Order.Email = `${email}`;
  order.Order.FirstName = `${first}`;
  order.Order.LastName = `${last}`;
  order.Order.Phone = `${phone}`;
  order.Order.PhonePrefix = `${prefix}`;
}
function configureOrderInformation(orderId, service, storeId) {
  order.Order.OrderID = `${orderId}`;
  order.Order.ServiceMethod = `${service}`;
  order.Order.StoreID = `${storeId}`;
}
function configureOrder() {
  configureAddress('6', 'BALDWIN TER', '6 BALDWIN TER', 'NJ', 'LIVINGSTON', '07039-2702');
  configureProfile('apiels19@gmail.com', 'Abbe', 'Piels', '9734879830', '1');
  configureOrderInformation('os8H-roLM36P7hZ1twe3', 'Delivery', '3948');
}
order.Order.Coupons.push({
  Code: '9193',
  Qty: 1,
  ID: 1,
  IsBelowMinimumOrderAmount: false,
  IsBelowMinimumPaymentAmount: false,
  Tags: {
    Hash: '1628221026535',
  },
});

order.Order.Products.push({
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
});

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
/*
order.Order.Payments.push({
  Type: '****',
  Amount: '****',
  Number: '****',
  CardType: '****',
  Expiration: '****',
  SecurityCode: '****',
  PostalCode: '***',
});
*/
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

// Test methods
configureOrder();
// console.log(order);
/*
// Get stores near specific area
getStoresNearArea(typesOfOrders.Delivery, '14611', '1124  Genesse Street').then((storesNear) => console.log(storesNear.Stores[0]));
// Get specific store's info
getStoreInfo('3430').then((oneStoreInfo) => console.log(oneStoreInfo));
// Get specific store's menu
getMenu('3430').then((menuInfo) => console.log(menuInfo));
// Get coupon ingo
getCoupon('3430', '9193').then((couponInfo) => console.log(couponInfo));
getCoupon('3430', '8223').then((couponInfo) => console.log(couponInfo));
// Check if an order is valid
checkIfOrderValid(order).then((orderValid) => console.log(orderValid.Order.Products));
// Get price of order  and o ther info
getOrderPrice(order).then((orderPrice) => console.log(orderPrice));
// get price
getAmount(order).then((getOrder) => console.log(getOrder));
// Place order
placeOrder(order).then((placed) => console.log(placed));
*/
