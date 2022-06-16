<template>
  <div class="body-of-landingpage">
    <div class="loginField">
      <v-alert v-if="alert" :color="success ? 'green' : (isLoading ? 'blue' : 'red')" :type="success ? 'success' : (isLoading ? 'info' : 'error')">{{message}}</v-alert>
      <v-card v-if="isLogin">
        <h2 style="font-size: clamp(0.9rem, 1.34vw, 1.8rem); text-align: center; margin-bottom: 1.5%;padding-top: 1.5%;">Login</h2>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              style="font-size: clamp(0.7rem, 0.9vw, 1.0rem);"
              label="Username"
              type="username"
              
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              style="font-size: clamp(0.7rem, 0.9vw, 1.0rem);"
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
          font-size: clamp(0.7rem, 0.8vw, 0.9rem);
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
          font-size: clamp(0.7rem, 0.8vw, 0.9rem);
          font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          margin-bottom: 1%;
        "
            @click="register"
            >Registrieren</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card v-if="isRegister">
        <h2 style="font-size: clamp(0.9rem, 1.34vw, 1.8rem); text-align: center; margin-bottom: 1.5%;padding-top: 1.5%;">Registrierung</h2>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              style="font-size: clamp(0.7rem, 0.9vw, 1.0rem);"
              label="Username"
              type="text"
              required
            >
            </v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              style="font-size: clamp(0.7rem, 0.9vw, 1.0rem);"
              label="Email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              style="font-size: clamp(0.7rem, 0.9vw, 1.0rem);"
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
          font-size: clamp(0.7rem, 0.8vw, 0.9rem);
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
          font-size: clamp(0.7rem, 0.8vw, 0.9rem);
          font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          margin-bottom: 1%;
        "
            @click="login"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card v-if="!isLogin && !isRegister" style="height: 50%">
        <h2 style="font-size: clamp(0.9rem, 1.34vw, 1.8rem); text-align: center; margin-bottom: 1.5%;padding-top: 1.5%;">Willkommen</h2>
        <v-divider style="margin-bottom: 2%;"></v-divider>
        <v-card-text class="schriftgroessen">
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
            margin-bottom: 1.5%;
            text-transform: none; 
            font-size: clamp(0.7rem, 0.8vw, 0.9rem);
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
            margin-bottom: 1.5%;
            text-transform: none; 
            font-size: clamp(0.7rem, 0.8vw, 0.9rem);
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
      alert: false,
      message: "",
      success: false,
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
            this.isLoading = false;
            this.success = true;
            this.message = "Login successful";
            this.alert = true;
            this.$router.push("/profile");
          })
          .catch(() => {
            this.isLoading = false;
            this.$refs.form.validate();
            this.message = "Login failed";
            this.success = false;
            this.alert = true;
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
                this.success = true;
                this.message = "Registration successful. You can now login.";
                this.isLoading = false;
                this.alert = true;
                this.$router.push("/profile");
              });
          })
          .catch((e) => {
            this.$refs.form.validate();
            this.isLoading = false;
            this.message = "Registration failed";
            this.success = false;
            this.alert = true;
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
  margin-left: 40%;
  font-size: clamp(0.9rem, 1vw, 1.3rem)
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
.schriftgroessen {
  font-size: clamp(0.7rem, 0.9vw, 1.0rem);
}
</style>
