// https://www.bezkoder.com/vue-3-authentication-jwt/

import axios from 'axios'
const API_URL = 'https://webprogevent.herokuapp.com/api/auth/'
class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      imageUrl: user.imageUrl,
      password: user.password
    })
  }
  getIsAdmin(username) {
    return axios.get(API_URL + 'admin', {
      username: username,
    })
  }
}
export default new AuthService()
