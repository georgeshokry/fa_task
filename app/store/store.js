import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    performanceData: [],
  },
  mutations: {
    setPerformanceData(state, data) {
      state.performanceData = data;
    },
  },
  actions: {
    fetchPerformanceChartData({ commit }) {
      const performanceUrl = 'https://fe-task.getsandbox.com/performance';
      fetch(performanceUrl)
        .then(response => response.json())
        .then(data => commit('setPerformanceData', data));
    },
  },
});
