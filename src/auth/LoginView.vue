<template>
  <v-card outlined style="max-width: 700px; width: 100%;">
    <v-form ref="loginModel" v-model="valid" lazy-validation>
      <v-container v-on:keyup.enter="login">
        <v-col cols="12">
          <v-text-field
            v-model="email"
            maxlength="256"
            :label="$t('Email')"
            required
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="password"
            autocomplete="new-password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            :label="$t('Password')"
            counter
            @click:append="show1 = !show1"
          />
        </v-col>
        <v-spacer />
        <div class="mb-4">
          <router-link class="mx-3" to="/reset-password">
            {{ $t('ForgetPassword') }}
          </router-link>
        </div>
        <div class="mb-4">
          <router-link class="mx-3" to="/register">
            {{ $t('CreateNewUser') }}
          </router-link>
        </div>
        <v-spacer />
        <v-row
          class="d-flex flex-column justify-space-between flex-sm-row mx-3 mt-4"
        >
          <v-btn
            v-if="game === 'csgo'"
            x-large
            class="mb-4"
            inlineblock
            color="success"
            href="/aklapi/integration/steam/login"
          >
            {{ $t('LoginWithSteam') }}
          </v-btn>
          <v-btn
            x-large
            inlineblock
            :disabled="!valid"
            color="success"
            @click="login"
          >
            Login
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { env } from '../../env';
// import jwt_decode from 'jwt-decode';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      show1: false,
      valid: true,
      steamUrl: '',
      game: env.game
    };
  },
  methods: {
    login() {
      this.$store.dispatch('startLoading');
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$store.dispatch('getFullUserInfo');
        })
        .then(() => {
          this.$store.dispatch('setAlertSuccess', this.$i18n.t('LoggedIn'));
          this.$router.push({ name: 'home-view' });
        })
        .catch(() => {
          this.$store.dispatch(
            'setAlertError',
            this.$i18n.t('IncorrectEmailPassword')
          );
        });
      this.$store.dispatch('stopLoading');
    }
  },

  async created() {
    const urlParams = new URLSearchParams(window.location.search);

    const linked = urlParams.get('linked') === 'true';
    const status = urlParams.get('status');
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');
    const steamToken = urlParams.get('steamRegistrationToken');

    if (status === 'OK' || status === 'CREATED') {
      if (accessToken) {
        // const tokenData = jwt_decode(accessToken);

        await this.$store.commit('setTokens', {
          status,
          accessToken,
          refreshToken,
          linked
        });

        this.$router.push('/');
      } else if (steamToken) {
        this.$router.push({ name: 'register-view', params: { steamToken } });
      }
    }
  }
};
</script>

<style></style>
