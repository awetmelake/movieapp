import { TOGGLED_NAV } from "../actions/types";

const initialState = {
  full: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLED_NAV:
      return {
        full: !state.full
      };
    default:
      return state;
  }
};
