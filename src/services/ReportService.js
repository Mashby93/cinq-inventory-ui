import axios from "axios";
import qs from 'qs';

import AuthService from "../AuthService";

const API_URL = "/api/reports";

class ReportService {

  delete(id) {
    return axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      url: API_URL + "/" + id
    })
    .then(response => {
        console.log(response);
        return response;
      });
  }

  download(id) {
    return axios
      .get(API_URL + "/" + id, {
      })
      .then(response => {
        console.log(response);
        return response;
      });
  }

  getAll(pageNumber, pageSize) {
    return axios
      .get(API_URL, {
        params: {
          page:0,
          limit:100000,
          sort:"createdAt,desc"
        }
      })
      .then(response => {
        console.log(response);
        return response.data.content;
      });
  }

  generateReport(startDate, endDate) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'responseType': 'stream'
      },
      url: API_URL,
      params: {
        startDate: startDate,
        endDate: endDate
      }
    })
    .then(response => {
        console.log(response);
        return response;
      });
  }

}

export default new ReportService;
