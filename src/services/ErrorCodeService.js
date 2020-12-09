import axios from "axios";
import qs from 'qs';

import AuthService from "../AuthService";

const API_URL = "http://http://18.216.7.74:8080/api/errors";

class ErrorCodeService {

  getEmptyItem() {
    return {
      id: null,
      code: "",
      description: "",
      type: {}
    };
  }

  getByTypeId(typeId) {
    return axios
      .get(API_URL + "/filtered", {
        params: {
          typeId: typeId,
        }
      })
      .then(response => {
        console.log(response);
        return response.data;
      });
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

  getAllBulk() {
    return axios.get(API_URL + "/bulk")
      .then(response => {
        console.log(response);
        return response.data;
      })
  }

  save(category) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: API_URL,
      data: JSON.stringify(category)
    })
    .then(response => {
      return response.data;
    });
  }

}

export default new ErrorCodeService;
