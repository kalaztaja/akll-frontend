<template>
  <div>
    <v-form lazy-validation>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      />
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        @click:append="show1 = !show1"
      />
      <v-btn x-large inlineblock color="success" @click="changeEmail">
        Change email
      </v-btn>
    </v-form>
  </div>
</template>
<script>
export default {
  name: 'EmailChange',
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
      password: '',
      show1: false,
      email: '',
      rules: {
        required: value => !!value || 'Required.'
      },
      emailRules: [
        v => !!v || 'Required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    };
  },
  methods: {
    async changeEmail() {
      const formData = {
        oldPassword: this.password,
        email: this.email,
        id: this.userId
      };
      this.$store.dispatch('editUserInfo', formData);
      this.successCallback();
    }
  }
};
</script>

<style scoped></style>
