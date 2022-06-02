<template>
  <v-app>
    <div v-if="loggedIn">
      <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
          />
          <v-btn href="/events" text>
            <span class="mr-2">Events</span>
            <v-icon>mdi-balloon</v-icon>
          </v-btn>
          <v-btn href="/calendar" text>
            <span class="mr-2">Kalender</span>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </div>

        <v-spacer></v-spacer>
        <v-btn href="/logout" text>
          <span class="mr-2">Logout</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-btn href="/profile" text>
          <span class="mr-2">Profil</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    <div v-if="!loggedIn">
      <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
          />
        </div>
        <v-spacer></v-spacer>
        <v-btn href="/datenschutz" text>
          <span class="mr-2">Datenschutz</span>
          <v-icon>mdi-account-lock</v-icon>
        </v-btn>
        <v-btn href="/impressum" text>
          <span class="mr-2">Impressum</span>
          <v-icon>mdi-security</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
const loggedIn = localStorage.getItem("user");
export default {
  name: "App",
  data() {
    return {
      loggedIn: loggedIn,
    };
  },
};
</script>
