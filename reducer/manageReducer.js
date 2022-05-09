//import {boolean} from 'yup';
import {
    POS_ADMIN_FAIL ,POS_ADMIN_REQ,POS_ADMIN_SUCCESS
   } from '../action/Constant';
   
   
   function manageReducer(state = {adminRole: [] ,loader:false ,what2:[ ] ,roleList:{}}, action) {
     switch (action.type) {
       case POS_ADMIN_REQ:
 
         return {
            loader:true,
            roleList:{ },
 
         };
 
         case POS_ADMIN_SUCCESS:
 let io = action.payload

 let iooo = []

 iooo.push(io)

 

 
             return {
                 ...state,
                loader:false,
                adminRole:[...iooo],
                roleList:action.payload
          
             
     
             };
 
           
   
       
       default:
         return state;
     }
   }
   
   export {manageReducer};
   