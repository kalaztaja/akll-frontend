<template>
  <v-footer class="footer" padless>
    <v-layout>
      <v-flex>
        <v-row justify="center" align="center" no-gutters class="extra-row">
          <v-col text-center justify="center" align="center">
            <div class="logo">
              <h3 class="logo-short">AKL</h3>
              <h4 class="logo-full-top">Akateeminen</h4>
              <h4 class="logo-full-bottom">Kynäriliiga</h4>
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn
              href="https://t3g.fi"
              active-class="no-active"
              :color="'#272727'"
              depressed
              class="t3g-button"
            >
              <strong>Organized by T3G</strong>
            </v-btn>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  background-color: #272727 !important;
}
.logo {
  position: relative;
  display: inline-block;
  cursor: default;
  height: 50px;
  color: white;
  font-family: Raleway;
}
.logo-short {
  line-height: 1;
  font-size: 50px;
  font-style: italic;
  font-weight: bold;
  margin: 0;
}
.logo-full-top,
.logo-full-bottom {
  position: absolute;
  left: 100px;
  display: inline-block;
  line-height: 27px;
  font-size: 20px;
  text-transform: uppercase;
  margin: 0;
}
.logo-full-top {
  top: 0;
}
.logo-full-bottom {
  bottom: 0;
  letter-spacing: 0.085em;
}
.extra-row {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
</style>
