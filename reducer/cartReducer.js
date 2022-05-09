import {
  CART_ADD,
  CART_CLEAR,
  CART_INC,
  CART_DEC,
  CART_DELETE,
  CART_ADD_REQSSS,
  CART_EXISTS,
  CART_VIEW,
  CUSTOMER_DATA,
  CART_CLEAR_REQ,
  COD_ADD,
  CART_VIEW_FAIL,
  COUPON_ADD_REQ,
  COUPON_ADD_SUCCESS,
  COUPON_RES_FAIL,
  GET_SESSION_TOKEN,
  GET_SESSION_REQ,
} from '../action/Constant';
import {Alert, Dimensions} from 'react-native';
import RNRestart from 'react-native-restart'; // Import package from node modules

export const cartReducer = (
  state = {
    cartItems: [],
    _cartStatus: '',
    onCheck: false,
    cartLength: '',
    weSet: false,
    singlecustomerData: {},
    COD: '',

    onload: false,
    getfirstIndex: '',
    retrievStatus: false,
    couponCode: 0,
    couponId: 0,
    couponAmount: 0,
    cartId: '',
  },
  action,
) => {
  switch (action.type) {
    case CART_ADD_REQSSS:
      return {
        onCheck: true,

        cartItems: [],

        // sessionResponse:'',
      };

    // case CART_ADD:
    //   // const io = action.payload;
    //   // let exist = state.cartItems.find(item =>
    //   //   item.id === io.id ? true : false,
    //   // );

    //   return {

    //     onCheck:false,
    //     // cartItems: exist

    case CART_VIEW_FAIL:
      //   RNRestart.Restart();

      return {
        cartItems: [],
      };

    case CART_VIEW:
      let getLength = action.payload.length;
      //  const io = action.payload;
      // let existQty = state.cartItems.find(item =>
      //   item.products_id === io.products_id ? true : false,
      // );

      //let dcscs = state.cartHolderdata

      return {
        cartItems: action.payload,
        cartId: action.payload[0].customers_basket_id,
        onCheck: false,
        cartLength: getLength,
        _cartStatus: action.payload.success,
      };

    case CART_CLEAR_REQ:
      return {
        onLoad: true,

        cartItems: [],

        // singlecustomerData: { },
      };

    case CART_CLEAR:
      return {
        ...state,
        onLoad: false,
        cartItems: [],
        couponCode: 0,
        couponId: 0,
        couponAmount: 0,

        // singlecustomerData: { },
      };

    case CART_INC:
      const _getcartproduct = action.payload;

      let existProduct = state.cartItems.find(item =>
        item.customers_basket_id === _getcartproduct.customers_basket_id
          ? true
          : false,
      );

      return {
        ...state,
        cartItems: existProduct
          ? state.cartItems.map(item =>
              item.customers_basket_id === _getcartproduct.customers_basket_id
                ? {
                    ...existProduct,
                    customers_basket_quantity:
                      existProduct.customers_basket_quantity + 1,
                  }
                : item,
            )
          : null,
      };

    case CART_DEC:
      const getcartproduct = action.payload;

      let existProductdec = state.cartItems.find(item =>
        item.customers_basket_id === getcartproduct.customers_basket_id
          ? true
          : false,
      );

      return {
        ...state,
        cartItems: existProductdec
          ? state.cartItems.map(item =>
              item.customers_basket_id === getcartproduct.customers_basket_id
                ? {
                    ...existProductdec,
                    customers_basket_quantity:
                      existProductdec.customers_basket_quantity === 1
                        ? 1
                        : existProductdec.customers_basket_quantity - 1,
                  }
                : item,
            )
          : null,
      };

    case CART_DELETE:
      const getcartSingleproduct = action.payload;

      let filterProduct = state.cartItems.filter(
        item =>
          item.customers_basket_id !== getcartSingleproduct.customers_basket_id,
      );

      return {
        ...state,

        cartItems: filterProduct,
      };

    case CUSTOMER_DATA:
      return {
        ...state,

        singlecustomerData: action.payload,
      };

    case COD_ADD:
      return {
        ...state,

        COD: action.payload,
      };

    case COUPON_ADD_REQ:
      return {
        ...state,

        onLoad: true,
      };

    case COUPON_ADD_SUCCESS:
      return {
        ...state,

        onLoad: false,
        couponCode: action.payload.couponCode,
        couponId: action.payload.coupanId,
        couponAmount: action.payload.amount,
      };

    case COUPON_RES_FAIL:
      return {
        ...state,

        onLoad: false,
      };

    default:
      return state;
  }
};
