<template>
  <div>
    Aseta uusi salasana.
    <v-form lazy-validation>
      <v-text-field
        v-model="oldPassword"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Old password"
        @click:append="show1 = !show1"
      />
      <v-text-field
        v-model="newPassword"
        autocomplete="new-password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="New password"
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
        label="Repeat new password"
        counter
        @click:append="show1 = !show1"
      />
      <v-btn x-large inlineblock color="success" @click="changePassword">
        Change password
      </v-btn>
    </v-form>
  </div>
</template>
<script>
export default {
  name: 'PasswordChange',
  props: {
    userId: {
      type: String,
      default: ''
    },
    successCallback: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
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
    async changePassword() {
      const formData = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        id: this.userId
      };
      this.$store.dispatch('editUserInfo', formData);
      this.successCallback();
    }
  }
};
</script>

<style scoped></style>
