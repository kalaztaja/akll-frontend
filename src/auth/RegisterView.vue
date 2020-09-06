<template>
  <v-card class="main-container">
    <div v-if="steamToken && !success">
      {{ $t('RegisterSteamProfileText') }}
    </div>
    <v-form ref="registerForm" v-model="valid" lazy-validation v-if="!success">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="username"
              :rules="[rules.required]"
              :label="$t('Username')"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="firstName"
              :rules="[rules.required]"
              :label="$t('FirstName')"
              maxlength="20"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="surname"
              :rules="[rules.required]"
              :label="$t('Surname')"
              maxlength="40"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :label="$t('Email')"
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
              :label="$t('Password')"
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
              :label="$t('ConfirmPassword')"
              counter
              @click:append="show1 = !show1"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="university" :label="$t('University')" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="guild" :label="$t('Guild')" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="age" :label="$t('Age')" type="number" />
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
              {{ $t('Register') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container v-else>
      <h2 class="text-center display-1 mb-4">{{ $t('AccountCreated') }}</h2>
      <div class="mb-6">
        {{ $t('EmailConfMessage') }}
        <a @click="resendVerification">{{ $t('ClickHere') }}</a>
        {{ $t('EmailConfMessage2') }}
      </div>
      <v-spacer />
      <v-btn to="/">Etusivulle</v-btn>
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
        v => /.+@.+\..+/.test(v) || this.$i18n.t('EmailMustBeValid')
      ],
      emailRules: [
        v => !!v || 'Required',
        v => /.+@.+\..+/.test(v) || this.$i18n.t('EmailMustBeValid')
      ],

      show1: false,
      rules: {
        required: value => !!value || this.$i18n.t('Required'),
        min: v => (v && v.length >= 8) || this.$i18n.t('Min8Characters')
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
      return () =>
        this.password === this.verify || this.$i18n.t('PasswordMustMatch');
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
  }
};
</script>

<style scoped>
.main-container {
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
</style>
