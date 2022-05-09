import React from 'react';
import {Alert} from 'react-native';
import AuthId from '../AuthId.style';
import {API_Links} from '../Api/Api';

// const idofZero = ['yes'];

// const ft =[
//   {
//     "customers_basket_id": 886,
//     "customers_id": 0,
//     "products_id": "21",
//     "customers_basket_quantity": 1,
//     "final_price": "200.00",
//     "weight": "0",
//     "customers_basket_date_added": "2022-03-17",
//     "is_order": 0,
//     "order_ref_no": null,
//     "session_id": "139208db-e3d2-4936-8dc0-e84c0e4e80de",
//     "hold_status": 0,
//     "hold_id": 0,
//     "model": null,
//     "image": "images/media/2022/02/thumbnail1645507442CRabR22701.jpg",
//     "image_path_type": "local",
//     "products_image": 1248,
//     "products_name": "Game Product",
//     "quantity": -1,
//     "price": "200.00",
//     "unit": "gm",
//     "attr": "yes",

//     "attributes": [
//         {
//             "customers_basket_attributes_id": 47,
//             "customers_basket_id": 886,
//             "customers_id": 0,
//             "products_id": "21",
//             "products_options_id": 3,
//             "products_options_values_id": 1,
//             "session_id": "139208db-e3d2-4936-8dc0-e84c0e4e80de",
//             "prefix":"+",
//             "key":"90"

//         }
//     ]
// },
// {
//     "customers_basket_id": 885,
//     "customers_id": 0,
//     "products_id": "97",
//     "customers_basket_quantity": 1,
//     "final_price": "111.00",
//     "weight": "0",
//     "customers_basket_date_added": "2022-03-17",
//     "is_order": 0,
//     "order_ref_no": null,
//     "session_id": "139208db-e3d2-4936-8dc0-e84c0e4e80de",
//     "hold_status": 0,
//     "hold_id": 0,
//     "model": null,
//     "image": "images/media/2022/02/thumbnail1645695032gWfC424305.jpg",
//     "image_path_type": "local",
//     "products_image": 1389,
//     "products_name": "wdwdw",
//     "quantity": 0,
//     "price": "111.00",
//     "unit": "gm",
//     "attributes": []

// },

// {
//   "customers_basket_id": 885,
//   "customers_id": 0,
//   "products_id": "97",
//   "customers_basket_quantity": 1,
//   "final_price": "111.00",
//   "weight": "0",
//   "customers_basket_date_added": "2022-03-17",
//   "is_order": 0,
//   "order_ref_no": null,
//   "session_id": "139208db-e3d2-4936-8dc0-e84c0e4e80de",
//   "hold_status": 0,
//   "hold_id": 0,
//   "model": null,
//   "image": "images/media/2022/02/thumbnail1645695032gWfC424305.jpg",
//   "image_path_type": "local",
//   "products_image": 1389,
//   "products_name": "wdwdw",
//   "quantity": 0,
//   "price": "111.00",
//   "unit": "gm",
//   "attr": "yes",

//   "attributes": [ {
//     "customers_basket_attributes_id": 4117,
//     "customers_basket_id": 8816,
//     "customers_id": 0,
//     "products_id": "211",
//     "products_options_id": 13,
//     "products_options_values_id": 11,
//     "session_id": "139208db-e3d2-493ddd6-8dc0-e84c0e4e80de",
//     "prefix":"+",
//     "key":"901"
//   }]

// }

// ]

