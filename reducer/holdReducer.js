import {
  CART_HOLD_SUCCESS,
  CART_HOLD_REQ,
  CART_HOLD_FAIL,
  HOLD_LIST_SUCCESS,
  HOLD_LIST_REQ,
  HOLD_LIST_FAIL,
  CART_HOLD_DTSUCCESS,
  CART_HOLD_DTREQ,
  CART_HOLD_DTFAIL,
  CART_HOLD_RETRIEV_REQ,
  CART_HOLD_RETRIEV_SUCCESS,
  CART_HOLD_RETRIEV_FAIL,
  RETRIEV_DEL_SUCCESS,
} from '../action/Constant';

export const holdReducer = (
  state = {
    cartHolderdata: [],
    cartholderDetail: [],
    onload: false,
    cartHoldloader:false,
    getfirstIndex: '',
    retrievStatus: false,
    retrievSuccess:" ",
    holdResponse :0 
  },
  action,
) => {
  switch (action.type) {
    case CART_HOLD_REQ:
      return {
        ...state,
        cartHoldloader:true,
        holdResponse :0 
        //sessionResponse:''
      };

    case CART_HOLD_SUCCESS:
      return {
        ...state,
        cartHoldloader:false,
        holdResponse :1,
        
        

      };

    case HOLD_LIST_REQ:
      return {
        ...state,
        onload: true,
        cartHolderdata: [],
        cartholderDetail: [],
      };

    case HOLD_LIST_SUCCESS:
 
    //  console.log('HOLD_LIST_SUCCESSHOLD_LIST_SUCCESS',action.payload)

      return {
        ...state,

        onload: false,

        cartHolderdata: action.payload,

        getfirstIndex:  action.payload[0].id,

        //cartholderDetail:[ ],
      };

    case HOLD_LIST_FAIL:
      return {
        ...state,
        onload: false,
        cartHolderdata: [],
        getfirstIndex: '',
        cartholderDetail: [],
      };

    case CART_HOLD_DTREQ:
      return {
        ...state,

        cartHoldloader: true,
      };

    case CART_HOLD_DTSUCCESS:
      return {
        ...state,
        cartHoldloader: false,

        cartholderDetail: action.payload,
      };

    case CART_HOLD_DTFAIL:
      return {
        ...state,

        cartHoldloader: false,

        cartholderDetail: [],

        //cartHolderdata: [],
      };


      case RETRIEV_DEL_SUCCESS:

        return {
          ...state,
          
          retrievSuccess: action.payload3
        };
     


    case RETRIEV_DEL_SUCCESS:

      const xxxx = action.payload;
      const uio =action.payload3;
      console.log(uio)

      let x333 = state.cartHolderdata.filter(item => item.id !== xxxx);

      const xxx33x = action.payload;

      let x3338 = state.cartholderDetail.filter(
        item => item.hold_id !== xxx33x,
      );

      return {
        ...state,
        cartHolderdata: x333,
        cartholderDetail: x3338,
        retrievSuccess:uio
      };



    case CART_HOLD_RETRIEV_REQ:
      return {
        ...state,

        retrievStatus: true,
      };

    case CART_HOLD_RETRIEV_SUCCESS:
      const retrievSuccessId = action.payload;

      let holdResponse = state.cartHolderdata.filter(
        item => item.hold_by !== retrievSuccessId,
      );

      return {
        ...state,
        retrievStatus: false,
        cartHolderdata: holdResponse,
        cartholderDetail: [],
      };

    default:
      return state;
  }
};
