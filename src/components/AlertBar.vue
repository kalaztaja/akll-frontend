<template>
  <v-snackbar
    v-model="snackbar"
    :color="color"
    :multi-line="true"
    :timeout="timeout"
    :bottom="true"
  >
    {{ storeText }}
    <v-btn dark text @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'AlertBar',
  data() {
    return {
      timeout: 3000,
      color: '',
      snackbar: '',
      colorMap: [
        'green darken-1',
        'light-blue darken-1',
        'red darken-2',
        'cyan darken-2'
      ],
      storeText: '',
      storeType: ''
    };
  },
  computed: {
    textPayload() {
      return this.$store.getters.getAlertText;
    }
  },
  watch: {
    textPayload(newValue) {
      if (newValue !== '') {
        this.storeText = this.$store.getters.getAlertText;
        this.storeType = this.$store.getters.getAlertType;
        if (this.storeType < 4 && this.storeType >= 0) {
          this.color = this.colorMap[this.storeType];
        } else {
          this.color = 'info';
        }
        this.snackbar = true;
      }
    },
    snackbar(newValue) {
      if (newValue === false) {
        this.$store.dispatch('clearError');
        this.storeText = '';
        this.color = 'info';
      }
    }
  }
};
</script>

<style></style>
