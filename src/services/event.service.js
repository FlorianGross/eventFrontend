import axios from 'axios'
import authHeader from './auth-header'
const API_URL = 'https://webprogevent.herokuapp.com/api/event/'
class UserService {
  getEvent(id) {
    return axios.post(API_URL + 'event', id, { headers: authHeader() })
  }

  createEvent(event) {
    return axios.post(API_URL + 'create', {
      creater: event.creater,
      name: event.name,
      description: event.description,
      image: event.image,
      location: event.location,
      start: event.start,
      end: event.end,
      icon: event.icon,
      maxParticipants: event.maxParticipants,
      group: event.group,
      cost: event.cost,
    }, { headers: authHeader() })
  }

  updateEvent(event) {
    return axios.post(API_URL + 'change', {
      creater: event.creater,
      name: event.name,
      description: event.description,
      image: event.image,
      location: event.location,
      start: event.start,
      end: event.end,
      icon: event.icon,
      maxParticipants: event.maxParticipants,
      group: event.group,
      cost: event.cost,
    }, { headers: authHeader() })
  }

  deleteEvent(id) {
    return axios.post(API_URL + 'delete', id, { headers: authHeader() })
  }

  participateEvent(id, user) {
    return axios.post(API_URL + 'participate', { id, user }, { headers: authHeader() })
  }

  unParticipateEvent(id, user) {
    return axios.post(API_URL + 'unparticipate', { id, user }, { headers: authHeader() })
  }
}
export default new UserService()
