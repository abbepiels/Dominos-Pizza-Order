/* eslint-disable global-require */
// const prompt = require('prompt-sync')();
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
      {
        Code: '****',
        Qty: 1,
        ID: 1,
        IsBelowMinimumOrderAmount: false,
        IsBelowMinimumPaymentAmount: false,
        Tags: {
          Hash: '***',
        },
      },
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

function configureAddress(number, streetName, street, state, city, zip) {
  order.Order.StreetNumber = `${number}`;
  order.Order.StreetName = `${streetName}`;
  order.Order.Street = `${street}`;
  order.Order.Region = `${state}`;
  order.Order.City = `${city}`;
  order.Order.PostalCode = `${zip}`;

  console.log(order.Order.StreetNumber);
  console.log(order.Order.Street);
  console.log(order.Order.StreetName);
  console.log(order.Order.Region);
  console.log(order.Order.City);
  console.log(order.Order.PostalCode);
}

function configureCoupon(code, hash) {
  order.Order.Coupons.Code = `${code}`;
  order.Order.Coupons.Tags.Hash = `${hash}`;
  console.log(order.Order.Coupons.Code);
  console.log(order.Order.Tags.Hash);
}
function configureProfile(email, first, last, phone, prefix) {
  order.Order.Email = `${email}`;
  order.Order.FirstName = `${first}`;
  order.Order.LastName = `${last}`;
  order.Order.Phone = `${phone}`;
  order.Order.PhonePrefix = `${prefix}`;
  console.log(order.Order.Email);
  console.log(order.Order.FirstName);
  console.log(order.Order.LastName);
  console.log(order.Order.Phone);
  console.log(order.Order.PhonePrefix);
}
function configureOrderInformation(orderId, service, storeId) {
  order.Order.OrderID = `${orderId}`;
  order.Order.ServiceMethod = `${service}`;
  order.Order.StoreID = `${storeId}`;
  console.log(order.Order.OrderID);
  console.log(order.Order.ServiceMethod);
  console.log(order.Order.StoreID);
}
function configureOrder() {
  configureAddress('6', 'Baldwin Ter', '6 Baldwin Ter', 'NJ', 'Livingston', '07039');
  configureProfile('apiels19@gmail.com', 'Abbe', 'Piels', '9734879830', '1');
  configureOrderInformation('389024', 'Delivery', '3940');
}
configureOrder();
