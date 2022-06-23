import requestAxios from "../../utils/requestAxios";

const getNodes = async (query, page, queryTarget) => {
  return await requestAxios(
    `/nodes?query=${query}&page=${page}&target=${queryTarget.toLowerCase()}`
  );
};

const getNode = async (nodeId) => {
  return await requestAxios(`/nodes/${nodeId}`);
};

const postNode = async (data) => {
  return await requestAxios(`/nodes`, data, "POST");
};

const patchNode = async (nodeId, data) => {
  return await requestAxios(`/nodes/${nodeId}`, data, "PATCH");
};

const deleteNode = async (nodeId) => {
  return await requestAxios(`/nodes/${nodeId}`, {}, "DELETE");
};

const NodeAPI = {
  getNodes,
  getNode,
  postNode,
  patchNode,
  deleteNode,
};

export default NodeAPI;
