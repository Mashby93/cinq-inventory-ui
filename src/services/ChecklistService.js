import axios from "axios";
import qs from 'qs';

import AuthService from "../AuthService";

const API_URL = "http://http://18.216.7.74:8080/api/checkList";

class ChecklistService {

  getEmptyItem() {
    return {
      id: "",
      name: ""
    };
  }


  getAllBulk() {
    return axios.get(API_URL)
      .then(response => {
        console.log(response);
        return response.data;
      })
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
