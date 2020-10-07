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
        <v-carousel
          :continuous="true"
          :show-arrows="false"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          height="250"
          :cycle="true"
        >
          <v-carousel-item v-if="isCsgo">
            <v-card height="250">
              <router-link :to="'/matches/all'">
                <v-img
                  class="align-end"
                  height="88px"
                  src="@/assets/AKLLBannerMatches.png"
                >
                  <v-card-title />
                </v-img>
              </router-link>
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
          </v-carousel-item>
          <v-carousel-item>
            <v-card height="250">
              <a :href="'https://twitch.tv/tr3gamers'">
                <v-img
                  class="white--text align-end"
                  height="88px"
                  src="@/assets/AKLLTwitchLogo.png"
                >
                  <v-card-title />
                </v-img>
              </a>
              <v-card-title class="text-left">
                {{ $t('AKLTwitchTitle') }}
              </v-card-title>
              <v-card-subtitle class="text-left">
                {{ $t('TwitchMessage') }}
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer />
                <v-btn text :href="'https://twitch.tv/tr3gamers'">
                  {{ $t('TwitchAction') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-carousel-item>
          <v-carousel-item>
            <v-card height="250">
              <a :href="'https://t3g.fi'">
                <v-img
                  class="white--text align-end"
                  height="88px"
                  src="@/assets/AKLLT3GLogo.png"
                  :href="'https://t3g.fi'"
                >
                  <v-card-title />
                </v-img>
              </a>
              <v-card-title class="text-left">
                {{ $t('AKLLT3GTitle') }}
              </v-card-title>
              <v-card-subtitle class="text-left">
                {{ $t('AKLLT3GMessage') }}
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer />
                <v-btn text :href="'https://t3g.fi'">
                  {{ $t('AKLLT3GAction') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col align="center" justify="center" xs="6" md="6">
        <v-card>
          <a
            :href="
              isCsgo
                ? 'https://discord.gg/xd2BTyY'
                : 'http://discord.gg/unB7YDP'
            "
          >
            <v-img
              class="white--text align-end"
              height="88px"
              src="@/assets/DiscordLogo.png"
            />
          </a>
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
