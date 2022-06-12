<template>
  <div class="body-of-landingpage">
    <div class="loginField">
      <v-card v-if="isLogin">
        <v-card-title>
          <span>Login</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Username"
              type="username"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="loginButtons">
          <v-btn
            color="#000080"
            :disabled="isLoading"
            style="
          color: white;
          width: 30%;
          text-transform: none;
          font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          margin-bottom: 1%;
        "
            @click="performLogin"
            >Login</v-btn
          >
          <v-btn
            color="#000080"
            :disabled="isLoading"
            style="
          color: white;
          min-width: 30%;
          text-transform: none;
          font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          margin-bottom: 1%;
        "
            @click="register"
            >Register</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card v-if="isRegister">
        <v-card-title>
          <span>Register</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Username"
              type="text"
              required
            >
            </v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="loginButtons">
          <v-btn
            color="#000080"
            :disabled="isLoading"
            style="
          color: white;
          width: 30%;
          text-transform: none;
          font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          margin-bottom: 1%;
        "
            @click="performRegister"
            >Registrieren</v-btn
          >
          <v-btn
            color="#000080"
            :disabled="isLoading"
            style="
          color: white;
          width: 30%;
          text-transform: none;
          font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          margin-bottom: 1%;
        "
            @click="login"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card v-if="!isLogin && !isRegister" style="height: 50%">
        <v-card-title>
          <span class="headline">Willkommen</span>
        </v-card-title>
        <v-card-text id="wilkommen_txt">
          Willkommen bei VuetEvent. Hier können Sie alle anstehenden Events in
          Ihrem persönlichen Kalender organisieren und verwalten. Die
          Nostalgiker unter euch können auch die vergangenen Events einsehen und
          in Erinnerungen schwelgen.
        </v-card-text>
        <v-card-actions class="loginButtons">
          <v-btn
            color="#000080"
            style="
            color:white; 
            width: 30%; 
            text-transform: none; 
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            "
            @click="login"
            >Login</v-btn
          >
          <v-btn
            color="#000080"
            style="
            color:white; 
            width: 30%;  
            text-transform: none; 
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          "
            @click="register"
            >Registrieren</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingView",
  data() {
    return {
      isLoading: false,
      isLogin: false,
      isRegister: false,
      username: "",
      email: "",
      password: "",
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) => v.length >= 3 || "Username must be at least 3 characters",
      ],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be at least 6 characters",
      ],
    };
  },
  methods: {
    login() {
      this.isLogin = true;
      this.isRegister = false;
    },
    performLogin() {
      this.isLoading = true;
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("auth/login", {
            username: this.username,
            password: this.password,
          })
          .then(() => {
            this.$router.push("/profile");
          })
          .catch(() => {
            this.isLoading = false;
            this.$refs.form.validate();
          });
      }
    },
    register() {
      this.isLogin = false;
      this.isRegister = true;
    },
    performRegister() {
      this.isLoading = true;
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("auth/register", {
            username: this.username,
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.$store
              .dispatch("auth/login", {
                username: this.username,
                password: this.password,
              })
              .then(() => {
                this.$router.push("/profile");
              });
          })
          .catch(() => {
            this.$refs.form.validate();
            this.isLoading = false;
          });
      }
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
  overflow: hidden;
}
.loginField {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  margin-left: auto;
  margin-right: auto;
}
.loginButtons {
  display: ce;
  justify-content: space-around;
  padding-top: 7%;
}
</style>
