<template>
  <v-container fluid class="home-container">
    <v-row align="center" justify="center">
      <v-col>
        <v-img
          max-height="60vh"
          max-width="100vw"
          :src="
            isCsgo
              ? require('@/assets/AKLBanner.png')
              : require('@/assets/ALLBanner.png')
          "
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" justify="center" xs="6" md="6">
        <v-card v-if="isCsgo">
          <v-img
            class="white--text align-end"
            height="88px"
            src="@/assets/AKLLBannerMatches.png"
          >
            <v-card-title />
          </v-img>
          <v-card-title class="text-left">
            {{ $t('AKLMatchTitle') }}
          </v-card-title>
          <v-card-subtitle class="text-left">
            {{ $t('MatchMessage') }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer />
            <v-btn text :to="'matches/all'">
              {{ $t('MatchATeam') }}
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else>
          <v-img
            class="white--text align-end"
            height="88px"
            src="@/assets/ALLJoin.png"
          >
            <v-card-title />
          </v-img>
          <v-card-title class="text-left">
            {{ $t('ALLJoinTitle') }}
          </v-card-title>
          <v-card-subtitle class="text-left">
            {{ $t('JoinMessage') }}
          </v-card-subtitle>
          <v-card-actions>
            <v-btn v-if="!this.$store.getters.loggedIn" text :to="'register'">
              {{ $t('Login') }}
            </v-btn>

            <v-spacer />
            <v-btn v-if="this.$store.getters.loggedIn" text :to="'teams'">
              {{ $t('JoinATeam') }}
            </v-btn>
            <v-btn v-else text :to="'register'">{{ $t('Register') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col align="center" justify="center" xs="6" md="6">
        <v-card>
          <v-img
            class="white--text align-end"
            height="88px"
            src="@/assets/DiscordLogo.png"
          />
          <v-card-title class="text-left">
            {{ $t('DiscordTitle') }}
          </v-card-title>
          <v-card-subtitle class="text-left">
            {{ $t('DiscordMessage') }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              :href="
                isCsgo
                  ? 'https://discord.gg/xd2BTyY'
                  : 'http://discord.gg/unB7YDP'
              "
            >
              {{ $t('JoinDiscord') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { env } from '../../env';

export default {
  name: 'HomePage',
  computed: {
    isCsgo() {
      return env.game === 'csgo' ? true : false;
    }
  }
};
</script>

<style></style>
