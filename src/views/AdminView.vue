<template>
  <div class="bodyDetails">
    <v-card width="1850px">
      <v-card-title>
        <span class="headline">Events</span>
        <v-spacer></v-spacer>
        <v-btn> Event Speichern</v-btn>
        <v-btn> Event veröffentlichen</v-btn>
      </v-card-title>
      <v-card style="height: 1px"></v-card>
      <v-container>
        <v-layout row-wrap>
          <v-card class="cards" min-height="400px">
            <div class="grid-containerDetails" style="margin-top: 0px">
              <div id="app">
                <v-app id="inspire">
                  <v-card max-width="375" height="1100px" class="mx-auto">
                    <v-img
                      class="profilBildEvent"
                      src="../assets/WelcomeBackParty _2022.jpg"
                      height="auto"
                      weight="auto"
                      dark
                    >
                    </v-img>
                    <div>Dies ist der Platzhalter für den Veranstatler</div>
                  </v-card>
                </v-app>
              </div>
            </div>
          </v-card>
          <v-card width="500px" style="padding-left: 20px">
            <v-form>
              <v-text-field label="Event Name"> </v-text-field>
              <v-textarea label="Beschreibung"> </v-textarea>
              <v-row>
                Beginn:
                <v-col cols="12" sm="6" md="4">
                  <v-menu
                    ref="menu"
                    v-model="menu1"
                    :close-on-content-click="false"
                    :return-value.sync="beginDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="beginDate"
                        label="Datum"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu1 = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(beginDate)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="11" sm="5">
                  <v-menu
                    ref="menu"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="beginTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="beginTime"
                        label="Uhrzeit"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu2"
                      v-model="beginTime"
                      full-width
                      @click:minute="$refs.menu.save(beginTime)"
                    ></v-time-picker>
                  </v-menu> </v-col
                >
              </v-row>
              <v-row>
                Ende:
                <v-col cols="12" sm="6" md="4">
                  <v-menu
                    ref="menu"
                    v-model="menu3"
                    :close-on-content-click="false"
                    :return-value.sync="endDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="endDate"
                        label="Datum"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="endDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu3 = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(endDate)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="11" sm="5">
                  <v-menu
                    ref="menu"
                    v-model="menu4"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="endTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="endTime"
                        label="Uhrzeit"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu4"
                      v-model="endTime"
                      full-width
                      @click:minute="$refs.menu.save(endTime)"
                    ></v-time-picker>
                  </v-menu> </v-col
                >
              </v-row>
              Begin: {{ beginDate }} {{ beginTime }} Ende: {{ endDate }} {{ endTime }}
              <v-text-field label="Event Ort"> </v-text-field>
              <v-text-field label="Event Datum"> </v-text-field>
              <v-text-field label="Event Beschreibung"> </v-text-field>
              <v-file-input label="Event Bild"> </v-file-input>
              <v-text-field label="Event Link"> </v-text-field>
            </v-form>
          </v-card>
          <v-card>
            <user-management-part></user-management-part>
          </v-card>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import UserManagementPart from "@/components/UserManagementPart.vue";
export default {
  components: { UserManagementPart },
  name: "AdminView",
  data() {
    return {
      beginTime: null,
      beginDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      endTime: null,
      endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      event: {
        creater: "",
        name: "",
        description: "",
        image: "",
        location: "",
        start: "",
        end: "",
        maxParticipants: "",
        cost: "",
      },
    };
  },
  methods: {
    addDetails(name, werte) {
      this.details.push({
        name: name,
        werte: werte,
      });
      this.dialog = false;
    },
    deleteLastDetail() {
      this.details.pop();
    },
  },
  created() {
    this.id = this.$route.params.id;
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
.grid-containerDetails {
  height: auto;
  margin-top: 20px;
  margin-left: 20px;
  display: grid;
  grid-template-columns: auto auto auto;
}
.grid-buchungDetails {
  height: auto;
  margin-top: 100px;
  margin-left: 120px;
  display: grid;
  grid-template-columns: auto auto;
}
.textDetails {
  margin-left: 100px;
}
.profilBildDetails {
  width: 100%;
  height: 100%;
}
.mx-1 {
  margin-top: 12%;
}
</style>
