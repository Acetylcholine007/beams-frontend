// import { useContext, useEffect, useState } from "react";
// import NodeAPI from "../shared/apis/NodeAPI";
// import { LoadingContext } from "../shared/contexts/LoadingContext";
// import { SnackbarContext } from "../shared/contexts/SnackbarContext";

// export const useNodes = () => {
//   const [nodes, setNodes] = useState();
//   const { loadingDispatch } = useContext(LoadingContext);
//   const { snackbarDispatch } = useContext(SnackbarContext);

//   useEffect(() => {
//     NodeAPI.getNodes(loadingDispatch, snackbarDispatch, (data) => {
//       setNodes(data);
//     });
//   }, []);

//   return { nodes };
// };
