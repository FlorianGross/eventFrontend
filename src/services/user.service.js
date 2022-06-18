// https://www.bezkoder.com/vue-3-authentication-jwt/

import axios from 'axios'
import authHeader from './auth-header'
const API_URL = 'https://webprogevent.herokuapp.com'

class UserService {
  getAllUsers() {
    return axios.get(API_URL + '/api/users', { headers: authHeader() })
  }

  updateUser(user, roles) {
    return axios.put(API_URL + '/api/user/role/' + user.username, {
      id: user.username,
      roles: roles
    }, { headers: authHeader() });
  }

  getUser(id) {
    return axios.get(API_URL + '/api/user/' + id, {
      username: id
    }, { headers: authHeader() });
  }

  setUser(user) {
    return axios.put(API_URL + '/api/user/' + user.id, {
      user: user
    }, { headers: authHeader() });
  }

  saveImage(username, image) {
    axios.post(API_URL + '/api/image', image).then(function (response) {
      console.log(response)
      return axios.post(API_URL + 'saveimage', {
        username: username,
        image: response.file
      }, { headers: authHeader() });
    });
  }

  deleteUser(id) {
    return axios.delete(API_URL + '/api/user/' + id, {
      headers: authHeader()
    });
  }
}

export default new UserService()
