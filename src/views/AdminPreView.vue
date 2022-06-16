<template>
  <div class="bodyDetails">
    <v-card width= 96.4% style="padding-bottom: 1%;">
      <v-card-title>
        <span class="headline">Admin </span>
      </v-card-title>
      <v-card style="padding-left: 1%; padding-right: 1%; margin-bottom: 3%;">
        <v-card-title class="ueberschriften">Events <v-spacer></v-spacer>
          <v-btn
          color="#000080"
            style="
            color:white; 
            width: 10%; 
            text-transform: none; 
            font-size: clamp(0.6rem, 0.8vw, 0.9rem)
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;" 
          @click="createEvent()">Event erstellen</v-btn></v-card-title
        >
        <v-expansion-panels>
          <v-expansion-panel v-for="event in events" :key="event.id">
            <v-expansion-panel-header class="schriftgroessen">
              {{ event.name }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-btn 
              color="blue"
                  style="
                  width: 6%; 
                  font-size: clamp(0.6rem, 0.8vw, 0.9rem); 
                  font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"
              @click="editEvent(event._id)"
                >Update</v-btn
              >
              <v-btn
              color="red" 
                  style="
                  width: 6%; 
                  font-size: clamp(0.6rem, 0.8vw, 0.9rem); 
                  font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"
              >Delete</v-btn>
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
  margin-top: 0.8%;
}
.headline {
  color: black;
  margin-left: auto;
  margin-right: auto;
}
.schriftgroessen {
  font-size: clamp(0.7rem, 0.9vw, 1.0rem);
}
.ueberschriften {
  font-size: clamp(0.9rem, 1vw, 1.3rem);
}
</style>
