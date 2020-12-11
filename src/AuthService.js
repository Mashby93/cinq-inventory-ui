import axios from "axios";

const API_URL = "/api/authentication/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", null, {
        params: {
          username: username,
          password: password
        }
      })
      .then(response => {
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getAuthToken() {
    return "Bearer " + this.getCurrentUser()["jwt"];
  }
}


export default new AuthService();
