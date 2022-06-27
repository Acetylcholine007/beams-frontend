import StructureAPI from "../../shared/apis/StructureAPI";
import NodeAPI from "../../shared/apis/NodeAPI";
import { dashboardActions } from "../slices/DashboardSlice";
import { feedbackActions } from "../slices/FeedbackSlice";
import ReadingAPI from "../../shared/apis/ReadingAPI";

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

export const fetchReadings = (datetime) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    const response = await ReadingAPI.getReading(datetime);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      const newReadings =
        response.readings.length !== 0
          ? response.readings.reduce((a, b) => ({
              rawX: [...a.rawX, ...b.rawX],
              rawY: [...a.rawY, ...b.rawY],
              rawZ: [...a.rawZ, ...b.rawZ],
              fftX: [...a.fftX, ...b.fftX],
              fftY: [...a.fftY, ...b.fftY],
              fftZ: [...a.fftZ, ...b.fftZ],
              rawDatetime: [...a.rawDatetime, ...b.rawDatetime],
              fftFrequency: [...a.fftFrequency, ...b.fftFrequency],
            }))
          : {
              rawX: [],
              rawY: [],
              rawZ: [],
              fftX: [],
              fftY: [],
              fftZ: [],
              rawDatetime: [],
              fftFrequency: [],
            };
      dispatch(
        dashboardActions.setReadings({
          readings: newReadings,
          seconds: 0,
          datetime: null,
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
      const newReadings =
        response.readings.length !== 0
          ? response.readings.reduce((a, b) => ({
              rawX: [...a.rawX, ...b.rawX],
              rawY: [...a.rawY, ...b.rawY],
              rawZ: [...a.rawZ, ...b.rawZ],
              fftX: [...a.fftX, ...b.fftX],
              fftY: [...a.fftY, ...b.fftY],
              fftZ: [...a.fftZ, ...b.fftZ],
              rawDatetime: [...a.rawDatetime, ...b.rawDatetime],
              fftFrequency: [...a.fftFrequency, ...b.fftFrequency],
            }))
          : {
              rawX: [],
              rawY: [],
              rawZ: [],
              fftX: [],
              fftY: [],
              fftZ: [],
              rawDatetime: [],
              fftFrequency: [],
            };
      dispatch(
        dashboardActions.setReadings({
          readings: newReadings,
          seconds: 0,
          datetime: null,
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
