<template>
  <div>
    <v-card style="padding-left: 1%; padding-right: 1%;">
      <v-card-title>User</v-card-title>
      <v-expansion-panels>
        <v-expansion-panel v-for="user in users" :key="user.id">
          <v-expansion-panel-header>
            {{ user.username }} {{ user.email }} {{ user.role }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Rollen:<v-select
              :items="roles"
              v-model="rolesSelected"
              hint="Rollen"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn color="blue" @click="updateUser(user, roles)">Update</v-btn>
            <v-btn color="red" @click="deleteUser(user.id)">Delete</v-btn>
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
      rolesSelected: "",
      roles: ["Admin", "User"],
    };
  },
  methods: {
    getUsers() {
      user.getAllUsers().then((response) => {
        this.users = response.data;
        console.log(response.data);
      });
    },
    updateUser(item) {
      user.updateUser(item, this.rolesSelected).then((response) => {
        this.getUsers();
      });
    },
    deleteUser(id) {
      user.deleteUser(id).then((response) => {
        this.getUsers();
      });
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style></style>
