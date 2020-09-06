<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red" v-bind="attrs" v-on="on">
        {{ buttonText }}
        <v-icon dark right>mdi-cancel</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        {{ $t('AreYouSureYouWantTo') }} {{ dialogText }}?
      </v-card-title>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="red"
          text
          @click="
            dialog = false;
            callback();
          "
        >
          {{ $t('Yes') }}
        </v-btn>
        <v-btn color="white" text @click="dialog = false">
          {{ $t('Cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    buttonText: {
      type: String,
      default: 'Button'
    },
    dialogText: {
      type: String,
      default: 'do this'
    },
    callback: {
      type: Function,
      default: () => {}
    },
    icon: {
      type: String,
      default: 'mdi-cancel'
    }
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style scoped></style>
