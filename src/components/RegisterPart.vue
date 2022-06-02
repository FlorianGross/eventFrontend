<template>
<v-card>
    <v-card-title>
        <span class="headline">Register</span>
        </v-card-title>
        <v-card-text>
        <v-form ref="form">
            <v-text-field v-model="username"
            :rules="usernameRules"
            label="Username"
            type="username"
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
        <v-btn color="primary" @click="register">Register</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'RegisterPart',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 6 || 'Password must be at least 6 characters'
            ],
            usernameRules: [
                v => !!v || 'Username is required',
                v => v.length >= 3 || 'Username must be at least 3 characters'
            ]
        }
    },
    methods: {
        register() {
            const form = this.$refs.form
            if (this.$refs.form.validate()) {
                this.$store.dispatch('auth/register', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }).then(() => {
                    this.$router.push('/profile')
                }).catch(() => {
                    this.$refs.form.validate()
                })
            }
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn
        }
    },
    created() {
        if (this.isLoggedIn) {
            this.$router.push('/profile')
        }
    }

}
</script>

<style>

</style>