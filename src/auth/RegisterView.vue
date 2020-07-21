<template>
  <v-card>
    <div v-if="!linked">
      Sinulla ei ole vielä AKL-tunnusta liitettynä Steam tiliisi. Täytä tämä
      lomake luodaksesi AKL-tunnuksen.
    </div>
    <v-form ref="registerForm" v-model="valid" lazy-validation v-if="!success">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="username"
              :rules="[rules.required]"
              label="Username"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="firstName"
              :rules="[rules.required]"
              label="First Name"
              maxlength="20"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="lastName"
              :rules="[rules.required]"
              label="Last Name"
              maxlength="20"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              autocomplete="new-password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              block
              v-model="verify"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, passwordMatch]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Confirm Password"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
            <v-btn
              x-large
              block
              :disabled="!valid"
              color="success"
              @click="register"
            >
              Register
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container v-else>
      <h2>Tunnus luotu.</h2>
      Lähetimme sähköpostiisi varmistusviestin. Seuraa sähköpostin ohjeita
      varmistaaksesi tunnuksen. Etkö saanut varmistusviestiä?
      <a @click="resendVerification">Klikkaa tästä</a>
      lähettääksesi uuden viestin.
      <v-spacer></v-spacer>
      <a href="/akl">Etusivulle</a>
    </v-container>
  </v-card>
</template>

<script>
import jwt_decode from 'jwt-decode';

export default {
  name: 'RegisterView',
  data() {
    return {
      valid: true,

      firstName: '',
      lastName: '',
      email: '',
      password: '',
      verify: '',
      linked: true,
      loginPassword: '',
      loginEmail: '',
      loginEmailRules: [
        v => !!v || 'Required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      emailRules: [
        v => !!v || 'Required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],

      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 8) || 'Min 8 characters'
      },
      success: false,
      username: ''
    };
  },
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || 'Password must match';
    }
  },
  methods: {
    register() {
      this.$store.dispatch('startLoading');
      this.$store
        .dispatch('formRegister', {
          username: this.username,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          emailAddress: this.email
        })
        .then(() => {
          this.success = true;
        });

      this.$store.dispatch('stopLoading');
    },

    async resendVerification(e) {
      e.preventDefault();
      this.$store.dispatch('resendVerificationEmail');
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);

    const status = urlParams.get('status');
    const linked = urlParams.get('linked') === 'true';
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');

    window.history.replaceState({}, document.title, '/akl/register');

    if ((status === 'OK' || status === 'CREATED') && accessToken) {
      const tokenData = jwt_decode(accessToken);

      if (!tokenData.roles.includes('unregistered')) {
        window.history.pushState({}, '', '/akl');
        return;
      }

      this.linked = linked;
      this.$store.commit('setTokens', {
        status,
        accessToken,
        refreshToken
      });
    }
  }
};
</script>

<style scoped></style>
