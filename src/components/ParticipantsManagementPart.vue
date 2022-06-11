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
      <v-card-title style="margin-top: 20px">Vorangemeldete</v-card-title>
      <v-expansion-panels>
        <v-expansion-panel v-for="user in preOrders" :key="user.username">
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
      Event.getParticipants(this.eventid).then((response) => {
        this.users = response.data;
        console.log(this.users);
      });
    },
    getPreOrders() {
      Event.getPreOrder(this.eventid).then((response) => {
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

<style></style>
