import axios from 'axios'
import authHeader from './auth-header'
const API_URL = 'https://webprogevent.herokuapp.com'
class UserService {
  getEvent(id) {
    return axios.get(API_URL + "/api/event/" + id, { id: id }
      , { headers: authHeader() })
  }

  getAllEvents() {
    return axios.get(API_URL + "/api/events", {}, { headers: authHeader() })
  }

  createEvent(event) {
    return axios.post(API_URL + '/api/event/', {
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
    return axios.put(API_URL + '/api/event/' + event.id, {
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
    return axios.delete(API_URL + '/api/event/' + id, { id }, { headers: authHeader() })
  }

  getParticipants(id) {
    return axios.get(API_URL + '/api/event/participants/' + id, { id }, { headers: authHeader() })
  }

  getPreOrder(id) {
    return axios.get(API_URL + '"/api/event/preorder/' + id, { id }, { headers: authHeader() })
  }

  getEventsFromUser(id) {
    return axios.post(API_URL + '/api/events/users/' + id, {
      user: id
    }, { headers: authHeader() });
  }

  participateEvent(id, user) {
    return axios.put(API_URL + '/api/event/participants/' + id, { id, user }, { headers: authHeader() })
  }

  unParticipateEvent(id, user) {
    return axios.put(API_URL + '/api/event/participants/' + id, { id, user }, { headers: authHeader() })
  }

  unPreOrder(id, user) {
    return axios.put(API_URL + '/api/event/preOrder/' + id, { id, user }, { headers: authHeader() })
  }

  preOrder(id, user) {
    return axios.put(API_URL + '/api/event/preOrder/' + id, { id, user }, { headers: authHeader() })
  }
}
export default new UserService()
