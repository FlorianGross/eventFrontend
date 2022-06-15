<template>
  <v-app id="app">
    <v-app-bar v-if="this.$vuetify.breakpoint.name == 'xs'"></v-app-bar>
    <div v-if="loggedIn">
      <v-app-bar app color="#000000" dark>
        <div class="d-flex align-center">
          <div class="d-flex align-center" @click="openHome">
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              transition="scale-transition"
              width="40"
            />
          </div>
          <v-btn @click="openEvents" text>
            <span class="mr-2">Events</span>
            <v-icon>mdi-balloon</v-icon>
          </v-btn>
          <v-btn @click="openCalendar" text>
            <span class="mr-2">Kalender</span>
            <v-icon>mdi-account</v-icon>
          </v-btn>
          <v-btn v-if="isAdmin" @click="openAdmin" text>
            <span class="mr-2">Admin</span>
            <v-icon>mdi-shield-crown-outline</v-icon>
          </v-btn>
        </div>

        <v-spacer></v-spacer>
        <v-btn href="/logout" text>
          <span class="mr-2">Logout</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-btn @click="openProfile" text>
          <span class="mr-2">Profil</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    <div v-if="!loggedIn">
      <v-app-bar app color="#000000" dark>
        <div class="d-flex align-center" @click="openHome">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
        </div>
        <v-spacer></v-spacer>
        <v-btn @click="openDatenschutz" text>
          <span class="mr-2">Datenschutz</span>
          <v-icon>mdi-account-lock</v-icon>
        </v-btn>
        <v-btn @click="openImpressum" text>
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
import authService from "@/services/auth.service";
const loggedIn = localStorage.getItem("user");
export default {
  name: "App",
  data() {
    return {
      loggedIn: loggedIn,
      isAdmin: false,
    };
  },
  computed: {
    currentUser() {
      var user = this.$store.state.auth.user;
      if (user == null){
        return "";
      }
      else return user;
    },
  },
  watch: {
    currentUser() {
      this.loggedIn = this.$store.state.auth.user;
    },
  },
  mounted() {
    if(this.loggedIn){
    authService.getIsAdmin(this.currentUser.username).then((response) => {
      this.isAdmin = response.data;
    });
    }
  },
  methods: {
    openEvents() {
      this.$router.push("/events").catch(() => {});
    },
    openCalendar() {
      this.$router.push("/calendar").catch(() => {});
    },
    openAdmin() {
      this.$router.push("/admin").catch(() => {});
    },
    openProfile() {
      this.$router.push("/profile").catch(() => {});
    },
    openDatenschutz() {
      this.$router.push("/datenschutz").catch(() => {});
    },
    openImpressum() {
      this.$router.push("/impressum").catch(() => {});
    },
    openHome() {
      if (this.loggedIn) {
        this.$router.push("/home").catch(() => {});
      } else {
        this.$router.push("/").catch(() => {});
      }
    },
  },
};
</script>

<style>
#app {
  background: url("./assets/WebProg4.jpg");
  background-size: cover;
  background-size: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
