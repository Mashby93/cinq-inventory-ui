import axios from "axios";
import qs from 'qs';

import AuthService from "../AuthService";

const API_URL = "http://http://18.216.7.74:8080/api/supplier";

class CategoryService {

  getEmptyItem() {
    return {
      id: null,
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

  getAllBulk() {
    return axios({
      method: 'get',
      url: API_URL + "/bulk"})
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

export default new CategoryService;
