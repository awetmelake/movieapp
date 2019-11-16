import { FETCHED_SEARCH } from "../actions/types";

const initialState = {
  Search: [],
  totalResults: 0,
  Response: "False"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_SEARCH:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
