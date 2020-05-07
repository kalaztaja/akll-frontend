import axios from 'axios';

const teamStore = {
  state: {
    teams: [],
    currentTeam: {}
  },
  mutations: {
    addTeams(state, teams) {
      state.teams.push(...teams);
    },
    setCurrentTeam(state, team) {
      state.currentTeam = team;
    }
  },
  actions: {
    async retrieveTeams(context, query) {
      if (!context.state.teams.length) {
        const res = await axios.get(`/team/all?page=${query.page}&pageSize=20`);
        context.commit('addTeams', res.data);
      }
    },
    async createTeam(context, formData) {
      const res = await axios.post('/team/create', formData);
      console.log(res);
    },
    async retrieveTeam(context, id) {
      const res = await axios.get(`/team/${id}/info`);
      context.commit('setCurrentTeam', res.data);
    }
  }
};

export default teamStore;
