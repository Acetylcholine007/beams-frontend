import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    structures: null,
    structure: null,
    node: null,
    readings: {},
    realTimeRawReadings: [
      { name: "X", data: [] },
      { name: "Y", data: [] },
      { name: "Z", data: [] },
    ],
    realTimeFFTReadings: [
      { name: "X", data: [] },
      { name: "Y", data: [] },
      { name: "Z", data: [] },
    ],
    seconds: 0,
    datetime: null,
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
      state.readings = action.payload.readings;
      state.datetime = action.payload.datetime;
      state.seconds = action.payload.seconds;
    },
    setDatetime(state, action) {
      state.datetime = action.payload;
    },
    setSeconds(state, action) {
      state.seconds = action.payload;
    },
    setRealTimeRawReadings(state, action) {
      if (state.realTimeRawReadings[0].data.length >= 500) {
        state.realTimeRawReadings[0].data =
          state.realTimeRawReadings[0].data.slice(400);
        state.realTimeRawReadings[0].data = [
          ...state.realTimeRawReadings[0].data,
          ...action.payload.x,
        ];
        state.realTimeRawReadings[1].data =
          state.realTimeRawReadings[1].data.slice(400);
        state.realTimeRawReadings[1].data = [
          ...state.realTimeRawReadings[1].data,
          ...action.payload.y,
        ];
        state.realTimeRawReadings[2].data =
          state.realTimeRawReadings[2].data.slice(400);
        state.realTimeRawReadings[2].data = [
          ...state.realTimeRawReadings[2].data,
          ...action.payload.z,
        ];
      } else {
        state.realTimeRawReadings[0].data = [
          ...state.realTimeRawReadings[0].data,
          ...action.payload.x,
        ];
        state.realTimeRawReadings[1].data = [
          ...state.realTimeRawReadings[1].data,
          ...action.payload.y,
        ];
        state.realTimeRawReadings[2].data = [
          ...state.realTimeRawReadings[2].data,
          ...action.payload.z,
        ];
      }
    },
    setRealTimeFFTReadings(state, action) {
      state.realTimeFFTReadings[0].data = action.payload.x;
      state.realTimeFFTReadings[1].data = action.payload.y;
      state.realTimeFFTReadings[2].data = action.payload.z;
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
