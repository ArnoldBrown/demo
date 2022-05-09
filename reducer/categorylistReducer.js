//import {boolean} from 'yup';
import { act } from 'react-test-renderer';
import {CATEGORY_LIST_ACTION ,ALL_CATEGORY ,SINGLE_CAT_ID ,CATEGORY_LIST_REQ ,CATEGORY_LIST_ID} from '../action/Constant';

function categorylistReducer(
  state = {categoryarray: [], setcatId: ''},
  action,
) {

  switch (action.type) {


    case CATEGORY_LIST_REQ:
    
      return {

        categoryarray: [ ]
      
      };




    case CATEGORY_LIST_ACTION:
     
      getcatId = action.payload[0].categories_id;

      return {
        categoryarray: action.payload,
        setcatId: getcatId,
      };


      case CATEGORY_LIST_ID:

        return {
        
          setcatId: action.payload,

          categoryarray :state.categoryarray



        };


      



    default:
      return state;
  }
}



function viewcategorylistReducer(

  state = {viewallCatitems: [ ]  , initialId: null     },
  action,
) {
  switch (action.type) {
    case ALL_CATEGORY:
      // console.log(action.payload)
    

      return {
        viewallCatitems: action.payload,
        initialId :action.payload[0].categories_id

      
      };
     
  

      







    default:
      return state;
  }
}




export {categorylistReducer ,viewcategorylistReducer};
