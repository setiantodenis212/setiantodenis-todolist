import update from "immutability-helper";
import {
  ACTIVITY,
  ADD_ACTIVITY,
  ADD_CARDTODO,
  DELETE_ACTIVITY,
  DELETE_CARDTODO,
  DETAIL_ACTIVITY,
  UPDATE_ACTIVITY,
  UPDATE_CARDTODO,
} from "../types";

const initState = {
  activity: [],
  detail: {},
};

const activityReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIVITY:
      return update(state, { activity: { $set: action.payload } });

    case ADD_ACTIVITY:
      return update(state, {
        activity: { $set: [action.payload, ...state.activity] },
      });

    case DELETE_ACTIVITY:
      return update(state, {
        activity: {
          $set: state.activity.filter((item) => item?.id !== action.payload),
        },
      });

    case DETAIL_ACTIVITY:
      return update(state, {
        detail: { $set: action.payload },
      });

    case UPDATE_ACTIVITY:
      return update(state, {
        detail: { $set: { ...state.detail, title: action.payload } },
      });

    case ADD_CARDTODO:
      return update(state, {
        detail: {
          todo_items: { $set: [action.payload, ...state.detail?.todo_items] },
        },
      });

    case UPDATE_CARDTODO:
      const stateChange = [...state.detail?.todo_items];
      stateChange[action.payload.index] = action.payload.data;
      return update(state, {
        detail: {
          todo_items: { $set: stateChange },
        },
      });

    case DELETE_CARDTODO:
      console.log(1);
      return update(state, {
        detail: {
          todo_items: {
            $set: state.detail?.todo_items?.filter(
              (item) => item?.id !== action.payload
            ),
          },
        },
      });

    default:
      return state;
  }
};

export default activityReducer;
