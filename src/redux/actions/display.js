import { MODAL_MESSAGE } from "../types";

export const setModalMsg = (show, message, type) => (dispatch) => {
  dispatch({ type: MODAL_MESSAGE, payload: { show, message, type } });
};
