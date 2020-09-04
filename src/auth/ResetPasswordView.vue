<template>
  <v-container>
    <div v-if="!passwordChange">
      <h1>Unohditko salasanasi?</h1>
      Kirjoita sähköpostisiosoittesi ja lähetämme sinulle salasanan nollaus linkin.
      <v-form lazy-validation>
        <v-text-field v-model="email" maxlength="50" label="Email" required />
        <v-btn x-large inlineblock color="success" @click="sendResetPassword">
          Send
        </v-btn>
      </v-form>
    </div>
    <div v-if="passwordChange">
      Aseta uusi salasana.
      <v-form lazy-validation>
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
        <v-btn x-large inlineblock color="success" @click="resetPassword">
          Reset password
        </v-btn>
      </v-form>
    </div>
  </v-container>
</template>
<script>
export default {
  name: 'ResetPasswordView',
  data() {
    return {
      passwordChange: false,
      email: '',
      resetToken: '',
      password: '',
      verify: '',
      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 8) || 'Min 8 characters'
      }
    };
  },
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || 'Password must match';
    }
  },
  methods: {
    async sendResetPassword() {
      try {
        await this.$store.dispatch('sendPasswordReset', { email: this.email });
        this.$store.dispatch(
          'setAlertSuccess',
          'Sähköpostiisi on lähetetty nollauslinkki'
        );
      } catch (error) {
        this.$store.dispatch('setAlertError', 'Virheellinen sähköposti');
      }
    },
    async resetPassword() {
      try {
        await this.$store.dispatch('resetPassword', {
          resetToken: this.resetToken,
          newPassword: this.password
        });
        this.$store.dispatch(
          'setAlertSuccess',
          'Salasana on vaihdettu onnistuneesti! Voit nyt kirjautua uudella salasanalla.'
        );
        this.$router.push('/login');
      } catch (error) {
        this.$store.dispatch('setAlertError', 'Tapahtui virhe!');
      }
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const resetToken = urlParams.get('resetToken');
    if (resetToken) {
      this.passwordChange = true;
      this.resetToken = resetToken;
    }
  }
};
</script>
<style scoped></style>
