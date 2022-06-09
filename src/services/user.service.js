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
}

export default new UserService()
