import { TOGGLED_NAV } from "../actions/types";

export const toggleNav = () => dispatch => {
  dispatch({
    type: TOGGLED_NAV
  });
};
