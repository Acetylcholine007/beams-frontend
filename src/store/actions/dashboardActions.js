import StructureAPI from "../../shared/apis/StructureAPI";
import NodeAPI from "../../shared/apis/NodeAPI";
import { dashboardActions } from "../slices/DashboardSlice";
import { feedbackActions } from "../slices/FeedbackSlice";
import ReadingAPI from "../../shared/apis/ReadingAPI";
import { DateTime } from "luxon";

export const fetchStructures = (query, page, queryTarget) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await StructureAPI.getStructures(query, page, queryTarget);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      dispatch(
        dashboardActions.setStructures({
          structures: response.structures,
          totalItems: response.totalItems,
        })
      );
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
  };
};

export const fetchReadings = (datetime, serialKey) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const jsDate = new Date(datetime);
    const response = await ReadingAPI.getReading(
      jsDate.toISOString(),
      serialKey
    );
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      console.log(response.readings)
      let datetime = null;
      if (response.readings.length !== 0) {
        const jsDatetime = new Date(response.readings[0].rawDatetime[0]);
        datetime = DateTime.fromJSDate(jsDatetime);
      }
      dispatch(
        dashboardActions.setReadings({
          readings: response.readings,
          seconds: 0,
          datetime,
        })
      );
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
  };
};

export const fetchNode = (nodeId) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await NodeAPI.getNode(nodeId);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      let datetime = null;
      if (response.readings.length !== 0) {
        const jsDatetime = new Date(response.readings[0].rawDatetime[0]);
        datetime = DateTime.fromJSDate(jsDatetime);
      }
      dispatch(
        dashboardActions.initializeReadings({
          readings: response.readings,
          seconds: 0,
          datetime,
        })
      );
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
  };
};

export const saveNode = () => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await NodeAPI.getNode(nodeId);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
  };
};

export const deleteNode = (nodeId, navigate) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await NodeAPI.getNode(nodeId);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      navigate(-1);
      dispatch(dashboardActions.setSelectedNode(null));
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
  };
};

export const saveStructure = () => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await NodeAPI.getNode(nodeId);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
  };
};

export const deleteStructure = (structureId, navigate) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await StructureAPI.deleteStructure(structureId);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      navigate(-1);
      dispatch(dashboardActions.setSelectedStructure(null));
    } else {
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: response.data.message,
          isShowSnackbar: true,
          severity: "error",
        })
      );
    }
  };
};
