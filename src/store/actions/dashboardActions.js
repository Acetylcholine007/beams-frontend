import StructureAPI from "../../shared/apis/StructureAPI";
import NodeAPI from "../../shared/apis/NodeAPI";
import { dashboardActions } from "../slices/DashboardSlice";
import { feedbackActions } from "../slices/FeedbackSlice";

// export const initializePage = (query, page, queryTarget) => {
//   return async (dispatch) => {
//     dispatch(feedbackActions.setLoading(true));
//     const getTagTask = TagAPI.getTags();
//     const getBusinessTask = BusinessAPI.getBusinesses(
//       query,
//       page,
//       queryTarget,
//       "Business"
//     );
//     const getUserTask = UserAPI.getUsers(query, page, queryTarget);
//     const tagResponse = await getTagTask;
//     const businessResponse = await getBusinessTask;
//     const userResponse = await getUserTask;
//     dispatch(feedbackActions.setLoading(false));
//     if (
//       tagResponse.status === 200 &&
//       businessResponse.status === 200 &&
//       userResponse.status === 200
//     ) {
//       dispatch(
//         dashboardActions.initializePage({
//           tags: tagResponse.tags,
//           businesses: businessResponse.businesses,
//           businessTotalItems: businessResponse.totalItems,
//           users: userResponse.users,
//           userTotalItems: userResponse.totalItems,
//         })
//       );
//     } else {
//       dispatch(
//         feedbackActions.setNotification({
//           snackbarMessage: "Failed to fetch data",
//           isShowSnackbar: true,
//           severity: "error",
//         })
//       );
//     }
//   };
// };

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
              fftDatetime: [...a.fftDatetime, ...b.fftDatetime],
            }))
          : {
              rawX: [],
              rawY: [],
              rawZ: [],
              fftX: [],
              fftY: [],
              fftZ: [],
              rawDatetime: [],
              fftDatetime: [],
            };
      dispatch(dashboardActions.setReadings(newReadings));
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

// export const saveTag = (tagId, name) => {
//   return async (dispatch) => {
//     dispatch(feedbackActions.setLoading(true));
//     let response;
//     if (tagId) {
//       response = await TagAPI.editTag({ name }, tagId);
//     } else {
//       response = await TagAPI.createTag({ name });
//     }
//     dispatch(feedbackActions.setLoading(false));
//     if (response.status === 200) {
//       if (tagId) {
//         dispatch(dashboardActions.editTag({ tagId, name }));
//         dispatch(
//           feedbackActions.setNotification({
//             snackbarMessage: "Tag edited",
//             isShowSnackbar: true,
//             severity: "success",
//           })
//         );
//       } else {
//         dispatch(dashboardActions.addTag(response.tag));
//         dispatch(
//           feedbackActions.setNotification({
//             snackbarMessage: "Tag created",
//             isShowSnackbar: true,
//             severity: "success",
//           })
//         );
//       }
//     } else {
//       dispatch(
//         feedbackActions.setNotification({
//           snackbarMessage: response.data.message,
//           isShowSnackbar: true,
//           severity: "error",
//         })
//       );
//     }
//   };
// };

// export const deleteTag = (tagId) => {
//   return async (dispatch) => {
//     dispatch(feedbackActions.setLoading(true));
//     const response = await TagAPI.deleteTag(tagId);
//     if (response.status === 200) {
//       dispatch(dashboardActions.deleteTag(tagId));
//       dispatch(
//         feedbackActions.setNotification({
//           snackbarMessage: "Tag deleted",
//           isShowSnackbar: true,
//           severity: "success",
//         })
//       );
//     } else {
//       dispatch(
//         feedbackActions.setNotification({
//           snackbarMessage: response.data.message,
//           isShowSnackbar: true,
//           severity: "error",
//         })
//       );
//     }
//     dispatch(feedbackActions.setLoading(false));
//   };
// };

// export const allowBusiness = (status, businessId) => {
//   return async (dispatch) => {
//     dispatch(feedbackActions.setLoading(true));
//     const response = await BusinessAPI.allowBusiness(businessId, status);
//     if (response.status === 200) {
//       dispatch(dashboardActions.allowBusiness({ businessId, status }));
//       dispatch(
//         feedbackActions.setNotification({
//           snackbarMessage: "Business edited",
//           isShowSnackbar: true,
//           severity: "success",
//         })
//       );
//     } else {
//       dispatch(
//         feedbackActions.setNotification({
//           snackbarMessage: response.data.message,
//           isShowSnackbar: true,
//           severity: "error",
//         })
//       );
//     }
//     dispatch(feedbackActions.setLoading(false));
//   };
// };

// export const verifyBusiness = (isVerified, businessId) => {
//   return async (dispatch) => {
//     dispatch(feedbackActions.setLoading(true));
//     const response = await BusinessAPI.verifyBusiness(businessId, isVerified);
//     if (response.status === 200) {
//       dispatch(dashboardActions.verifyBusiness({ businessId, isVerified }));
//       dispatch(
//         feedbackActions.setNotification({
//           snackbarMessage: "Business edited",
//           isShowSnackbar: true,
//           severity: "success",
//         })
//       );
//     } else {
//       dispatch(
//         feedbackActions.setNotification({
//           snackbarMessage: response.data.message,
//           isShowSnackbar: true,
//           severity: "error",
//         })
//       );
//     }
//     dispatch(feedbackActions.setLoading(false));
//   };
// };

// export const allowUser = (status, userId) => {
//   return async (dispatch) => {
//     dispatch(feedbackActions.setLoading(true));
//     const response = await UserAPI.allowUser(userId, status);
//     if (response.status === 200) {
//       dispatch(dashboardActions.allowUser({ userId, status }));
//       dispatch(
//         feedbackActions.setNotification({
//           snackbarMessage: "User edited",
//           isShowSnackbar: true,
//           severity: "success",
//         })
//       );
//     } else {
//       dispatch(
//         feedbackActions.setNotification({
//           snackbarMessage: response.data.message,
//           isShowSnackbar: true,
//           severity: "error",
//         })
//       );
//     }
//     dispatch(feedbackActions.setLoading(false));
//   };
// };
