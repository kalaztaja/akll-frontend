<template>
  <v-card>
    <v-form class="Register-team" @submit.prevent>
      <v-container>
        <v-row align="center">
          <v-col cols="12">
            <p class="display-1 text-center">{{ $t('CreateNewSeason') }}</p>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="seasonName"
              :rules="[rules.required]"
              :label="$t('SeasonName')"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="seasonNumber"
              :rules="[rules.required]"
              :label="$t('SeasonNumber')"
              type="number"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="division"
              :rules="[rules.required]"
              :label="$t('Division')"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="informationText"
              :rules="[rules.required]"
              :label="$t('Information')"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="challongeUri" :label="$t('ChallongeUri')" />
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="year" :label="$t('Year')" type="number" />
          </v-col>
          <v-col cols="4">
            <v-checkbox v-model="hidden" class="mx-2" :label="$t('Hidden')" />
          </v-col>
          <v-col cols="4" align="end">
            <v-btn
              color="success"
              class="form-button"
              @click="createOrEditSeason()"
              align="end"
            >
              {{ $t('Register') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import moment from 'moment';
import { env } from '../../env';

export default {
  name: 'SeasonRegisterView',
  props: {
    seasonId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editmode: false,
      seasonName: '',
      seasonNumber: '',
      division: '',
      informationText: '',
      year: moment().year(),
      hidden: false,
      challongeUri: '',
      rules: {
        required: value => !!value || this.$i18n.t('Required'),
        max: v => (v && v.length <= 11) || this.$i18n.t('TooLong')
      }
    };
  },
  methods: {
    async createOrEditSeason() {
      if (this.editmode) {
        await this.$store.dispatch('editSeason', this.mapStateToObject());
      } else {
        await this.$store.dispatch('createSeason', this.mapStateToObject());
      }
    },

    mapStateToObject() {
      return {
        seasonName: this.seasonName,
        seasonNumber: parseInt(this.seasonNumber, 10),
        division: this.division,
        informationText: this.informationText,
        year: this.year,
        hidden: this.hidden,
        game: env.game,
        challongeUri: this.challongeUri
      };
    },

    // stupid but easy way to set state
    setSeason(season) {
      const {
        seasonName,
        seasonNumber,
        division,
        informationText,
        year,
        hidden,
        challongeUri
      } = season;
      this.seasonName = seasonName;
      this.seasonNumber = seasonNumber;
      this.division = division;
      this.informationText = informationText;
      this.year = year;
      this.hidden = hidden;
      this.challongeUri = challongeUri;
      this.editmode = true;
    }
  },
  async created() {
    if (this.$route.params.seasonId) {
      const season = await this.$store.dispatch(
        'retrieveSeason',
        this.$route.params.seasonId
      );
      this.setSeason(season);
    }
  }
};
</script>

<style></style>
