import axios from 'axios'
import authHeader from './auth-header'
const API_URL = 'https://webprogevent.herokuapp.com/api/event/'
class UserService {
  getEvent(id) {
    return axios.post(API_URL, { id: id }
      , { headers: authHeader() })
  }

  getAllEvents() {
    return axios.post('https://webprogevent.herokuapp.com/api/events', {}, { headers: authHeader() })
  }

  createEvent(event) {
    return axios.post(API_URL + 'create', {
      name: event.name,
      description: event.description,
      image: event.image,
      location: event.location,
      start: event.start,
      end: event.end,
      maxParticipants: event.maxParticipants,
      preSale: event.preSale,
      preSaleInfo: event.preSaleInfo,
      cost: event.cost,
      eventSpecials: event.eventSpecials,
      contactPerson: event.contactPerson,
      contactEmail: event.contactEmail,
      contactPhoneNumber: event.contactPhoneNumber,
      published: event.published,
    }, { headers: authHeader() })
  }

  updateEvent(event) {
    return axios.post(API_URL + 'change', {
      id: event.id,
      name: event.name,
      description: event.description,
      image: event.image,
      location: event.location,
      start: event.start,
      end: event.end,
      maxParticipants: event.maxParticipants,
      preSale: event.preSale,
      preSaleInfo: event.preSaleInfo,
      cost: event.cost,
      eventSpecials: event.eventSpecials,
      contactPerson: event.contactPerson,
      contactEmail: event.contactEmail,
      contactPhoneNumber: event.contactPhoneNumber,
      published: event.published,
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

  preOrder(id, user) {
    return axios.post(API_URL + 'preorder', { id, user }, { headers: authHeader() })
  }

  unPreOrder(id, user) {
    return axios.post(API_URL + 'unpreorder', { id, user }, { headers: authHeader() })
  }
}
export default new UserService()
