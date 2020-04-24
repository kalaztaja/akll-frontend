import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL = "http://localhost:8000";

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("access_token") || null,
    user: null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    userInfo(state) {
      return state.user !== null;
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    },
    retrieveUserInfo(state, user) {
      console.log("budum");
      state.user = user;
    }
  },
  actions: {
    destroyToken(context) {
      if (context.getters.loggedIn) {
        localStorage.removeItem("access_token");
        context.commit("destroyToken");
        console.log(context.getters.loggedIn);
      }
    },
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/token/", {
            username: credentials.username,
            password: credentials.password
          })
          .then(response => {
            const token = response.data.access;
            console.log(response);
            localStorage.setItem("access_token", token);
            context.commit("retrieveToken", token);

            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/users/", {
            username: data.username,
            password: data.password,
            email: data.emailAddress,
            firstName: data.firstName,
            lastName: data.lastName,
            is_active: true
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    },
    retrieveUserInfo(context) {
      if (context.state.token !== null) {
        return new Promise((resolve, reject) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.state.token;
          axios
            .get("/user/")
            .then(response => {
              context.commit("retrieveUserInfo", response.data);
              resolve(response);
            })
            .catch(error => {
              console.log(error);
              reject(error);
            });
        });
      }
    },
    retrieveAllUsers(context) {
      if (context.state.token !== null) {
        return new Promise((resolve, reject) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.state.token;
          axios
            .get("/users/")
            .then(response => {
              console.log(response);
              resolve(response);
            })
            .catch(error => {
              console.log(error);
              reject(error);
            });
        });
      }
    },
    retrieveAllTeams(context) {
      if (context.state.token !== null) {
        return new Promise((resolve, reject) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.state.token;
          axios
            .get("/teams/")
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        });
      }
    },
    registerTeam(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/teams/", {
            team_name: data.team_name,
            tag: data.tag
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    },
    retrieveAllPlayers() {
      return new Promise((resolve, reject) => {
        axios
          .get("/players/")
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  modules: {}
});
