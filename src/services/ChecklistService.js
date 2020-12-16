import axios from "axios";
import qs from 'qs';

import AuthService from "../AuthService";

const API_URL = "/api/checkList";

class ChecklistService {

  getEmptyItem() {
    return {
      id: "",
      name: ""
    };
  }

  getById(id) {
    return axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      url: API_URL + "/" + id
    })
    .then(response => {
      return response.data;
    });
  }

  getAllBulk() {
    return axios.get(API_URL)
      .then(response => {
        console.log(response);
        return response.data;
      })
  }

  edit(checklist) {
    return axios({
      method: 'patch',
      headers: {
        'Content-Type': 'application/json'
      },
      url: API_URL,
      data: JSON.stringify(checklist)
    })
    .then(response => {
      return response.data;
    });
  }

  save(checklist) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: API_URL,
      data: JSON.stringify(checklist)
    })
    .then(response => {
      return response.data;
    });
  }

}

export default new ChecklistService;
