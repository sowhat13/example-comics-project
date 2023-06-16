/* eslint-disable no-useless-catch */
import api from "./index";

const series = {
  async getSeries(query) {
    try {
      const response = await api.request("/series", query);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default series;
