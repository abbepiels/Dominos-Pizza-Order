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
7. Push these products/coupons into the order.Order.Products/order.Order.Coupons array respectively by copying and pasting the products from the response into the .push() method.
8. To check if your order is valid, run checkIfOrderValid(order), make sure to set your orderID from this response as the 1st argument in the configureOrderInformation() function.
9. Once your order is valid, fill in your payment information, and run placeOrder(order).then((placed) => console.log(placed))!
10. Enjoy your pizza :) 
# Example Run
``` JS
configureAddress('1600', 'PENNSYLVANIA AVE', '1600 PENNSYLVANIA AVE', 'WASHINGTON', 'DC', '20500');
getStoresNearArea(typesOfOrders.Delivery, '20500', '1600 PENNSYLVANIA AVE').then((storesNear) => console.log(storesNear.Stores[0]));
```
