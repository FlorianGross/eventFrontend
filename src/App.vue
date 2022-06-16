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
          <v-btn 
          class="mr-2" 
          style="font-size: clamp(0.7rem, 0.9vw, 0.9rem);"
          @click="openEvents" text>
            <span class="mr-2">Events</span>
            <v-icon style="font-size: clamp(1.3rem, 1.5vw, 1.6rem);">mdi-balloon</v-icon>
          </v-btn>
          <v-btn 
          class="mr-2" 
          style="font-size: clamp(0.7rem, 0.9vw, 0.9rem);" 
          @click="openCalendar" text>
            Kalender
            <v-icon style="margin-left: 4%; font-size: clamp(1.3rem, 1.5vw, 1.6rem);">mdi-account</v-icon>
          </v-btn>
          <v-btn 
          class="mr-2" v-if="isAdmin"
          style="font-size: clamp(0.7rem, 0.9vw, 0.9rem);" 
          @click="openAdmin" text>
            Admin
            <v-icon style="margin-left: 4%; font-size: clamp(1.3rem, 1.5vw, 1.6rem);">mdi-shield-crown-outline</v-icon>
          </v-btn>
        </div>

        <v-spacer></v-spacer>
        <v-btn 
        class="mr-2" 
        style="font-size: clamp(0.7rem, 0.9vw, 0.9rem);" 
        href="/logout" text>
          Logout
          <v-icon style="margin-left: 4%; font-size: clamp(1.3rem, 1.5vw, 1.6rem);">mdi-logout</v-icon>
        </v-btn>
        <v-btn 
        class="mr-2"
        style="font-size: clamp(0.7rem, 0.9vw, 0.9rem);" 
        @click="openProfile" text>
          Profil
          <v-icon style="margin-left: 4%; font-size: clamp(1.3rem, 1.5vw, 1.6rem);">mdi-account</v-icon>
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
        <v-btn 
        class="mr-2" 
        style="font-size: clamp(0.7rem, 0.9vw, 0.9rem);" 
        @click="openDatenschutz" text>
          Datenschutz
          <v-icon style="margin-left: 4%; font-size: clamp(1.3rem, 1.5vw, 1.6rem);">mdi-account-lock</v-icon>
        </v-btn>
        <v-btn 
        class="mr-2" 
        style="font-size: clamp(0.7rem, 0.9vw, 0.9rem);"
        @click="openImpressum" text>
          Impressum
          <v-icon style="margin-left: 4%; font-size: clamp(1.3rem, 1.5vw, 1.6rem);">mdi-security</v-icon>
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
