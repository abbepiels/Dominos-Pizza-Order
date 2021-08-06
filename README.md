# Order Dominos Pizza!
# Steps to run this program:
1. Install program (download code whichever way you desire)
2. Fill in any information you can in the the configureOrder() function (this function runs 3 others).
3. Run getStoresNearArea() with the type of order and your location as arguments.
4. In the response, find "StoreID" of the first store (closest) and pass it as the 3rd argument in the configureOrderInformation() function.
5. Run the getMenu() function using this same StoreID as your argument to see potential products to order and coupons to use. To make it easier, you can run 
```JS
getMenu('XXXX').then((menuInfo) => console.log(menuInfo.Products)) and getMenu('XXXX').then((menuInfo) => console.log(menuInfo.Coupons))
```
7. Push these products/coupons into the order.Order.Products/order.Order.Coupons array respectively by copying and pasting the products from the response into the .push() method. The coupons have a description of which products it works on!
8. To check if your order is valid, run checkIfOrderValid(order), make sure to set your orderID from this response as the 1st argument in the configureOrderInformation() function.
9. Check the price of your order using getAmount(order).
10. Once your order is valid and you have the price, fill in your payment information, and run placeOrder(order).then((placed) => console.log(placed))!
# Example Run
``` JS
configureAddress('1600', 'PENNSYLVANIA AVE', '1600 PENNSYLVANIA AVE', 'WASHINGTON', 'DC', '20500');
getStoresNearArea(typesOfOrders.Delivery, '20500', '1600 PENNSYLVANIA AVE').then((storesNear) => console.log(storesNear.Stores[0]));
```
Found that StoreId == '4336'
```JS
getMenu('4336').then((menuInfo) => console.log(menuInfo.Products));
getMenu('4336').then((menuInfo) => console.log(menuInfo.Coupons));
```
Picked products and coupon from menu
```JS
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
```
Check if this order is okay and see pricee
``` JS
checkIfOrderValid(order).then((orderValid) => console.log(orderValid));
getAmount(order).then((getOrder) => console.log(getOrder));
```
It is! Time to enter payment and place order
```JS
order.Order.Payments.push({
  Type: 'CreditCard',
  Amount: 30.50,
  Number: '47390285439245',
  CardType: 'VISA',
  Expiration: '1234',
  SecurityCode: '123',
  PostalCode: '1234567',
});
placeOrder(order).then((placed) => console.log(placed));
```
Now wait for your pizza to come and enjoy!!!
