const getReading = async (datetime) => {
  return await requestAxios(`/readings/reading?datetime=${datetime}`);
};

const ReadingAPI = {
  getReading,
};

export default ReadingAPI;
