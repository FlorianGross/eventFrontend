// https://www.bezkoder.com/vue-3-authentication-jwt/

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken }
  } else {
    return {}
  }
}
