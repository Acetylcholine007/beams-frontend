import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isReadingsInitialized: false,
    structures: null,
    structure: null,
    node: null,
    readings: [],
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
    realTimeRawReadings2: {
      rawX: [],
      rawY: [],
      rawZ: [],
      rawDatetime: [],
    },
    realTimeFFTReadings2: {
      fftX: [],
      fftY: [],
      fftZ: [],
      fftFrequency: [],
    },
    seconds: 0,
    snapshots: 60,
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
    cleanNode(state) {
      state.node = null;
      state.readings = [];
      state.realTimeRawReadings = [
        { name: "X", data: [] },
        { name: "Y", data: [] },
        { name: "Z", data: [] },
      ];
      state.realTimeFFTReadings = [
        { name: "X", data: [] },
        { name: "Y", data: [] },
        { name: "Z", data: [] },
      ];
      state.realTimeRawReadings2 = {
        rawX: [],
        rawY: [],
        rawZ: [],
        rawDatetime: [],
      };
      state.realTimeFFTReadings2 = {
        fftX: [],
        fftY: [],
        fftZ: [],
        fftFrequency: [],
      };
      state.snapshots = 60;
      state.seconds = 0;
    },
    initializeReadings(state, action) {
      state.readings = action.payload.readings;
      state.datetime = action.payload.datetime;
      state.seconds = action.payload.seconds;
      state.snapshots = action.payload.readings.length;
    },
    setInitialized(state, action) {
      state.isReadingsInitialized = action.payload;
    },
    setStructures(state, action) {
      state.structures = action.payload.structures;
      state.structureTotalItems = action.payload.totalItems;
    },
    setReadings(state, action) {
      state.readings = action.payload.readings;
      state.datetime = action.payload.datetime;
      state.seconds = action.payload.seconds;
      state.snapshots = action.payload.readings.length;
    },
    setDatetime(state, action) {
      state.datetime = action.payload;
    },
    setSeconds(state, action) {
      state.seconds = action.payload;
    },
    setRealTimeRawReadings(state, action) {
      if (state.realTimeRawReadings[0].data.length >= 600) {
        state.realTimeRawReadings[0].data =
          state.realTimeRawReadings[0].data.slice(300);
        state.realTimeRawReadings[0].data = [
          ...state.realTimeRawReadings[0].data,
          ...action.payload.x,
        ];
        state.realTimeRawReadings[1].data =
          state.realTimeRawReadings[1].data.slice(300);
        state.realTimeRawReadings[1].data = [
          ...state.realTimeRawReadings[1].data,
          ...action.payload.y,
        ];
        state.realTimeRawReadings[2].data =
          state.realTimeRawReadings[2].data.slice(300);
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

    setRealTimeRawReadings2(state, action) {
      if (state.realTimeRawReadings2.rawDatetime.length >= 100) {
        state.realTimeRawReadings2.rawDatetime =
          state.realTimeRawReadings2.rawDatetime.slice(10);
        state.realTimeRawReadings2.rawDatetime = [
          ...state.realTimeRawReadings2.rawDatetime,
          ...action.payload.rawDatetime,
        ];
        state.realTimeRawReadings2.rawX =
          state.realTimeRawReadings2.rawX.slice(10);
        state.realTimeRawReadings2.rawX = [
          ...state.realTimeRawReadings2.rawX,
          ...action.payload.rawX,
        ];
        state.realTimeRawReadings2.rawY =
          state.realTimeRawReadings2.rawY.slice(10);
        state.realTimeRawReadings2.rawY = [
          ...state.realTimeRawReadings2.rawY,
          ...action.payload.rawY,
        ];
        state.realTimeRawReadings2.rawZ =
          state.realTimeRawReadings2.rawZ.slice(10);
        state.realTimeRawReadings2.rawZ = [
          ...state.realTimeRawReadings2.rawZ,
          ...action.payload.rawZ,
        ];
      } else {
        state.realTimeRawReadings2.rawDatetime = [
          ...state.realTimeRawReadings2.rawDatetime,
          ...action.payload.rawDatetime,
        ];
        state.realTimeRawReadings2.rawX = [
          ...state.realTimeRawReadings2.rawX,
          ...action.payload.rawX,
        ];
        state.realTimeRawReadings2.rawY = [
          ...state.realTimeRawReadings2.rawY,
          ...action.payload.rawY,
        ];
        state.realTimeRawReadings2.rawZ = [
          ...state.realTimeRawReadings2.rawZ,
          ...action.payload.rawZ,
        ];
      }
    },
    setRealTimeFFTReadings2(state, action) {
      state.realTimeFFTReadings2.fftFrequency = action.payload.fftFrequency;
      state.realTimeFFTReadings2.fftX = action.payload.fftX;
      state.realTimeFFTReadings2.fftY = action.payload.fftY;
      state.realTimeFFTReadings2.fftZ = action.payload.fftZ;
    },
    setStructurePagePage(state, action) {
      state.structurePage = action.payload;
    },
    setNodePage(state, action) {
      state.nodePage = action.payload;
    },
    setStructureQuery(state, action) {
      state.structurePage = 1;
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
    deleteNode(state, action) {
      state.structure.nodes = state.structure.nodes.filter(
        (node) => node._id !== action.payload
      );
    },
    addNode(state, action) {
      state.structure.nodes.push(action.payload);
    },
    editNode(state, action) {
      state.node.name = action.payload.name;
      state.node.description = action.payload.description;
      state.node.serialKey = action.payload.serialKey;
      state.node.imageUri = action.payload.imageUri;
      state.node.saveMode = action.payload.saveMode;

      const node = state.structure.nodes.find(
        (node) => node._id === action.payload._id
      );
      node.name = action.payload.name;
      node.description = action.payload.description;
      node.serialKey = action.payload.serialKey;
      node.imageUri = action.payload.imageUri;
      node.saveMode = action.payload.saveMode;
    },
    editStructure(state, action) {
      state.structure.name = action.payload.name;
      state.structure.description = action.payload.description;
      state.structure.location = action.payload.location;
      state.structure.imageUri = action.payload.imageUri;

      const structure = state.structures.find(
        (structure) => structure._id === action.payload._id
      );
      structure.name = action.payload.name;
      structure.description = action.payload.description;
      structure.location = action.payload.location;
      structure.imageUri = action.payload.imageUri;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice;
