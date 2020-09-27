import Vue from 'vue';
import VueRouter from 'vue-router';
import ga from 'vue-ga';

import TeamListView from '../views/TeamListView.vue';
import TeamView from '../views/TeamView.vue';
import CreateTeamView from '../views/CreateTeamView.vue';
import SeasonApplyView from '../views/SeasonApplyView';

import SeasonsView from '../views/SeasonsView';
import SeasonView from '../views/SeasonView';
import SeasonCreateView from '../views/SeasonCreateView';

import UserProfileView from '../views/UserProfileView.vue';
import UserEditView from '../views/UserEditView';

import LoginView from '../auth/LoginView.vue';
import RegisterView from '../auth/RegisterView.vue';
import Logout from '../auth/Logout.vue';
import VerifyView from '../auth/VerifyView';
import ResetPasswordView from '../auth/ResetPasswordView';

import CreatePostView from '../views/CreatePostView.vue';
import PostDetailView from '../views/PostDetailView.vue';
import HomePageView from '../views/HomePageView.vue';

import TeamMatchesView from '../views/TeamMatchesView.vue';
import TeamMatchDetail from '../views/TeamMatchDetail.vue';
import AllMatchView from '../views/AllMatchView.vue';

import CalendarView from '../components/SharedCalendar.vue';

import { env } from '../../env';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home-view',
    component: HomePageView
  },
  /*{
    path: '/users',
    name: 'user-list-view',
    component: UserListView
  },*/
  {
    path: '/teams',
    name: 'team-list-view',
    component: TeamListView
  },
  {
    path: '/teams/create',
    name: 'team-create-view',
    component: CreateTeamView,
    alias: '/teams/edit'
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
    path: '/reset-password',
    name: 'reset-password-view',
    component: ResetPasswordView,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/register',
    name: 'register-view',
    component: RegisterView,
    props: true
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
    path: '/user/:id',
    name: 'user-profile-view',
    component: UserProfileView
  },
  {
    path: '/user/:id/edit',
    name: 'user-edit-view',
    component: UserEditView,
    meta: {
      requiresAuth: true
    }
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
  },
  {
    path: '/teams/:id/matches',
    name: 'team-matches-view',
    component: TeamMatchesView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/teams/:id/matches/:matchid',
    name: 'team-match-detail',
    component: TeamMatchDetail,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/calendar',
    name: 'calendar-view',
    component: CalendarView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/matches/all',
    name: 'all-match-view',
    component: AllMatchView
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

ga(router, env.gaPropertyId);

export default router;
