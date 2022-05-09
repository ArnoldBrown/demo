//import {boolean} from 'yup';
import {OPTION_LIST_REQ,
    OPTION_LIST_SUCCESS,
    OPTION_LIST_FAIL,} from '../action/Constant';


    ///setoptionNamearray(data.data);
 //   setoptionName(data.data[0].options_name);
   // setoptionNameid(data.data[0].products_options_id);
    // let firstIndexid = data.data[0].products_options_id;
    // getOptionValuelists(firstIndexid);


    

function optionlistReducer(
  state = {optionlistArray: [],setoptionName:" " ,setoptionNameid:"",firstIndexid:""  },
  action,
) {
  switch (action.type) {


    case OPTION_LIST_REQ:
      
      return {
        optionlistArray:[ ]
       
      };

    case OPTION_LIST_SUCCESS:
     
      return {
        optionlistArray: action.payload,
        setoptionName:  action.payload[0].options_name,
        setoptionNameid: action.payload[0].products_options_id,
        //firstIndexid: action.payload[0].products_options_id,
        
       
      };

      case OPTION_LIST_FAIL:
        
        return {
            optionlistArray: []
        
        };

    default:
      return state;
  }
}




export {optionlistReducer};
