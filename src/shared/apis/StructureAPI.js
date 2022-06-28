import requestAxios from "../../utils/requestAxios";

const getStructures = async (query, page, queryTarget) => {
  return await requestAxios(
    `/structures?query=${query}&page=${page}&target=${queryTarget.toLowerCase()}`
  );
};

const getStructure = async (structureId) => {
  return await requestAxios(`/structures/${structureId}`);
};

const createStructure = async (data) => {
  return await requestAxios(`/structures`, data, "POST");
};

const patchStructure = async (structureId, data) => {
  return await requestAxios(`/structures/${structureId}`, data, "PATCH");
};

const deleteStructure = async (structureId) => {
  return await requestAxios(`/structures/${structureId}`, {}, "DELETE");
};

const StructureAPI = {
  getStructures,
  getStructure,
  createStructure,
  patchStructure,
  deleteStructure,
};

export default StructureAPI;
