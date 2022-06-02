<template>
<v-card>
    <v-card-title>
        <span class="headline" style="height: 0px">Login</span>
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
        <v-btn color="#000080" style="color:white; min-width: 140px; text-transform: none; font-family:Arial, Helvetica, sans-serif; margin-bottom: 10px;" @click="login">Login</v-btn>
        <v-btn color="#000080" style="color:white; min-width: 140px; text-transform: none; font-family:Arial, Helvetica, sans-serif; margin-bottom: 10px;" @click="register">Register</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
 name: 'LandingView',
data() {
        return {
            username: '',
            password: '',
            usernameRules: [
                v => !!v || 'Username is required',
                v => v.length >= 3 || 'Username must be at least 3 characters'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 6 || 'Password must be at least 6 characters'
            ]
        }
    },
    methods: {
        login() {
            if (this.$refs.form.validate()) {
            this.$store.dispatch("auth/login", {
                username: this.username,
                password: this.password
            }).then(() => {
                this.$router.push('/profile');
                }).catch(() => {
                this.isLoading = false;
                    this.$refs.form.validate();
                });
            }
        },
        register(){
            this.$router.push('/register');
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

</style>