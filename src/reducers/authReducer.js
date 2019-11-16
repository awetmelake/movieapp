import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNUP_ERROR
} from "../actions/types";

const initialState = {
  authError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return { ...state, authError: "login failed" };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: null
      };
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        authError: null
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        authError: action.payload
      };
    default:
      return state;
  }
};
