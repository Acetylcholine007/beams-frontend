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
      console.log(response.readings);
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

export const saveNode = (isNew, node) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    let response;
    if (isNew) {
      response = await NodeAPI.postNode(node);
    } else {
      response = await NodeAPI.patchNode(node._id, node);
    }
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      if (isNew) {
        dispatch(dashboardActions.addNode(response.node));
        dispatch(
          feedbackActions.setNotification({
            snackbarMessage: "Node added",
            isShowSnackbar: true,
            severity: "success",
          })
        );
      } else {
        dispatch(dashboardActions.editNode(response.node));
        dispatch(
          feedbackActions.setNotification({
            snackbarMessage: "Node edited",
            isShowSnackbar: true,
            severity: "success",
          })
        );
      }
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
    const response = await NodeAPI.deleteNode(nodeId);
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      navigate(-1);
      dispatch(dashboardActions.deleteNode(nodeId));
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: "Node deleted",
          isShowSnackbar: true,
          severity: "success",
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

export const saveStructure = (isNew, structure, navigate) => {
  return async (dispatch) => {
    dispatch(feedbackActions.setLoading(true));
    let response;
    if (isNew) {
      response = await StructureAPI.createStructure(structure);
    } else {
      response = await StructureAPI.patchStructure(structure._id, structure);
    }
    dispatch(feedbackActions.setLoading(false));
    if (response.status === 200) {
      if (isNew) {
        dispatch(fetchStructures("", 1, "name"));
        navigate("/");
        dispatch(
          feedbackActions.setNotification({
            snackbarMessage: "Structure added",
            isShowSnackbar: true,
            severity: "success",
          })
        );
      } else {
        dispatch(dashboardActions.editStructure(response.structure));
        dispatch(
          feedbackActions.setNotification({
            snackbarMessage: "Structure edited",
            isShowSnackbar: true,
            severity: "success",
          })
        );
      }
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
      dispatch(
        feedbackActions.setNotification({
          snackbarMessage: "Structure deleted",
          isShowSnackbar: true,
          severity: "success",
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
