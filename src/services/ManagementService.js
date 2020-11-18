import axios from "axios";
import qs from 'qs';

const API_URL = "http://localhost:8080/api/management/";

class ManagementService {

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
}

export default new ManagementService;
