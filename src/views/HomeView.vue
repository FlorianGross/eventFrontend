<template>
  <div class="body">
    <v-card width="96.4%">
      <v-card-title>
        <span class="headline">Events</span>
      </v-card-title>
      <v-card style="height: 1px"></v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex v-for="event in events" :key="event._id" xl4 lg6 md7 sm9 xs12>
            <div class="item" @click="eventClick(event._id)">
              <v-card class="cards" height="400px">
                <div class="grid-containerEvent">
                  <img class="profilBildEvent" :src="event.image" />
                  <div class="textEvent">
                    <div>
                      <v-card class="eventVCardBeschreibung">
                        <div class="eventText">
                          <b>{{ event.name }}</b>
                          <v-divider></v-divider>
                          {{ getEventDescription(event) }}
                        </div>
                      </v-card>
                    </div>
                  </div>
                </div>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import router from "@/router";
import Event from "@/services/event.service";
export default {
  name: "HomeView",
  data() {
    return {
      events: [],
    };
  },
  methods: {
    getEventDescription(event) {
      if (event.description.length > 300) {
        return event.description.substring(0, 300) + "...";
      } else {
        return event.description;
      }
    },
    eventClick(event) {
      router.push({ path: "/event/" + event }).catch(() => {});
    },
    getEvents() {
      Event.getAllEvents().then((response) => {
        this.events = response.data;
        console.log(response.data);
      });
    },
  },
  mounted() {
    this.getEvents();
  },
};
</script>
<style>
.item {
  margin: 5%;
}
.body {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.8%;
}

.grid-containerEvent {
  margin-top: 4.1%;
  margin-left: 2%;
  display: grid;
  grid-template-columns: 45% 130%;
}
.profilBildEvent {
  width: 100%;
  height: 100%;
  margin-top: 5%;
}
.textEvent {
  margin-top: 2%;
  max-width: 35%;
  margin-left: 5%;
}
.eventVCardBeschreibung {
  min-height: 350px;
  min-width: 100%;
  overflow: auto;
  font-size: clamp(0.7rem, 0.9vw, 1rem);
}
.eventText {
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 2%;
  font-size: clamp(0.7rem, 0.9vw, 1rem);
}
.headline {
  color: black;
  margin-left: auto;
  margin-right: auto;
}
</style>
