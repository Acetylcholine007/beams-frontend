import requestAxios from "../../utils/requestAxios";

const getReading = async (datetime, serialKey) => {
  return await requestAxios(
    `/readings/reading?serialKey=${serialKey}&datetime=${datetime}`
  );
};

const ReadingAPI = {
  getReading,
};

export default ReadingAPI;
