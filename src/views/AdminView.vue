<template>
  <div class="body">
    <v-card width="96.4%" style="padding-bottom: 1%">
      <v-card-title>
        <span class="headline" style="margin-left: 50%">Events</span>
        <v-spacer></v-spacer>
        <v-btn
          color="#000080"
          style="
            color:white; 
            min-width: 10%; 
            text-transform: none; 
            font-size: clamp(0.6rem, 0.8vw, 0.9rem);
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            margin-right: 2%;
            "
          @click="deleteEvent()"
        >
          Löschen</v-btn
        >
        <v-btn
          color="#000080"
          style="
            color:white; 
            min-width: 10%; 
            text-transform: none; 
            font-size: clamp(0.6rem, 0.8vw, 0.9rem);
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"
          @click="saveEvent()"
          >Speichern</v-btn
        >
        <v-btn
          color="#000080"
          style="
            color:white; 
            min-width: 10%; 
            text-transform: none;
            font-size: clamp(0.6rem, 0.8vw, 0.9rem);
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            margin-left: 2%;
            "
          @click="createEvent()"
        >
          Veröffentlichen</v-btn
        >
      </v-card-title>
      <v-card style="height: 1px"></v-card>
      <v-alert
        v-if="alert"
        :color="success ? 'green' : 'red'"
        dismissible
        :type="success ? 'success' : 'error'"
        >{{ message }}</v-alert
      >
      <v-container style="padding-top: 2%">
        <v-row justify="space-between" xs1 md3>
          <v-flex style="padding-right: 2%">
            <v-card>
              <v-card-title>
                <v-img
                  class="justify-content"
                  :src="event.image"
                  height="auto"
                  width="350px"
                  dark
                >
                </v-img>
              </v-card-title> </v-card
          ></v-flex>
          <v-flex style="padding-right: 2%"
            ><v-card style="margin-bottom: 3%">
              <v-card-title class="ueberschriften">Details</v-card-title>
              <v-form>
                <v-text-field
                  label="Name des Events"
                  v-model="event.name"
                  class="textFieldStyle"
                  style="font-size: clamp(0.7rem, 0.8vw, 1rem)"
                >
                </v-text-field>
                <v-text-field
                  label="Veranstaltungsort"
                  v-model="event.location"
                  class="textFieldStyle"
                  style="font-size: clamp(0.7rem, 0.8vw, 1rem)"
                >
                </v-text-field>
                <v-text-field
                  label="Besonderheiten"
                  v-model="event.Specials"
                  class="textFieldStyle"
                  style="font-size: clamp(0.7rem, 0.8vw, 1rem)"
                >
                </v-text-field>
                <v-checkbox
                  label="Vorverkauf"
                  v-model="event.preSale"
                  class="textFieldStyle"
                  style="font-size: clamp(0.7rem, 0.8vw, 1rem)"
                ></v-checkbox>
                <v-text-field
                  v-if="event.preSale"
                  label="Vorverkauf"
                  v-model="event.preSaleInfo"
                  class="textFieldStyle"
                  style="font-size: clamp(0.7rem, 0.8vw, 1rem)"
                ></v-text-field>
                <v-file-input
                  label="Bild"
                  class="textFieldStyle"
                  style="font-size: clamp(0.7rem, 0.8vw, 1rem)"
                  append-icon="mdi-send"
                  @change="selectImage"
                  @click:append="saveImage()"
                  v-model="image"
                >
                </v-file-input>
                <v-textarea
                  label="Beschreibung"
                  v-model="event.description"
                  class="textFieldStyle"
                  style="font-size: clamp(0.7rem, 0.8vw, 1rem)"
                >
                </v-textarea>
                <v-row
                  class="textFieldStyle"
                  style="font-size: clamp(0.7rem, 0.8vw, 1rem)"
                >
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
                <v-row
                  class="textFieldStyle"
                  style="font-size: clamp(0.7rem, 0.8vw, 1rem)"
                >
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
              </v-form> </v-card
          ></v-flex>
          <v-flex style="padding-right: 2%"
            ><v-card>
              <v-card-title class="ueberschriften">Kontakt</v-card-title>
              <v-divider style="margin-top: 5px"></v-divider>
              <v-text-field
                label="Kontaktperson"
                v-model="event.contactPerson"
                class="textFieldStyle"
                style="font-size: clamp(0.7rem, 0.8vw, 1rem)"
              >
              </v-text-field>
              <v-divider style="margin-top: 5px"></v-divider>
              <v-text-field
                label="Telefonnummer"
                v-model="event.contactPhoneNumber"
                class="textFieldStyle"
                style="font-size: clamp(0.7rem, 0.8vw, 1rem)"
              >
              </v-text-field>
              <v-divider style="margin-top: 5px"></v-divider>
              <v-text-field
                label="E-Mail"
                v-model="event.contactEmail"
                class="textFieldStyle"
                style="font-size: clamp(0.7rem, 0.8vw, 1rem)"
              >
              </v-text-field>
              <v-divider></v-divider>
              <v-card-title class="ueberschriften"
                >Buchungsdetails</v-card-title
              >
              <v-text-field
                label="Eintrittspreis"
                v-model="event.cost"
                type="number"
                class="textFieldStyle"
                style="font-size: clamp(0.7rem, 0.8vw, 1rem)"
              ></v-text-field>
              <v-text-field
                label="Maximale Teilnehmeranzahl"
                v-model="event.maxParticipants"
                type="number"
                class="textFieldStyle"
                style="font-size: clamp(0.7rem, 0.8vw, 1rem)"
              ></v-text-field>
              <participants-management-part-vue
                style="margin-top: 2%"
                :eventid="this.$route.params.id"
              ></participants-management-part-vue> </v-card
          ></v-flex>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Event from "../services/event.service.js";
