import axios from "axios";

const API_URL = "/api/users/";

class UserService {

  getUsers(pageNumber, pageSize) {
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

  editUser(id, firstName, lastName, email, password) {
    if (id == null) {
      return axios.post(API_URL + "signup", null, {
        params: {
          firstName: firstName,
          lastName: lastName,
          username: email,
          password: password
        }
      }).then(response => {
        console.log(response);
        return response.status
      })
    } else {
      return axios.patch(API_URL, null, {
        params: {
          id: id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        }
      }).then(response => {
        console.log(response);
        return response.status
      })
    }


  }

  getUser(id) {
    return axios.get(API_URL + "user", {
      params: {
        id: id
      }
    }).then(response => {
      console.log(response);
      return response.data;
    });
  }

}

export default new UserService;
