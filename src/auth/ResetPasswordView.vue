<template>
  <v-container>
    <div v-if="!passwordChange">
      <h1>{{ $t('DidYouForgetPassword') }}</h1>
      {{ $t('PasswordResetMsg') }}
      <v-form lazy-validation>
        <v-text-field
          v-model="email"
          maxlength="50"
          :label="$t('Email')"
          required
        />
        <v-btn x-large inlineblock color="success" @click="sendResetPassword">
          {{ $t('Send') }}
        </v-btn>
      </v-form>
    </div>
    <div v-if="passwordChange">
      {{ $t('SetNewPassword') }}
      <v-form lazy-validation>
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
        <v-btn x-large inlineblock color="success" @click="resetPassword">
          {{ $t('ResetPassword') }}
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
        required: value => !!value || this.$i18n.t('Required'),
        min: v => (v && v.length >= 8) || this.$i18n.t('Min8Characters')
      }
    };
  },
  computed: {
    passwordMatch() {
      return () =>
        this.password === this.verify || this.$i18n.t('PasswordMustMatch');
    }
  },
  methods: {
    async sendResetPassword() {
      try {
        await this.$store.dispatch('sendPasswordReset', { email: this.email });
        this.$store.dispatch(
          'setAlertSuccess',
          this.$i18n.t('ResetEmailHasBeenSent')
        );
      } catch (error) {
        this.$store.dispatch('setAlertError', this.$i18n.t('InvalidEmail'));
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
          this.$i18n.t('PasswordResetSuccess')
        );
        this.$router.push('/login');
      } catch (error) {
        this.$store.dispatch('setAlertError', this.$i18n.t('ErrorHappened'));
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
