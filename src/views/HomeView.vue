<template>
  <div class="body">
    <v-card width="1850px">
      <v-card-title>
        <span class="headline">Events</span>
      </v-card-title>
      <v-card style="height: 1px"></v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex v-for="n in 9" :key="n" xl4 lg6 md7 sm9 xs12>
            <div class="item" @click="eventClick(n)">
              <v-card class="cards" height="400px">
                <div class="grid-containerEvent" style="margin-top: 0px">
                  <img
                    class="profilBildEvent"
                    src="../assets/WelcomeBackParty _2022.jpg"
                  />
                  <div class="textEvent">
                    <div>
                      Hier können wir eine Beschreibung für die Events einfügen
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

export default {
  name: "HomeView",
  methods: {
    eventClick(event) {
      router.push({ path: "/event/" + event }).catch(() => {});
    },
  },
};
</script>
<style>
.item {
  margin: 20px;
}
.body {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
}

.grid-containerEvent {
  margin-top: 20px;
  margin-left: 20px;
  display: grid;
  grid-template-columns: 250px 700px;
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
</style>
