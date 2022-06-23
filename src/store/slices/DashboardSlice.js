import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    structures: null,
    structure: null,
    node: null,
    readings: {},
    structurePage: 1,
    nodePage: 1,
    structureTotalItems: 0,
    nodeTotalItems: 0,
    structureQuery: "",
    nodeQuery: "",
    structureQueryTarget: "name",
    nodeQueryTarget: "name",
  },
  reducers: {
    setStructures(state, action) {
      state.structures = action.payload.structures;
      state.structureTotalItems = action.payload.totalItems;
    },
    setReadings(state, action) {
      state.readings = action.payload;
    },
    setStructurePagePage(state, action) {
      state.structurePage = action.payload;
    },
    setNodePage(state, action) {
      state.nodePage = action.payload;
    },
    setStructureTotalItems(state, action) {
      state.structureTotalItems = action.payload;
    },
    setNodeTotalItems(state, action) {
      state.nodeTotalItems = action.payload;
    },
    setStructureQuery(state, action) {
      state.structureQuery = action.payload;
    },
    setNodeQuery(state, action) {
      state.nodeQuery = action.payload;
    },
    setStructureQueryTarget(state, action) {
      state.structureQueryTarget = action.payload;
    },
    setNodeQueryTarget(state, action) {
      state.nodeQueryTarget = action.payload;
    },
    setSelectedStructure(state, action) {
      state.structure = action.payload;
    },
    setSelectedNode(state, action) {
      state.node = action.payload;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice;
