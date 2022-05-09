//import {boolean} from 'yup';
import {
   SETTING_REQ ,SETTING_FAIL ,SETTING_SUCCESS
  } from '../action/Constant';
  
  
  function settingReducer(state = {appSettings:{} ,settingsloader:false}, action) {
    switch (action.type) {
      case SETTING_REQ:




        return {
            settingsloader:true,
            appSettings:{}
         

        };

        case SETTING_SUCCESS:



            return {
              settingsloader:false,
                appSettings:action.payload
    
            };

            case SETTING_FAIL:
                return {
        
                    settingsloader:false,
                    appSettings:{ }
        
                };

  
      
      default:
        return state;
    }
  }
  
  export {settingReducer};
  