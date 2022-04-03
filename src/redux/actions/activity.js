import axios, { route } from "../../utils/api";
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
import { setModalMsg } from "./display";

const { activity, todolist } = route;

export const getActivities = () => async (dispatch) => {
  try {
    const response = await axios.get(activity.list);
    if (response.status === 200)
      dispatch({ type: ACTIVITY, payload: response?.data?.data });
  } catch (_) {
    dispatch(setModalMsg(true, "Gagal fetching data...", 0));
  }
};

export const addActivity = () => async (dispatch) => {
  try {
    const postData = {
      title: "New Activity",
      email: "denis.setianto@gmail.com",
    };
    const response = await axios.post(activity.create, postData);
    if (response?.status === 201) {
      dispatch({
        type: ADD_ACTIVITY,
        payload: response?.data,
      });
      dispatch(getActivities());
    }
  } catch (_) {
    dispatch(getActivities());
    dispatch(setModalMsg(true, "Gagal menambahkan data...", 0));
  }
};

export const deleteActivity = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ACTIVITY, payload: id });
  dispatch(setModalMsg(true, "Activity berhasil dihapus", 1));
  try {
    await axios.delete(activity.remove(id));
  } catch (_) {
    dispatch(getActivities());
    dispatch(setModalMsg(true, "Gagal menghapus data...", 0));
  }
};

export const getActivity =
  (id, first = false) =>
  async (dispatch) => {
    if (first) dispatch({ type: DETAIL_ACTIVITY, payload: {} });

    try {
      const response = await axios.get(activity.detail(id));
      if (response.status === 200)
        dispatch({ type: DETAIL_ACTIVITY, payload: response?.data });

      return true;
    } catch (_) {
      dispatch(setModalMsg(true, "Gagal fetching data...", 0));

      return false;
    }
  };

export const updateActivity = (id, title) => async (dispatch) => {
  dispatch({ type: UPDATE_ACTIVITY, payload: title });
  try {
    await axios.patch(activity.update(id), { title });
  } catch (_) {
    dispatch(getActivity(id));
    dispatch(setModalMsg(true, "Gagal update data...", 0));
  }
};

export const addCardTodo = (id, postData) => async (dispatch) => {
  try {
    const response = await axios.post(todolist.create, postData);
    if (response?.status === 201) {
      dispatch({ type: ADD_CARDTODO, payload: response?.data });
    }
  } catch (_) {
    dispatch(getActivity(id));
    dispatch(setModalMsg(true, "Gagal fetching data...", 0));
  }
};

export const updateCardTodo = (id, patchData, index) => async (dispatch) => {
  dispatch({ type: UPDATE_CARDTODO, payload: { data: patchData, index } });
  try {
    await axios.patch(todolist.update(patchData?.id), patchData);
  } catch (_) {
    dispatch(getActivity(id));
    dispatch(setModalMsg(true, "Gagal update data...", 0));
  }
};

export const deleteCardTodo = (id, childId) => async (dispatch) => {
  dispatch({ type: DELETE_CARDTODO, payload: childId });
  dispatch(setModalMsg(true, "Todo List berhasil dihapus", 1));
  try {
    await axios.delete(todolist.remove(childId));
  } catch (_) {
    dispatch(getActivity(id));
    dispatch(setModalMsg(true, "Gagal delete data...", 0));
  }
};
