import axios from "axios";
import qs from 'qs';

import AuthService from "../AuthService";

const API_URL = "http://cinq.myddns.me:8080/api/reports";

class ReportService {


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
          pageNumber: pageNumber,
          pageSize: pageSize
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
