import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: {},
    router: router,
    user: {},
    alertMessage: '',
    loader: false
  },
  mutations: {
    SET_MESSAGES(state, messages) {
      state.messages = messages
    },
    ADD_MESSAGE(state, message) {
      state.messages = {...state.messages, [message.id]: message}
    },
    DELETE_MESSAGE(state, messageId) {
      delete state.messages[messageId]
      state.messages = {...state.messages}
    },
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('auth', JSON.stringify(user))
    },
    LOGOUT(state) {
      state.user = {}
    },
    TOGGLE_LOADER(state) {
      state.loader = !state.loader
    },
    ALERT(state, message) {
      state.alertMessage = message
    },
  },
  actions: {
    getMessages({commit, state}) {
      commit('TOGGLE_LOADER')
      const options = {headers: {'Authorization': state.user.token}}
      axios.get('/message', options)
        .then((response) => {
          commit('SET_MESSAGES', response.data)
          commit('TOGGLE_LOADER')
        })
        .catch(() => commit('ALERT', 'Something went wrong, please try again later.'))
    },
    sendMessage({commit, state}, message) {
      commit('TOGGLE_LOADER')
      const options = {headers: {'Authorization': state.user.token}}
      axios.post('/message', message, options)
        .then((response) => {
          commit('ADD_MESSAGE', response.data)
          state.router.push({name: 'Home'})
          commit('TOGGLE_LOADER')
          commit('ALERT', 'Message Sent')
        })
        .catch(() => commit('ALERT', 'Something went wrong, please try again later.'))
    },
    deleteMessage({commit, state}, messageId) {
      commit('TOGGLE_LOADER', messageId)
      const options = {headers: {'Authorization': state.user.token}}
      axios.delete(`/message/${messageId}`, options)
        .then(() => {
          state.router.push({name: 'Home'})
          commit('DELETE_MESSAGE', messageId)
          commit('TOGGLE_LOADER')
          commit('ALERT', 'Message Deleted')
        })
        .catch(() => commit('ALERT', 'Something went wrong, please try again later.'))
    },
    logout({commit, state}) {
      localStorage.removeItem('auth')
      state.router.push({name: 'Login'})
      commit('LOGOUT')
    },

  },
  getters: {
    listMessages: (state) => Object.values(state.messages).sort((a, b) => a.created > b.created ? -1 : 1),
    currentMessage: (state) => state.messages[router.currentRoute.params.id],
    currentUser: (state) => state.user,
    loader: (state) => state.loader,
    alertMessage: (state) => state.alertMessage
  }
})