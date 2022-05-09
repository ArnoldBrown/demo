//import {boolean} from 'yup';
import {
    CURRENCY_REQ,
    CURRENCY_SUCCESS,
    CURRENCY_FAIL,
    SELECT_CURRENCY,
  } from '../action/Constant';
  
  function currencyReducer(
    state = {loader: false, locales: [], currencyId: '', currencyCode:'MYR' ,symbol:"RM"},
    action,
  ) {
    switch (action.type) {
      case CURRENCY_REQ:
        return {
          loader: true,
          locales: [],
          currencyId: ' ',
          currencyCode:"",
          symbol:""
          

        };
  
      case CURRENCY_SUCCESS:
        return {
          loader: false,
          locales: action.payload,
          currencyId: action.payload[0].id,
          currencyCode:action.payload[0].code,
          symbol:action.payload[0].symbol_left,
        };
  
      case CURRENCY_FAIL:
        return {
          loader: false,
          locales: [],
          currencyId: '',
          currencyCode:''
        };
  
      case SELECT_CURRENCY:
        const getItem = action.payload;
  
        let setItem = state.locales.find(
          item => item.id === getItem.id,
        );
  
        return {
          ...state,
          currencyId: setItem.id,
          currencyCode:setItem.code,
          symbol:setItem.symbol_left,

        };
  
      default:
        return state;
    }
  }
  
  export {currencyReducer};
  