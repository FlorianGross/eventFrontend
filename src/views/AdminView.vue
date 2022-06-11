<template>
  <div class="bodyDetails">
    <v-card width="1850px">
      <v-card-title>
        <span class="headline">Events</span>
        <v-spacer></v-spacer>
        <v-btn
          color="#000080"
          style="
            color:white; 
            min-width: 191px; 
            text-transform: none; 
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            margin-left: 2%;
            "
          @click="testDate()"
        >
          Test</v-btn
        >
        <v-btn
          color="#000080"
          style="
            color:white; 
            min-width: 191px; 
            text-transform: none; 
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            margin-right: 2%;
            "
          @click="deleteEvent()"
        >
          Event Löschen</v-btn
        >
        <v-btn
          color="#000080"
          style="
            color:white; 
            min-width: 191px; 
            text-transform: none; 
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"
          @click="saveEvent()"
          >Event Speichern</v-btn
        >
        <v-btn
          color="#000080"
          style="
            color:white; 
            min-width: 191px; 
            text-transform: none; 
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            margin-left: 2%;
            "
          @click="createEvent()"
        >
          Event veröffentlichen</v-btn
        >
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
                    <v-divider style="margin-top: 30px"></v-divider>
                    <v-card-title style="margin-top: 10px">
                      <span>Kontakt</span>
                    </v-card-title>
                    <v-divider style="margin-top: 5px"></v-divider>
                    <v-text-field
                      label="Kontaktperson"
                      v-model="event.contactPerson"
                      style="max-width: 90%; padding-left: 4.5%; margin-top: 3%"
                    >
                    </v-text-field>
                    <v-divider style="margin-top: 5px"></v-divider>
                    <v-text-field
                      label="Telefonnummer"
                      v-model="event.contactPhoneNumber"
                      style="max-width: 90%; padding-left: 4.5%; margin-top: 3%"
                    >
                    </v-text-field>
                    <v-divider style="margin-top: 5px"></v-divider>
                    <v-text-field
                      label="E-Mail"
                      v-model="event.contactEmail"
                      style="max-width: 90%; padding-left: 4.5%; margin-top: 3%"
                    >
                    </v-text-field>
                    <v-divider style="margin-top: 5px"></v-divider>
                  </v-card>
                </v-app>
              </div>
              <div class="textDetails">
                <v-card-title>
                  <span>Details</span>
                </v-card-title>
                <v-form>
                  <v-divider
                    style="margin-top: 3%; margin-bottom: 6%"
                  ></v-divider>
                  <v-text-field label="Name des Events" v-model="event.name">
                  </v-text-field>
                  <v-text-field
                    label="Veranstaltungsort"
                    v-model="event.location"
                  >
                  </v-text-field>
                  <v-text-field label="Besonderheiten" v-model="event.Specials">
                  </v-text-field>
                  <v-checkbox
                    label="Vorverkauf"
                    v-model="event.preSale"
                  ></v-checkbox>
                  <v-text-field
                    v-if="event.preSale"
                    label="Vorverkauf"
                    v-model="event.preSaleInfo"
                  ></v-text-field>
                  <v-file-input label="Bild"> </v-file-input>
                  <v-textarea
                    label="Beschreibung"
                    style="margin-top: 6%"
                    v-model="event.description"
                  >
                  </v-textarea>
                  <v-row style="margin-top: 6%; margin-left: 0.5%">
                    Beginn:
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        ref="menu1"
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
                        <v-date-picker v-model="beginDate" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu1 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu1.save(beginDate)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="11" sm="5">
                      <v-menu
                        ref="menu2"
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
                          format="24hr"
                          @click:minute="$refs.menu2.save(beginTime)"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row style="margin-left: 0.5%">
                    Ende:
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        ref="menu3"
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
                            @click="$refs.menu3.save(endDate)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="11" sm="5">
                      <v-menu
                        ref="menu4"
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
                          format="24hr"
                          @click:minute="$refs.menu4.save(endTime)"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-form>
              </div>
              <div class="textDetails">
                <v-card-title>
                  <span>Buchungsdetails</span>
                </v-card-title>
                <v-text-field
                  label="Eintrittspreis"
                  v-model="event.cost"
                  type="number"
                ></v-text-field>
                <v-text-field
                  label="Maximale Teilnehmeranzahl"
                  v-model="event.maxParticipants"
                  type="number"
                ></v-text-field>
                <participants-management-part-vue
                  style="margin-top: 2%"
                  :eventid="this.$route.params.id"
                ></participants-management-part-vue>
              </div>
            </div>
          </v-card>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Event from "../services/event.service.js";
import ParticipantsManagementPartVue from "@/components/ParticipantsManagementPart.vue";
export default {
  components: { ParticipantsManagementPartVue },
  name: "AdminView",
  data() {
    return {
      beginTime: null,
      beginDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      endTime: null,
      endDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      event: {
        id: "",
        name: "",
        description: "",
        image: "",
        location: "",
        start: null,
        end: null,
        maxParticipants: "",
        preSale: null,
        preSaleInfo: "",
        cost: "",
        eventSpecials: "",
        contactPerson: "",
        contactEmail: "",
        contactPhoneNumber: "",
        published: "",
      },
    };
  },
  methods: {
    testDate() {
      console.log(this.beginDate + ": " + this.beginTime);
      const result = new Date(
        this.beginDate + "T" + this.beginTime + ":00.000Z"
      );
      console.log(result);
    },
    getEvent() {
      Event.getEvent(this.$route.params.id).then((response) => {
        this.event = response.data;
      });
      this.event.id = this.$route.params.id;
      if (this.event.start) this.startDate = this.event.start.substr(0, 10);
      if (this.event.start) this.startTime = this.event.start.substr(11, 5);
      if (this.event.end) this.endDate = this.event.end.substr(0, 10);
      if (this.event.end) this.endTime = this.event.end.substr(11, 5);
    },
    getTime() {
      this.event.start = new Date(
        this.beginDate + "T" + this.beginTime + ":00.000Z"
      );
      this.event.end = new Date(this.endDate + "T" + this.endTime + ":00.000Z");
    },
    saveEvent() {
      if (this.beginDate && this.beginTime && this.endDate && this.endTime) {
        this.getTime();
      } else {
        console.log(
          "Dates not set: " +
            this.beginDate +
            " " +
            this.beginTime +
            " " +
            this.endDate +
            " " +
            this.endTime
        );
      }
      this.event.id = this.$route.params.id;
      Event.updateEvent(this.event).then((response) => {
        console.log(response);
      });
    },
    publishEvent() {
      this.getTime();
      this.event.published = true;
      Event.updateEvent(this.event).then((response) => {
        console.log(response);
      });
    },
    updateEvent() {
      this.getTime();
      Event.updateEvent(this.event).then((response) => {
        console.log(response);
      });
    },
    deleteEvent() {
      Event.deleteEvent(this.event.id).then((response) => {
        console.log(response);
      });
    },
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.getEvent();
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
