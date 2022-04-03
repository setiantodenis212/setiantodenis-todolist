import update from "immutability-helper";
import { MODAL_MESSAGE } from "../types";

const initState = {
  modal_msg: {
    show: false,
    message: "",
    type: 1,
  },
};

const activityReducer = (state = initState, action) => {
  switch (action.type) {
    case MODAL_MESSAGE:
      return update(state, { modal_msg: { $set: { ...action.payload } } });

    default:
      return state;
  }
};

export default activityReducer;
