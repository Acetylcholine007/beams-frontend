import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import NodeAPI from "../shared/apis/NodeAPI";
import { LoadingContext } from "../shared/contexts/LoadingContext";
import { SnackbarContext } from "../shared/contexts/SnackbarContext";
import { useSocket } from "../shared/hooks/useSocket";

export const useNode = () => {
  const { nodeId } = useParams();
  const { state } = useLocation();
  const [readings, setReadings] = useState();
  const [value, setValue] = useState(null);
  const { loadingDispatch } = useContext(LoadingContext);
  const { snackbarDispatch } = useContext(SnackbarContext);

  const socketHandler = (data) => {
    console.log(data);
    // setReadings((readings) => {
    //   let newReadings = [...readings];
    //   console.log(newReadings);
    //   if (newReadings.length === samples) {
    //     newReadings.shift();
    //   }
    //   newReadings.push(data);
    //   console.log(newReadings);
    //   return newReadings;
    // });
  };

  useEffect(() => {
    NodeAPI.getNode(
      loadingDispatch,
      snackbarDispatch,
      (response) => {
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
        setReadings(newReadings);
        console.log(newReadings);
      },
      nodeId
    );
  }, []);

  useSocket(state?.serialKey, socketHandler);

  return { readings, value, setValue };
};
