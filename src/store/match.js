import { matchAxios } from '../main.js';

const matchStore = {
  state: {
    matches: [],
    teamMatches: [],
    currentSeason: {}
  },
  mutations: {
    addTeamMatches(state, matches) {
      state.teamMatches = matches;
    },
    addMatches(state, matches) {
      state.matches = matches;
    }
  },
  getters: {
    teamMatchById: state => id => {
      return state.teamMatches.find(match => match.id === id);
    },
    matchById: state => id => {
      return state.matches.find(match => match.id === id);
    }
  },
  actions: {
    async getTeamMatches(context, id) {
      const result = await matchAxios.get(`/match/${id}/all`);
      context.commit('addTeamMatches', result.data);
      return result.data;
    },
    async getConfirmedMatches() {
      const result = await matchAxios.get('/match/confirmed');
      return result.data;
    },
    async getTimeslotlessTeamMatches(context, parameters) {
      const result = await matchAxios.get(`/match/${parameters.id}/all`);
      context.commit('addTeamMatches', result.data);
      return result.data;
    },
    async getLockedMatches() {
      const result = await matchAxios.get(`/match/confirmed`);
      return result.data;
    },
    async proposeTimeslot(context, parameters) {
      const result = await matchAxios.post('/timeslot/propose', {
        matchId: parameters.matchId,
        proposedTimeslot: {
          startTime: parameters.startTime,
          endTime: parameters.endTime
        }
      });
      return result;
    },
    async acceptTimeslot(context, id) {
      const result = await matchAxios.post('/timeslot/accept', {
        matchId: id.matchId,
        acceptedTimeslotId: id._id
      });
      return result;
    },
    async getMatchById(context, id) {
      const result = await matchAxios.get('/match/' + id + '/info');
      return result.data.match;
    }
  }
};

export default matchStore;
