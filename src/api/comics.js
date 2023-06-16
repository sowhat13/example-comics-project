/* eslint-disable no-useless-catch */
import api from "./index";

const comics = {
  async getComics(query) {
    try {
      const response = await api.request("/comics", query);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getComic(id, query) {
    try {
      const response = await api.request(`/comics/${id}`, query);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getComicCharacters(id, query) {
    try {
      const response = await api.request(`/comics/${id}/characters`, query);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getComicStories(id, query) {
    try {
      const response = await api.request(`/comics/${id}/stories`, query);
      return response;
    } catch (error) {
      throw error;
    }
  }

};

export default comics;
