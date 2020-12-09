import axios from "axios";
import qs from 'qs';

const API_URL = "http://18.216.7.74:8080/api/management/";

class ManagementService {

  editUserRoles(id, roles) {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: API_URL + "users/roles",
      data: roles,
      params: {
        userId: id
      }
    }).then(response => {
      console.log(response);
      return response.status
    })
  }
}

export default new ManagementService;
