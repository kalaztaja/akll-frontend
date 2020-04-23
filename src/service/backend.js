import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getPlayers() {
    return apiClient.get("/players/");
  },
  getPlayer(id) {
    return apiClient.get("/players/" + id + "/");
  },
  getUsers() {
    return apiClient.get("/users/");
  },
  getTeams() {
    return apiClient.get("/teams/");
  }
};
