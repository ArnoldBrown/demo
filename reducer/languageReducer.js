//import {boolean} from 'yup';
import {
  LANGUAGE_REQ,
  LANGUAGE_SUCCESS,
  LANGUAGE_FAIL,
  SELECT_LANGUAGE,
} from '../action/Constant';

function languageReducer(
  state = {loader: false, locale: [], languageId:1 },
  action,
) {
  switch (action.type) {
    case LANGUAGE_REQ:
      return {
        loader: true,
        locale: [],
        languageId: '',
      };

    case LANGUAGE_SUCCESS:
      return {
        loader: false,
        locale: action.payload,
        languageId: action.payload[0].languages_id,
      };

    case LANGUAGE_FAIL:
      return {
        loader: false,
        locale: [],
        languageId: '',
      };

    case SELECT_LANGUAGE:
      const getItem = action.payload;

      let setItem = state.locale.find(
        item => item.languages_id === getItem.languages_id,
      );

      return {
        ...state,
        languageId: setItem.languages_id,
      };

    default:
      return state;
  }
}

export {languageReducer};
