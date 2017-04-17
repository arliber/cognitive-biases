import router from '../router/index'
import axios from 'axios'
import store from '../store'

const API_URL = '/api'
const LOGIN_URL = API_URL + '/signin'
const SIGNUP_URL = API_URL + '/signup'

export default {

  login (context, creds, redirect) {
    axios.post(LOGIN_URL, creds)
      .then((result) => {
        store.dispatch('setUser', result.data)
        if (redirect) {
          router.push(redirect)
        }
      }).catch((err) => {
        context.error = err
      })
  },

  signup (context, creds, redirect) {
    axios.post(SIGNUP_URL, creds)
      .then((result) => {
        store.dispatch('setUser', result.data)
        if (redirect) {
          router.push(redirect)
        }
      })
      .catch((err) => {
        context.error = err
      })
  },

  logout () {
    store.dispatch('unsetUser')
  },

  /* checkAuth () {
    var user = localStorage.getItem('user')
    if (user) {
      this.user = Object.assign(JSON.parse(user), {authenticated: true})
    } else {
      this.user = { authenticated: false }
    }
  }, */

  getAuthHeader () {
    let header = { }
    if (store.getters.isUserLoggedin()) {
      header = {
        'Authorization': 'Bearer ' + store.getters.user.token
      }
    }
    return header
  }
}
