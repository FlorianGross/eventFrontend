<template>
  <div class="body-of-landingpage">
    <div class="loginField">
      <login-part v-if="isLogin"></login-part>
      <register-part v-if="isRegister"></register-part>
      <v-card
        v-if="!isLogin && !isRegister"
        style="height: 250px"
      >
        <v-card-title>
          <span class="headline">Willkommen</span>
        </v-card-title>
        <v-card-text id="wilkommen_txt">
          Willkommen bei VuetEvent. Hier können Sie alle anstehenden Events in Ihrem persönlichen Kalender organisieren und verwalten. Die Nostalgiker unter euch können auch die vergangenen Events einsehen und in Erinnerungen schwelgen.
        </v-card-text>
        <v-card-actions class="loginButtons">
          <v-btn
            color="#000080"
            style="
            color:white; 
            min-width: 140px; 
            text-transform: none; 
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            "
            @click="login"
          >Login</v-btn>
            <v-btn
              color="#000080"
              style="
            color:white; 
            min-width: 140px; 
            text-transform: none; 
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          "
              @click="register"
            >Registrieren</v-btn>
        </v-card-actions>
        </v-card>
    </div>
  </div>
</template>

<script>
import LoginPart from "../components/LoginPart.vue";
import RegisterPart from "../components/RegisterPart.vue";
export default {
  components: { LoginPart, RegisterPart },
  name: "LandingView",
  data() {
    return {
      isLoading: false,
      isLogin: false,
      isRegister: false,
    };
  },
  methods: {
    login() {
      this.isLogin = true;
      this.isRegister = false;
    },
    register() {
      this.isLogin = false;
      this.isRegister = true;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style>
.headline {
  color: black;
  margin-left: auto;
  margin-right: auto;
}
.wilkommen_txt {
  text-align: left;
}
.body-of-landingpage {
  position: fixed;
  background-color: #123456;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0;
  margin: 0;
  background-image: url("../assets/WebProg4.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.loginField {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  margin-left: auto;
  margin-right: auto;
}
.loginButtons {
  display: ce;
  justify-content: space-around;
  padding-top: 25px;
}
</style>