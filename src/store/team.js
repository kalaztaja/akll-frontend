import axios from 'axios';

const teamStore = {
  state: {
    teams: [],
    currentTeam: {},
    currentTeamUsers: []
  },
  mutations: {
    addTeams(state, teams) {
      state.teams.push(...teams);
    },
    setCurrentTeam(state, team) {
      state.currentTeam = team;
    },
    setCurrentTeamUsers(state, users) {
      state.currentTeamUsers = users;
    },
    removeApplication(state, userId) {
      const i = state.currentTeam.applications.findIndex(
        a => a.user === userId
      );
      state.currentTeam.applications.splice(i, 1);
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
      await axios.post('/team/create', formData);
      // console.log(res);
    },
    async editTeam(context, formData) {
      await axios.post(
        `/team/${context.state.currentTeam.id}/update`,
        formData
      );
    },

    async retrieveTeam(context, id) {
      const res = await axios.get(`/team/${id}/info`);
      context.commit('setCurrentTeam', { ...res.data, id });
    },

    async getAllTeamMembers(context) {
      // reduces network requests
      if (
        context.state.currentTeam.members.length ===
        context.state.currentTeamUsers.length
      ) {
        return;
      }
      return Promise.all(
        context.state.currentTeam.members.map(member => {
          return axios.get(`/user/id/${member}`);
        })
      ).then(members => {
        context.commit(
          'setCurrentTeamUsers',
          members.map(m => m.data)
        );
      });
    },

    async sendApplication(context, formData) {
      await axios.post(
        `/team/${context.state.currentTeam.id}/applications/apply`,
        formData
      );
    },

    async handleApplication(context, formData) {
      const res = await axios.post(
        `/team/${context.state.currentTeam.id}/applications/handle`,
        formData
      );
      if (res.status === 200) {
        context.commit('removeApplication', formData.userId);
      }
    },

    async getApplicationUsers(context) {
      return Promise.all(
        context.state.currentTeam.applications.map(appli => {
          return axios.get(`/user/id/${appli.user}`);
        })
      ).then(members => {
        return members.map(m => m.data);
      });
    },

    async kickPlayer(context, userId) {
      await axios.post(`/team/${context.state.currentTeam.id}/members/remove`, {
        userId
      });
    },

    async leaveTeam(context) {
      await axios.post(`/team/${context.state.currentTeam.id}/members/leave`);
    }
  }
};

export default teamStore;
