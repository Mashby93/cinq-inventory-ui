import axios from "axios";
import qs from 'qs';

import AuthService from "../AuthService";

const API_URL = "http://localhost:8080/api/errors";

class ErrorCodeService {

  getEmptyItem() {
    return {
      id: "",
      code: "",
      description: "",
      category: {}
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

}

export default new ErrorCodeService;
