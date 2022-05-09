//import {boolean} from 'yup';
import  {GALLERY_IMG_VIEW ,GALLERY_UPLOAD} from '../action/Constant';

function gallerydataReducer(

  state = {galleryArray: [ ]  ,firstIndex:''},
  action,
) {
  switch (action.type) {
    case GALLERY_IMG_VIEW:

    console.log(action.payload[0])

    return {

        galleryArray: action.payload,

        firstIndex:action.payload[0]


       
      };

    default:
      return state; 
  }
}






export {gallerydataReducer};
