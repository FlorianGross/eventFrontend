<template>
  <div class="bodyDetails">
    <v-card width="1850px">
      <v-card-title>
        <span class="headline">Admin </span>
      </v-card-title>
      <v-card>
        <v-card-title
          >Events <v-spacer></v-spacer>
          <v-btn @click="createEvent()">Event erstellen</v-btn></v-card-title
        >
        <v-expansion-panels>
          <v-expansion-panel v-for="event in events" :key="event.name">
            <v-expansion-panel-header>
              {{ event.name }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-btn color="blue" @click="editEvent(event._id)"
                >Bearbeiten</v-btn
              >
              <v-btn color="red">Delete</v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
      <user-management-part></user-management-part>
    </v-card>
  </div>
</template>

<script>
import UserManagementPart from "@/components/UserManagementPart.vue";
import User from "@/services/user.service";
import Event from "@/services/event.service";
export default {
  components: { UserManagementPart },
  name: "AdminPreView",
  data() {
    return {
      user: [],
      events: [],
    };
  },
  methods: {
    getUsers() {
      User.getAllUsers().then((response) => {
        this.user = response.data;
        console.log(response.data);
      });
    },
    getEvents() {
      Event.getAllEvents().then((response) => {
        this.events = response.data;
        console.log(response.data);
      });
    },
    editEvent(id) {
      this.$router.push("admin/" + id);
    },
    createEvent() {
      Event.createEvent({}).then((response) => {
        this.$router.push("admin/" + response.data._id);
      });
    },
  },
  mounted() {
    this.getEvents();
  },
};
</script>

<style>
.bodyDetails {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
}
</style>
