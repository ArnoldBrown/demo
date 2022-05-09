import {loginReducer} from '../reducer/loginReducer'
import {cartReducer} from '../reducer/cartReducer'
import {categorylistReducer} from '../reducer/categorylistReducer'
import {productReducer} from '../reducer/productReducer'
import {viewcategorylistReducer} from '../reducer/categorylistReducer'
import {manufacturelistReducer} from '../reducer/manufacturelistReducer'
import {taxlistReducer} from '../reducer/taxlistReducer'
import {gallerydataReducer} from '../reducer/galleryReducer'
import {deleteOptionreducer} from '../reducer/deletoptionReducer'
import {deleteCustomerReducer} from '../reducer/deleteCustomerReducer'
import {edituserReducer} from '../reducer/edituserReducer'
import {sessionReducer} from '../reducer/sessionReducer'

import {drawerViewreducer} from '../reducer/drawerReducer'


import {drawerOpenstatus} from '../reducer/drawerOpenstatus'



import {categorywiseproductReducer} from '../reducer/categorywiseproductReducer'


import {cancelBillreducer} from '../reducer/cancelBillreducer'
import {settingReducer} from '../reducer/settingReducer'




import {manageReducer} from '../reducer/manageReducer'



import {languageReducer} from '../reducer/languageReducer'

import {currencyReducer} from '../reducer/currencyReducer'


import {customerListreducer} from '../reducer/customerListreducer'

import {purchaselistReducer} from  '../reducer/purchaselistReducer'

import {optionlistReducer} from  '../reducer/optionlistReducer'

import {combineReducers} from 'redux';

import {holdReducer}  from '../reducer/holdReducer'
import {shopnameReducer}  from '../reducer/shopnameReducer'

import {guestReducer}  from '../reducer/guestReducer'











const reducer = combineReducers({

    loginReducer:loginReducer,
    cartReducer,
    categorylistReducer:categorylistReducer,
    productReducer:productReducer,
    viewcategorylistReducer:viewcategorylistReducer,
    manufacturelistReducer:manufacturelistReducer,
    taxlistReducer:taxlistReducer,
    gallerydataReducer:gallerydataReducer,
    deleteOptionreducer,
    deleteCustomerReducer,
    edituserReducer,
    sessionReducer,
    drawerViewreducer,
    categorywiseproductReducer,
    cancelBillreducer,
    settingReducer,
    manageReducer,
    languageReducer,
    currencyReducer,
    customerListreducer,

    purchaselistReducer,

    optionlistReducer,


    holdReducer,drawerOpenstatus,shopnameReducer ,guestReducer

})

export default reducer;
