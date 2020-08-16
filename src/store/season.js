import axios from 'axios';

const seasonStore = {
  state: {
    seasons: [],
    currentSeason: {}
  },
  mutations: {
    addSeasons(state, seasons) {
      state.seasons.push(...seasons);
    },
    setCurrentSeason(state, season) {
      state.currentSeason = season;
    },
    updateSeason(state, season) {
      const index = state.seasons.findIndex(s => s._id === season._id);
      state.seasons[index] = season;
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
      await axios.post('/season/create', formData);
    },

    async editSeason(context, formData) {
      const res = await axios.post(
        `/season/${context.state.currentSeason._id}/update`,
        formData
      );
      if (res.status === 200) {
        context.commit('updateSeason', formData);
      }
    },

    async retrieveSeason(context, id) {
      const res = await axios.get(`/season/${id}/info`);
      context.commit('setCurrentSeason', res.data);
      return res.data;
    },

    async applyForSeason(context, data) {
      await axios.post(`/season/${data.id}/applications/apply`, {
        applicationText: data.applicationText
      });
    }
  }
};

export default seasonStore;
