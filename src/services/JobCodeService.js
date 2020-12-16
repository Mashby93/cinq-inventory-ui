import axios from "axios";
import qs from 'qs';

import AuthService from "../AuthService";

const API_URL = "/api/jobCodes";

class JobCodeService {


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

  save(id, code, description) {

    if (id) {
      return axios({
        method: 'patch',
        headers: {
          'Content-Type': 'application/json'
        },
        url: API_URL,
        params: {
          id: id,
          code: code,
          description: description
        }
      });
    } else {
      return axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        url: API_URL,
        params: {
          code: code,
          description: description
        }
      });
    }
  }

}

export default new JobCodeService;