export function Order(
  singlecustomerData,
  cartItems,
  navigation,
  BASE_URL,
  ADD_TO_ORDER,
  currencyCode,
  languageId,
  getDiscountvalue,
  casherId,
  balanceAmount,
  couponAmount,
  couponId,
  couponCode,
  discount,
  groceryName,
  checkboxState,
) {
  //  console.log("guestData",guestData)

  //    console.log('billing_city', singlecustomerData.entry_city);
  //    console.log('billing_country', singlecustomerData.countries_name);
  //    console.log('billing_country_code', singlecustomerData.country_code);
  //    console.log('billing_country_id', singlecustomerData.entry_country_id);
  //    console.log('billing_firstname', singlecustomerData.entry_firstname);
  //    console.log('billing_lastname', singlecustomerData.entry_lastname);
  //    console.log('billing_phone', singlecustomerData.entry_phone);
  //    console.log('billing_postcode', singlecustomerData.entry_postcode);
  //    console.log('billing_state', singlecustomerData.entry_zone_id);
  //    console.log('comments', 'Test');
  //    console.log('coupon_amount', couponAmount);
  //    console.log('coupons', couponId);
  //    console.log('currency_code', currencyCode);
  //    console.log(
  //       'customers_address_format_id',
  //       singlecustomerData.address_book_id,
  //     );
  //    console.log('customers_id', singlecustomerData.user_id);
  //    console.log('customers_name', singlecustomerData.entry_firstname);
  //    console.log('customers_suburb', 'Test');
  //    console.log('customers_telephone', singlecustomerData.entry_phone);
  //    console.log(
  //       'delivery_address_format_id',
  //       singlecustomerData.address_book_id,
  //     );
  //    console.log('delivery_city', singlecustomerData.entry_city);
  //    console.log('delivery_country', singlecustomerData.countries_name);
  //    console.log('delivery_country_code', singlecustomerData.country_code);
  //    console.log('delivery_country_id', singlecustomerData.entry_country_id);
  //    console.log('delivery_firstname', singlecustomerData.entry_firstname);
  //    console.log('delivery_lastname', singlecustomerData.entry_lastname);
  //    console.log('delivery_phone', singlecustomerData.entry_phone);
  //    console.log('delivery_postcode', singlecustomerData.entry_postcode);
  //    console.log('delivery_state', singlecustomerData.entry_zone_id);
  //    console.log(
  //       'delivery_street_address',
  //       singlecustomerData.entry_street_address,
  //     );
  //    console.log('delivery_suburb', 'Test');
  //    console.log('delivery_zone', singlecustomerData.entry_zone_id);
  //    console.log('email', singlecustomerData.email);
  //    console.log('guest_status', 0);
  //    console.log('is_coupon_applied', couponId === 0 ? 0:1);
  //    console.log('language_id', languageId);
  //    console.log('latitude', 0);
  //    console.log('longitude', 0);
  //    console.log('nonce', 0);
  //    console.log('payment_method', 'Cash');
  //    console.log(`products[0][attributes]`, '');
  //    console.log('shipping_cost', 0);
  //    console.log('shipping_method', 'Cash');
  //    console.log('tax_zone_id', 1);
  //    console.log('totalPrice', getDiscountvalue);
  //    console.log('total_tax', 0);

  //     cartItems.map((e,i)=>console.log(`products[${i}][cart_id]`, e.products_id) )

  //   cartItems.map((e ,i)=>console.log(`products[${i}][customers_basket_quantity]`,e.customers_basket_quantity ))

  //    console.log(`products[0][categories]`, ''),

  //     cartItems.map((e ,i)=>console.log(`products[${i}][final_price]`,e.final_price))

  //     cartItems.map((e ,i)=>console.log(`products[${i}][image]`,e.image))
  //   //console.log(`products[0][image]`, 'images/media/2022/02/thumbnail1645695032gWfC424305.jpg')

  //    console.log(`products[0][model]`, ''),
  //    console.log(`products[0][on_sale]`, ''),

  //     cartItems.map((e ,i)=>console.log(`products[${i}][price]`,e.price))
  // // console.log(`products[0][price]`, '1111')

  // cartItems.map((e ,i)=>console.log(`products[${i}][products_id]`,e.products_id))

  //     // console.log(`products[0][products_id]`, '97')

  //     cartItems.map((e ,i)=>console.log(`products[${i}][products_name]`,e.products_name))

  //     cartItems.map((e ,i)=>console.log(`products[${i}][subTotal]`,e.price))

  //     cartItems.map((e ,i)=>console.log(`products[${i}][total]`,e.price))

  //    console.log(`products[0][unit]`, '' );
  //    console.log(`products[0][weight]`,'' );

  //    console.log('billing_street_address', singlecustomerData.entry_street_address,
  //     );

  //    console.log('coupon_code_id', couponId);
  //    console.log('points_amount', singlecustomerData.loyalty_points);
  //    console.log('cashier_id', casherId);
  //    console.log('payment_status', 'success');
  //    console.log('discount_amount',discount==='' ? 0 :discount);
  //    console.log('couponCode',couponCode);
  //    console.log('total_weight',0);
  //    console.log('order_km', 0)

  var data = new FormData();

  data.append(
    'billing_city',
    checkboxState === 0 ? 'Guest City' : singlecustomerData.entry_city,
  );
  data.append(
    'billing_country',
    checkboxState === 0 ? 'Guest State' : singlecustomerData.countries_name,
  );
  data.append(
    'billing_country_code',
    checkboxState === 0 ? '61' : singlecustomerData.country_code,
  );
  data.append(
    'billing_country_id',
    checkboxState === 0 ? '132' : singlecustomerData.entry_country_id,
  );
  data.append(
    'billing_firstname',
    checkboxState === 0 ? 'Guest3245' : singlecustomerData.entry_firstname,
  );
  data.append(
    'billing_lastname',
    checkboxState === 0 ? 'Guest3245' : singlecustomerData.entry_lastname,
  );
  data.append(
    'billing_phone',
    checkboxState === 0 ? '1689485114' : singlecustomerData.entry_phone,
  );
  data.append(
    'billing_postcode',
    checkboxState === 0 ? '43200' : singlecustomerData.entry_postcode,
  );
  data.append(
    'billing_state',
    checkboxState === 0 ? 'guest Addr' : singlecustomerData.entry_zone_id,
  );
  data.append('comments', 'order Received successfully');
  data.append('coupon_amount', couponAmount);
  data.append('coupons', couponId);
  data.append('currency_code', currencyCode);
  data.append(
    'customers_address_format_id',
    checkboxState === 0 ? '77' : singlecustomerData.address_book_id,
  );
  data.append(
    'customers_id',
    checkboxState === 0 ? '45' : singlecustomerData.user_id,
  );
  data.append(
    'customers_name',
    checkboxState === 0
      ? 'Guest first name '
      : singlecustomerData.entry_firstname,
  );
  data.append('customers_suburb', 'order Added');
  data.append(
    'customers_telephone',
    checkboxState === 0 ? '1689485114' : singlecustomerData.entry_phone,
  );
  data.append(
    'delivery_address_format_id',
    checkboxState === 0 ? '77' : singlecustomerData.address_book_id,
  );
  data.append(
    'delivery_city',
    checkboxState === 0 ? 'Guest City' : singlecustomerData.entry_city,
  );
  data.append(
    'delivery_country',
    checkboxState === 0 ? 'Guest Country' : singlecustomerData.countries_name,
  );
  data.append(
    'delivery_country_code',
    checkboxState === 0 ? '60' : singlecustomerData.country_code,
  );
  data.append(
    'delivery_country_id',
    checkboxState === 0 ? '34' : singlecustomerData.entry_country_id,
  );
  data.append(
    'delivery_firstname',
    checkboxState === 0
      ? 'Guest Firstname'
      : singlecustomerData.entry_firstname,
  );
  data.append(
    'delivery_lastname',
    checkboxState === 0 ? 'Guest Last name' : singlecustomerData.entry_lastname,
  );
  data.append(
    'delivery_phone',
    checkboxState === 0 ? '1689485114' : singlecustomerData.entry_phone,
  );
  data.append(
    'delivery_postcode',
    checkboxState === 0 ? '58778385' : singlecustomerData.entry_postcode,
  );
  data.append(
    'delivery_state',
    checkboxState === 0 ? '6' : singlecustomerData.entry_zone_id,
  );
  data.append(
    'delivery_street_address',
    checkboxState === 0
      ? 'Guest Addr'
      : singlecustomerData.entry_street_address,
  );
  data.append('delivery_suburb', 'Order products');
  data.append(
    'delivery_zone',
    checkboxState === 0 ? '11' : singlecustomerData.entry_zone_id,
  );
  data.append(
    'email',
    checkboxState === 0 ? 'Guest3245@gmail.com' : singlecustomerData.email,
  );

  data.append('guest_status', 0);
  data.append('is_coupon_applied', couponId === 0 ? 0 : 1);
  data.append('language_id', languageId);
  data.append('latitude', 0);
  data.append('longitude', 0);
  data.append('nonce', 0);
  data.append('payment_method', 'Cash'),
    data.append(
      'billing_street_address',
      checkboxState === 0
        ? 'Guest Address'
        : singlecustomerData.entry_street_address,
    );
  data.append('coupon_code_id', couponId);

  data.append(
    'points_amount',
    checkboxState === 0 ? '0' : singlecustomerData.loyalty_points,
  );
  data.append(`products[0][attributes]`, '');

  // data.append('products[0][attributes][0][products_options]', ''),

  // data.append('products[0][attributes][0][products_options_values]', ''),

  // data.append('products[0][attributes][0][options_values_price]', ''),

  // data.append('products[0][attributes][0][price_prefix]', ''),

  // data.append('products[0][attributes][0][attribute_id]', ''),

  // data.append('products[0][attributes][0][products_options_id]', ''),

  // data.append('products[0][attributes][0][products_options_values_id]', ""),

  data.append('shipping_cost', 0);
  data.append('shipping_method', 'Cash');
  data.append('tax_zone_id', 1);
  data.append('totalPrice', getDiscountvalue);
  data.append('total_tax', 0);

  cartItems.map((e, i) =>
    data.append(`products[${i}][cart_id]`, e.products_id),
  );

  cartItems.map((e, i) =>
    data.append(
      `products[${i}][customers_basket_quantity]`,
      e.customers_basket_quantity,
    ),
  );

  data.append(`products[0][categories]`, ''),
    cartItems.map((e, i) =>
      data.append(`products[${i}][final_price]`, e.final_price),
    );

  cartItems.map((e, i) => data.append(`products[${i}][image]`, e.image));
  // data.append(`products[0][image]`, 'images/media/2022/02/thumbnail1645695032gWfC424305.jpg')

  data.append(`products[0][model]`, ''),
    data.append(`products[0][on_sale]`, ''),
    cartItems.map((e, i) => data.append(`products[${i}][price]`, e.price));
  //  data.append(`products[0][price]`, '1111')

  cartItems.map((e, i) =>
    data.append(`products[${i}][products_id]`, e.products_id),
  );

  cartItems.map((e, i) =>
    data.append(`products[${i}][products_name]`, e.products_name),
  );

  cartItems.map((e, i) => data.append(`products[${i}][subTotal]`, e.price));

  cartItems.map((e, i) => data.append(`products[${i}][total]`, e.price));

  data.append(`products[0][unit]`, '');
  data.append(`products[0][weight]`, '');
  data.append('cashier_id', casherId);
  data.append('payment_status', 'success');
  data.append('discount_amount', discount === '' ? 0 : discount);
  data.append('couponCode', couponCode);
  data.append('total_weight', 0);
  data.append('order_km', 0);
  data.append('ordered_source', 0);

  console.log('hs', data);

  fetch(
    groceryName === ''
      ? 'https://grocery.platinum24.net/api/addtoorder'
      : `https://platinum24.net/${groceryName}/api/addtoorder`,
    {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'consumer-key': API_Links.CONSUMER_KEY,
        'consumer-secret': API_Links.SECRET_KEY,
        'consumer-nonce':
          AuthId._currDate.getMilliseconds().toString() +
          AuthId._currDate.getTime().toString() +
          '-' +
          Math.floor(Math.random() * 999) +
          1,
        'consumer-device-id': AuthId._currDeviceId,
        'consumer-ip': AuthId._currIp,
        'Content-Type': 'multipart/form-data',
      }),

      body: data,
    },
  )
    .then(response => response.json())

    .then(e => {
      if (e.success === '1') {
        Alert.alert(e.message, '', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('Balance', {
                enterAmount: balanceAmount,

                orderResponse: e,
              }),
          },
        ]);
      } else {
        Alert.alert(e.message, '', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    })

    .catch(e => console.log('error', e));
}
