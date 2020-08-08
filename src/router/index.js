import Vue from 'vue';
import VueRouter from 'vue-router';
import UserListView from '../views/UserListView.vue';

import TeamListView from '../views/TeamListView.vue';
import TeamView from '../views/TeamView.vue';
import CreateTeamView from '../views/CreateTeamView.vue';
import SeasonApplyView from '../views/SeasonApplyView';

import SeasonsView from '../views/SeasonsView';
import SeasonView from '../views/SeasonView';
import SeasonCreateView from '../views/SeasonCreateView';

import UserProfileView from '../views/UserProfileView.vue';

import LoginView from '../auth/LoginView.vue';
import RegisterView from '../auth/RegisterView.vue';
import Logout from '../auth/Logout.vue';
import VerifyView from '../auth/VerifyView';

import PostView from '../views/PostView.vue';
import CreatePostView from '../views/CreatePostView.vue';
import PostDetailView from '../views/PostDetailView.vue';

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
    path: '/teams/create',
    name: 'team-create-view',
    component: CreateTeamView
  },
  {
    path: '/teams/:id',
    name: 'team-view',
    component: TeamView
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
    path: '/verifyemail',
    name: 'verifyemail-view',
    component: VerifyView,
    meta: {
      // requiresVisitor: true
    }
  },
  {
    path: '/logout',
    name: 'logout-view',
    component: Logout
  },
  {
    path: '/user/:username',
    name: 'user-profile-view',
    component: UserProfileView
  },
  {
    path: '/post/create',
    name: 'create-post-view',
    component: CreatePostView
  },
  {
    path: '/post/edit/:id',
    name: 'post-edit-view',
    component: CreatePostView
  },
  {
    path: '/post/:id',
    name: 'post-detail-view',
    component: PostDetailView
  },
  {
    path: '/seasons',
    name: 'seasons-list-view',
    component: SeasonsView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/seasons/create',
    name: 'season-create-view',
    component: SeasonCreateView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/seasons/apply',
    name: 'season-apply-view',
    component: SeasonApplyView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/seasons/:id',
    name: 'season-view',
    component: SeasonView,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
