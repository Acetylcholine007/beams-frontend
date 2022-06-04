import requestAxios from "../../utils/requestAxios";

const getNodes = async (loadingDispatch, snackbarDispatch, callback) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(`/nodes`);
  if (response.status === 200) {
    callback(response.nodes);
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to fetch nodes",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const getNode = async (loadingDispatch, snackbarDispatch, callback, nodeId) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(`/nodes/${nodeId}`);
  if (response.status === 200) {
    callback(response);
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to get Node",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const postNode = async (loadingDispatch, snackbarDispatch, callback, data) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(`/nodes`, data, "POST");
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Node added",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to Add Node",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const patchNode = async (
  loadingDispatch,
  snackbarDispatch,
  callback,
  nodeId,
  data
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(`/nodes/${nodeId}`, data, "PATCH");
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Node Edited",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to Edit Node",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const deleteNode = async (
  loadingDispatch,
  snackbarDispatch,
  callback,
  nodeId
) => {
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: true } });
  let response = await requestAxios(`/nodes/${nodeId}`, {}, "DELETE");
  if (response.status === 200) {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Node deleted",
        isOpen: true,
        severity: "success",
      },
    });
    callback();
  } else {
    snackbarDispatch({
      type: "SET_PARAMS",
      payload: {
        message: "Failed to Delete Node",
        isOpen: true,
        severity: "error",
      },
    });
  }
  loadingDispatch({ type: "SET_PARAMS", payload: { isOpen: false } });
};

const NodeAPI = {
  getNodes,
  getNode,
  postNode,
  patchNode,
  deleteNode,
};

export default NodeAPI;
