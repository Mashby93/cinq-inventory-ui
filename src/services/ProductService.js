import axios from "axios";
import qs from 'qs';

import AuthService from "../AuthService";

const API_URL = "http://cinq.myddns.me:8080/api/products/";

class ProductService {

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
        note:note
      }
    }).then(response => {
      console.log(response);
      return response.data
    })
  }
}

export default new ProductService;
