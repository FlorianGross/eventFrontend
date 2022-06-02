<template>
  <div class="body-of-landingpage">
    <div class="loginField">
      <login-part v-if="isLogin"></login-part>
      <register-part v-if="isRegister"></register-part>
      <v-card v-if="!isLogin && !isRegister">
        <v-card-title>
          <span class="headline">Wilkommen</span>
        </v-card-title>
        <v-card-text>
          Wilkommen auf unserer Seite
        </v-card-text>
        <v-card-actions class="loginButtons">
          <v-btn color="primary" @click="login">Login</v-btn>
          <v-btn color="primary" @click="register">Register</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import LoginPart from '../components/LoginPart.vue';
export default {
  components: { LoginPart },
    name: 'LandingView',
    data() {
        return {
            isLoading: false,
            isLogin: false,
            isRegister: false,
        }
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
    created(){
      if(this.loggedIn){
        this.$router.push('/profile');
      }
    }
}
</script>

<style>
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
  background-image: url("../assets/disco_party_berlin.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.loginField {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 30%;
  text-align: center;
}
.loginButtons {
  display: ce;
  justify-content: space-around;
}
</style>