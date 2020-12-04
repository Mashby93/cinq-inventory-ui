import axios from "axios";
import qs from 'qs';

import AuthService from "../AuthService";

const API_URL = "http://localhost:8080/api/categories";

class CategoryService {

  getEmptyItem() {
    return {
      id: "",
      name: ""
    };
  }

  getById(id) {
    return axios
      .get(API_URL + "/" + id, {
      })
      .then(response => {
        console.log(response);
        return response.data;
      });
  }

  getAll(pageNumber, pageSize) {
    return axios
      .get(API_URL, {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize
        }
      })
      .then(response => {
        console.log(response);
        return response.data;
      });
  }

  save(category) {
    return axios.post(API_URL, {
      JSON.stringify(item);
    });
  }

}

export default new CategoryService;