import Upload from "../services/upload.service.js";
import ParticipantsManagementPartVue from "@/components/ParticipantsManagementPart.vue";
export default {
  components: { ParticipantsManagementPartVue },
  name: "AdminView",
  data() {
    return {
      alert: false,
      message: "",
      success: false,
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
      image: undefined,
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
    selectImage(image) {
      this.image = image;
    },
    saveImage() {
      if (this.image === undefined) {
        return;
      }
      Upload.upload(this.image)
        .then((response) => {
          this.event.image =
            "https://webprogevent.herokuapp.com/api/download/" +
            response.data.file;
          this.saveEvent();
          this.success = true;
          this.message = "Successfully uploaded image";
          this.alert = true;
        })
        .catch((error) => {
          console.log(error);
          this.message = "Error while saving Image";
          this.alert = true;
          this.success = false;
        });
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
      Event.updateEvent(this.event)
        .then((response) => {
          this.success = true;
          this.message = "Successfully updated event";
          this.alert = true;
        })
        .catch((error) => {
          console.log(error);
          this.message = "Error while saving event";
          this.alert = true;
          this.success = false;
        });
    },
    publishEvent() {
      this.getTime();
      this.event.published = true;
      Event.updateEvent(this.event)
        .then((response) => {
          console.log(response);
          this.success = true;
          this.message = "Successfully published event";
          this.alert = true;
        })
        .catch((error) => {
          console.log(error);
          this.message = "Error while publishing event";
          this.alert = true;
          this.success = false;
        });
    },
    updateEvent() {
      this.getTime();
      Event.updateEvent(this.event)
        .then((response) => {
          console.log(response);
          this.success = true;
          this.message = "Successfully updated event";
          this.alert = true;
        })
        .catch((error) => {
          console.log(error);
          this.message = "Error while saving event";
          this.alert = true;
          this.success = false;
        });
    },
    deleteEvent() {
      Event.deleteEvent(this.event.id)
        .then((response) => {
          console.log(response);
          this.success = true;
          this.message = "Successfully deleted event";
          this.alert = true;
        })
        .catch((error) => {
          console.log(error);
          this.message = "Error while deleting event";
          this.alert = true;
          this.success = false;
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
.body {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.8%;
  margin-bottom: 0.8%;
}
.textFieldStyle {
  max-width: 90%;
  padding-left: 4.5%;
  margin-top: 3%;
  font-size: clamp(0.7rem, 0.9vw, 1rem);
}
.headline {
  color: black;
  margin-left: auto;
  margin-right: auto;
}
.schriftgroessen {
  font-size: clamp(0.7rem, 0.9vw, 1rem);
}
.ueberschriften {
  font-size: clamp(0.9rem, 1vw, 1.3rem);
}
</style>
