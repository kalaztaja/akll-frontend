<template>
  <v-card>
    <div v-if="steamToken && !success">
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
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="firstName"
              :rules="[rules.required]"
              label="First Name"
              maxlength="20"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="surname"
              :rules="[rules.required]"
              label="Surname"
              maxlength="40"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            />
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
            />
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
            />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="university" label="University" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="guild" label="Guild" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="age" label="Age" type="number" />
          </v-col>

          <v-spacer />
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
      <v-spacer />
      <router-link to="/">Etusivulle</router-link>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'RegisterView',
  props: {
    steamToken: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      valid: true,

      firstName: '',
      surname: '',
      email: '',
      password: '',
      verify: '',
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
      username: '',
      university: '',
      guild: '',
      age: 18
    };
  },
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || 'Password must match';
    }
  },
  methods: {
    async register() {
      this.$store.dispatch('startLoading');
      const formData = {
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        surname: this.surname,
        email: this.email,
        university: this.university,
        guild: this.guild,
        age: this.age
      };

      if (this.steamToken) formData.steamRegistrationToken = this.steamToken;

      await this.$store.dispatch('formRegister', formData);
      this.success = true;

      this.$store.dispatch('stopLoading');
    },

    async resendVerification(e) {
      e.preventDefault();
      this.$store.dispatch('resendVerificationEmail');
    }
  },
  created() {
    console.log('register', this.steamToken);
  }
};
</script>

<style scoped></style>
