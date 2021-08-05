const fetch = require('node-fetch');
//base URL for functions
const URL = 'https://order.dominos.com/power/';

const typesOfOrders = {
  Delivery: 'Delivery',
  CarryOut: 'Carryout'
};
//used Dev Tools in chrome - copy request as fetch to get fetch information
async function getStoresNearAddress(typesOfOrders,cityRegionOrPostalCode, street = ' ') {
  //https://order.dominos.com/power/store-locator?type=Delivery&c=Livingston%2C%20NJ%2007039&s=6%20Baldwin%20Terrace
  const response = await fetch(`${URL}store-locator?type=${typesOfOrders}&c=${cityRegionOrPostalCode}&s=${street}`, {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "dpz-language": "en",
      "dpz-market": "UNITED_STATES",
      "market": "UNITED_STATES",
      "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
      "sec-ch-ua-mobile": "?1",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-dpz-d": "e5ab898c-3bb6-4d47-9bf9-c3b8ebb72429"
    },
    "referrer": "https://order.dominos.com/assets/build/xdomain/proxy.html",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  });
  const storesNear = await response.json();
  return storesNear;
}
async function getStoreInfo(id){
  const response = await fetch(`https://order.dominos.com/power/store/${id}/profile`);
  //console.log(response.json);
  const oneStoreInfo = await response.json();
  return oneStoreInfo;
}

getStoresNearAddress('Delivery', '07039', '6 Baldwin Terrace').then(storesNear => console.log(storesNear.Stores[0]));

getStoreInfo('3948').then(oneStoreInfo => console.log(oneStoreInfo));