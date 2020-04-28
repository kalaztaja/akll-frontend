import Vue from 'vue';
import VueRouter from 'vue-router';
import UserListView from '../views/UserListView.vue';
import TeamListView from '../views/TeamListView.vue';
import PlayerListView from '../views/PlayerListView.vue';
import FinalizeSteamAuth from '../views/FinalizeSteamAuth';

import UserProfileView from '../views/UserProfileView.vue';

import LoginView from '../auth/LoginView.vue';
import RegisterView from '../auth/RegisterView.vue';
import Logout from '../auth/Logout.vue';

import PostView from '../views/PostView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'post-view',
    component: PostView
  },
  {
    path: '/users',
    name: 'user-list-view',
    component: UserListView
  },
  {
    path: '/teams',
    name: 'team-list-view',
    component: TeamListView
  },
  {
    path: '/players',
    name: 'player-list-view',
    component: PlayerListView
  },
  {
    path: '/login',
    name: 'login-view',
    component: LoginView,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/register',
    name: 'register-view',
    component: RegisterView,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/logout',
    name: 'logout-view',
    component: Logout
  },
  {
    path: '/user/:id',
    name: 'user-profile-view',
    component: UserProfileView
  },
  {
    path: '/finalizeauth',
    name: 'finalize-auth-view',
    component: FinalizeSteamAuth
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
