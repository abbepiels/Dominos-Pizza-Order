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

order.Order.Coupons.push();

order.Order.Products.push();

order.Order.Payments.push({
  Type: 'CreditCard',
  Amount: 'XXX',
  Number: 'XXX',
  CardType: 'XXX',
  Expiration: 'XXX',
  SecurityCode: 'XXX',
  PostalCode: 'XXX',
});

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
  configureAddress();
  configureProfile();
  configureOrderInformation();
}

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
// Get stores near specific area
getStoresNearArea(typesOfOrders.Delivery, 'XXX', 'XXXXX').then((storesNear) => console.log(storesNear.Stores[0]));
// Get specific store's info
getStoreInfo('XXX').then((oneStoreInfo) => console.log(oneStoreInfo));
// Get specific store's menu
getMenu('XXX').then((menuInfo) => console.log(menuInfo));
// Get coupon info
getCoupon('XXXX', 'XXX').then((couponInfo) => console.log(couponInfo));
// Check if an order is valid
checkIfOrderValid(order).then((orderValid) => console.log(orderValid.Order.Products));
// get price
getAmount(order).then((getOrder) => console.log(getOrder));
// Place order
placeOrder(order).then((placed) => console.log(placed));
