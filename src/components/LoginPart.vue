<template>
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
</template>

<script>
export default {
 name: 'LandingView',
data() {
        return {
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

</style>