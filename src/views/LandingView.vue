<template>
  <div class="body-of-landingpage">
    <div class="loginField">
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
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
          <v-btn color="primary" @click="login">Login</v-btn>
          <v-btn color="primary" @click="register">Register</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
    name: 'LandingView',
    data() {
        return {
            isLoading: false,
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 6 || 'Password must be at least 6 characters'
            ]
        }
    },
    methods: {
        login() {
          this.isLoading = true;
            if (this.$refs.form.validate()) {
              this.$store.dispatch("auth/login", {
                email: this.email,
                password: this.password
              }).then(() => {
                this.$router.push('/profile');
                }).catch(() => {
                  this.isLoading = false;
                    this.$refs.form.validate();
                });
            }
        }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
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