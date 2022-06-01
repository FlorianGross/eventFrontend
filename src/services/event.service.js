import axios from 'axios'
import authHeader from './auth-header'
const API_URL = 'http://localhost:8079/api/test/'
class UserService {
  getPublicEvent() {
    return axios.get(API_URL + 'publicEvent')
  }

  getUserEvent() {
    return axios.get(API_URL + 'event', { headers: authHeader() })
  }
}
export default new UserService()
