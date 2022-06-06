<template>
  <div>
    <v-card>
      <v-card-title>User</v-card-title>
      <v-expansion-panels>
        <v-expansion-panel v-for="user in users" :key="user">
          <v-expansion-panel-header>
            {{ user.username }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Rollen:<v-select
              :items="roles"
              multiple
              v-model="rolesSelected"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn color="blue">Update</v-btn>
            <v-btn color="red">Delete</v-btn>
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
      rolesSelected: [],
      roles: ["ROLE_ADMIN", "ROLE_USER"],
    };
  },
  methods: {
    getUsers() {
      user.getAllUsers().then((response) => {
        this.users = response.data;
        console.log(response.data);
      });
    },
  },
};
</script>

<style></style>
