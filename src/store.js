import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import biases from './data/biases.json'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistedState({
    paths: ['user']
  })],
  state: {
    user: { },
    biases: biases,
    activeCategory: 0,
    activeSubCategory: 0,
    activeBias: 0
  },
  getters: {
    isUserLoggedin (state) {
      return Object.keys(state.user).length > 0
    },
    user (state) {
      return state.user
    },
    biases (state) {
      return state.biases
    },
    currentSelection (state) {
      return {
        category: state.activeCategory,
        subCategory: state.activeSubCategory,
        bias: state.activeBias
      }
    },
    currentBias (state) {
      return state.biases.children[state.activeCategory].children[state.activeSubCategory].children[state.activeBias]
    }
  },
  mutations: {
    SET_USER (state, userData) {
      state.user = userData
    },
    UNSET_USER (state) {
      state.user = {}
    },
    SET_ACTIVE_CATEGORY (state, index) {
      state.activeCategory = index
    },
    SET_ACTIVE_SUB_CATEGORY (state, index) {
      state.activeSubCategory = index
    },
    SET_ACTIVE_BIAS (state, index) {
      state.activeBias = index
    }
  },
  actions: {
    setUser ({ commit }, userData) {
      commit('SET_USER', userData)
    },
    unsetUser ({ commit }) {
      commit('UNSET_USER')
    },
    setActiveCategory ({ commit }, index) {
      commit('SET_ACTIVE_CATEGORY', index)
    },
    setActiveSubCategory ({ commit }, index) {
      commit('SET_ACTIVE_SUB_CATEGORY', index)
    },
    setActiveBias ({ commit }, index) {
      commit('SET_ACTIVE_BIAS', index)
    }
  }
})
