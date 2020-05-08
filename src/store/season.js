import axios from 'axios';

const seasonStore = {
  state: {
    seasons: []
  },
  mutations: {
    addSeasons(state, seasons) {
      state.seasons.push(...seasons);
    }
  },
  actions: {
    async retrieveSeasons(context, query) {
      if (!context.state.seasons.length) {
        const res = await axios.get(
          `/season/all?page=${query.page}&pageSize=20`
        );
        context.commit('addSeasons', res.data);
      }
    },
    async createSeason(context, formData) {
      const res = await axios.post('/team/create', formData);
      console.log(res);
    }
  }
};

export default seasonStore;
