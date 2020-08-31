<template>
  <v-card>
    <v-form ref="editForm" v-model="valid" lazy-validation v-if="!success">
      <v-container>
        <v-row>
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
              @click="editUserInfo"
            >
              Update
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
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
      oldPassword: '',
      verify: '',
      newPassword: '',
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
  methods: {
    async editUserInfo() {
      this.$store.dispatch('startLoading');
      const formData = {
        id: this.$route.params.id,
        username: this.username,
        firstName: this.firstName,
        surname: this.surname,
        university: this.university,
        guild: this.guild,
        age: this.age
      };

      await this.$store.dispatch('editUserInfo', formData);

      this.$store.dispatch('stopLoading');
      this.$store.dispatch('setAlertSuccess', 'Tiedot päivitetty');
      this.$router.replace(`/user/${this.$route.params.id}`);
    },

    setUser(user) {
      const { firstName, surname, email, university, guild, age } = user;

      this.firstName = firstName;
      this.surname = surname;
      this.email = email;
      this.university = university;
      this.guild = guild;
      this.age = age;
    }
  },
  async created() {
    if (this.$route.params.user) {
      this.setUser(this.$route.params.user);
    } else if (this.$route.params.id === this.$store.getters.userInfo._id) {
      const user = await this.$store.dispatch(
        'getUserInfoById',
        this.$route.params.id
      );
      this.setUser(user);
    } else {
      this.$router.replace(`/user/${this.$route.params.id}`);
    }
  }
};
</script>

<style scoped></style>
