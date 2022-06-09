<template>
  <div>
    <v-card>
      <v-card-title>Teilnehmer</v-card-title>
      <v-expansion-panels>
        <v-expansion-panel v-for="user in users" :key="user.username">
          <v-expansion-panel-header>
            {{ user.username }} {{ user.email }} {{ user.role }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn color="red">Entfernen</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <v-card>
      <v-card-title>Vorangemeldete</v-card-title>
      <v-expansion-panels>
        <v-expansion-panel v-for="user in users" :key="user.username">
          <v-expansion-panel-header>
            {{ user.username }} {{ user.email }} {{ user.role }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn color="red">Entfernen</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-card-actions>
        <v-btn @click="getUsers">Reload</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import user from "../services/user.service";
export default {
  data() {
    return {
      users: [],
      presale: [],
      rolesSelected: "",
      roles: ["Admin", "User"],
    };
  },
  methods: {
    getUsers() {
      user.getAllUsers().then((response) => {
        this.users = response.data;
      });
    },
    updateUser(item) {
      user.updateUser(item, this.rolesSelected);
      console.log(item);
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style></style>
