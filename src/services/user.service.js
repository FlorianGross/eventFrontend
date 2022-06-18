// https://www.bezkoder.com/vue-3-authentication-jwt/

import axios from 'axios'
import authHeader from './auth-header'
const API_URL = 'https://webprogevent.herokuapp.com/api/'

class UserService {
  getAllUsers() {
    return axios.get(API_URL + 'users', { headers: authHeader() })
  }

  updateUser(user, roles) {
    return axios.post(API_URL + 'updateUser', {
      id: user.username,
      roles: roles
    }, { headers: authHeader() });
  }

  getUser(username) {
    return axios.post(API_URL + 'getUserData', {
      username: username
    }, { headers: authHeader() });
  }
  setUser(user) {
    return axios.post(API_URL + 'setUserData', {
      user: user
    }, { headers: authHeader() });
  }
  saveImage(username, image) {
    console.log(image)
    axios.post(API_URL + 'upload', image).then(function (response) {
      console.log(response)
      return axios.post(API_URL + 'saveimage', {
        username: username,
        image: response.file
      }, { headers: authHeader() });
    });
  }
  getImage(username) {
    return axios.post(API_URL + 'getImage', {
      username: username
    }, { headers: authHeader() });
  }
}

export default new UserService()
