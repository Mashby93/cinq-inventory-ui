import axios from "axios";
import qs from 'qs';

import AuthService from "../AuthService";

const API_URL = "/api/products/";

class ProductService {

  getById(id) {
    return axios
      .get(API_URL + "/" + id, {
      })
      .then(response => {
        console.log(response);
        return response.data;
      });
  }

  editUserRoles(id, roles) {
    return axios.patch(API_URL + "user/roles", null, {
      params: {
        id: id,
        roles:roles
      },
      paramsSerializer: params => {
    return qs.stringify(params, {arrayFormat: 'repeat'})
  }
    }).then(response => {
      console.log(response);
      return response.status
    })
  }

  addNote(id, note) {
    let user = AuthService.getCurrentUser();

    let config = {
      headers: { Authorization: `Bearer ${user.jwt}`}
    }

    return axios({
      method: 'post',
      url: API_URL + "notes",
      headers: {
        Authorization: `Bearer ${user.jwt}`
      },
      params: {
        id:id,
        userId:user.id,
        note:note
      }
    }).then(response => {
      console.log(response);
      return response.data
    })
  }

  addPartNumber(id, partNumber) {
    let user = AuthService.getCurrentUser();

    let config = {
      headers: { Authorization: `Bearer ${user.jwt}`}
    }

    return axios({
      method: 'post',
      url: API_URL + "partNumbers",
      headers: {
        Authorization: `Bearer ${user.jwt}`
      },
      params: {
        id:id,
        partNumber:partNumber
      }
    }).then(response => {
      console.log(response);
      return response.data
    })
  }
}

export default new ProductService;
