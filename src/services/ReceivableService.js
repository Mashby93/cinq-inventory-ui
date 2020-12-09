import axios from "axios";
import qs from 'qs';

import AuthService from "../AuthService";

const API_URL = "http://cinq.myddns.me:8080/api/routes/receive";

class ReceivableService {

  receive(supplierId, modelId, serialNumber) {
    let user = AuthService.getCurrentUser();

    return axios({
      method: 'post',
      url: API_URL,
      headers: {
        Authorization: `Bearer ${user.jwt}`
      },
      params: {
        supplierId:supplierId,
        modelId:modelId,
        serial:serialNumber
      }
    }).then(response => {
      console.log(response);
      return response.data
    })
  }

  getReceivable(id) {
    let user = AuthService.getCurrentUser();

    return axios({
      method: 'get',
      url: API_URL,
      headers: {
        Authorization: `Bearer ${user.jwt}`
      },
      params: {
        id:id
      }
    }).then(response => {
      console.log(response);
      return response.data
    })
  }



}

export default new ReceivableService;
