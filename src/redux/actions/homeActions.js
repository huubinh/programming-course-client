import { getData } from "../../utils/fecthData";
import {
  HOME_LIST_FAIL,
  HOME_LIST_REQUEST,
  HOME_LIST_SUCCESS,
} from "../constants/homeConstants";

export const getHomeList = () => async (dispatch) => {
  dispatch({
    type: HOME_LIST_REQUEST,
  });
  try {
    const courses = await getData("course");

    dispatch({
      type: HOME_LIST_SUCCESS,
      payload: {
        courses: [...courses],
      },
    });
  } catch (error) {
    dispatch({
      type: HOME_LIST_FAIL,
      payload: error.message,
    });
  }
};
