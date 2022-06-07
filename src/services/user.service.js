import axios from 'axios'
import authHeader from './auth-header'
const API_URL = 'https://webprogevent.herokuapp.com/api/'

class UserService {
  getAllUsers() {
    return axios.get(API_URL + 'users', { headers: authHeader() })
  }

  updateUser(user, roles) {
    return axios.put(API_URL + 'updateUser', {
      id: user.username,
      roles: roles
    }, { headers: authHeader() });
  }
}

export default new UserService()
