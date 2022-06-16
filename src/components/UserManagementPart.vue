<template>
  <div>
    <v-card style="padding-left: 1%; padding-right: 1%; margin-bottom: 3%;">
      <v-card-title class="ueberschriften">User</v-card-title>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="user in users"
          :key="user.id"
        >
          <v-expansion-panel-header class="schriftgroessen">
            {{ user.username }} {{ user.email }} {{ user.role }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="schriftgroessen">
            Rollen:
            <v-select
              :items="roles"
              v-model="rolesSelected"
              hint="Rollen"
            ></v-select>
              <v-spacer></v-spacer>
              <v-btn
                color="blue"
                style="
                  width: 6%; 
                  font-size: clamp(0.6rem, 0.8vw, 0.9rem); 
                  font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"
                @click="updateUser(user, roles)"
              >Update</v-btn>
                <v-btn
                  color="red" 
                  style="
                  width: 6%; 
                  font-size: clamp(0.6rem, 0.8vw, 0.9rem); 
                  font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"
                  @click="deleteUser(user.id)"
                >Delete</v-btn>
          </v-expansion-panel-content>
          </v-expansion-panel>
      </v-expansion-panels>
      <v-card-actions>
        <v-btn
          color="#000080"
          style="
          font-size: clamp(0.6rem, 0.8vw, 0.9rem); 
          margin-top: 1%;
          color:white; 
          min-width: 10%;
          text-transform: none; 
          font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"
          @click="getUsers"
        >Reload</v-btn>
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
      user.getAllUsers().then(response => {
        this.users = response.data;
        console.log(response.data);
      });
    },
    updateUser(item) {
      user.updateUser(item, this.rolesSelected).then(response => {
        this.getUsers();
      });
    },
    deleteUser(id) {
      user.deleteUser(id).then(response => {
        this.getUsers();
      });
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style>
.schriftgroessen {
  font-size: clamp(0.7rem, 0.9vw, 1rem);
}
.ueberschriften {
  font-size: clamp(0.9rem, 1vw, 1.3rem);
}
</style>
