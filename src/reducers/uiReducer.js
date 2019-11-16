import { UI_LOADING_INIT, UI_LOADING_COMPLETE } from "../actions/types";

const initialState = {
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UI_LOADING_INIT:
      return {
        ...state,
        isLoading: true
      };
    case UI_LOADING_COMPLETE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
