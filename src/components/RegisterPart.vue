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

}
</script>

<style>

</style>