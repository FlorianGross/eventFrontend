<template>
  <div>
    <v-card>
      <v-card-title class="ueberschriften">Teilnehmer</v-card-title>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="user in users"
          :key="user.username"
        >
          <v-expansion-panel-header class="schriftgroessen">
            {{ user.username }} {{ user.email }} {{ user.role }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn color="red">Entfernen</v-btn>
          </v-expansion-panel-content>
          </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <v-card>
      <v-card-title
        class="ueberschriften"
        style="margin-top: 20px"
      >Vorangemeldete</v-card-title>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="user in preOrders"
            :key="user.username"
          >
            <v-expansion-panel-header class="schriftgroessen">
              {{ user.username }} {{ user.email }} {{ user.role }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-btn color="red">Entfernen</v-btn>
            </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-card-actions>
          <v-btn
            @click="getUsers"
            color="#000080"
            style="font-size: clamp(0.6rem, 0.8vw, 0.9rem); 
        color:white; 
        min-width: 20%;
        text-transform: none; 
        font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"
          >Reload</v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Event from "../services/event.service";
export default {
  data() {
    return {
      users: [],
      preOrders: [],
      rolesSelected: "",
      roles: ["Admin", "User"],
    };
  },
  props: ["eventid"],
  methods: {
    getParticipants() {
      Event.getParticipants(this.eventid).then(response => {
        this.users = response.data;
        console.log(this.users);
      });
    },
    getPreOrders() {
      Event.getPreOrder(this.eventid).then(response => {
        this.preOrders = response.data;
        console.log(this.preOrders);
      });
    },
    getUsers() {
      this.getParticipants();
      this.getPreOrders();
    },
  },
  mounted() {
    this.getParticipants();
    this.getPreOrders();
  },
};
</script>

<style>
.schriftgroessen {
  font-size: clamp(0.7rem, 0.8vw, 0.9rem);
}
.ueberschriften {
  font-size: clamp(0.9rem, 1vw, 1.3rem);
}
</style>
