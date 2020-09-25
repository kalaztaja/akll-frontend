import axios from 'axios';

const matchAxios = axios.create({
  baseURL: 'http://localhost:3002'
});

const matchStore = {
  state: {
    matches: [],
    teamMatches: [],
    currentSeason: {}
  },
  mutations: {
    addMatches(state, matches) {
      state.matches = matches;
    }
  },
  actions: {
    async getMatches(context, parameters) {
      const result = await matchAxios.get(`/${parameters.id}/`);
      context.commit('addMatches', result.data);
      return result.data;
    }
  }
};

export default matchStore;
