<template>
  <div class="bodyDetails">
    <div class="containerFieldDetails">
      <v-card style="height: 100%">
        <v-card-title>
          <span class="headline">Events</span>
          <v-btn
            color="#000080"
            style="
            color:white; 
            min-width: 10%; 
            text-transform: none; 
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"
            v-if="isAdmin"
            @click="openAdminView()"
            >Event Bearbeiten</v-btn
          >
        </v-card-title>
        <v-card style="height: 1px"></v-card>
        <v-container>
          <v-layout row wrap>
            <div class="grid-containerDetails">
              <v-card class="mx-auto">
                <v-img
                  class="profilBildEvent"
                  src="../assets/WelcomeBackParty _2022.jpg"
                  height="auto"
                  width="350"
                  dark
                >
                </v-img>
                <v-divider></v-divider>
                <v-card-title>
                  <span>Kontakt</span>
                </v-card-title>
                <v-card-text>
                  <v-simple-table class="detailsInhalt-1">
                    <tbody>
                      <v-divider></v-divider>
                      <tr v-for="item in organizer" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.werte }}</td>
                      </tr>
                      <v-divider></v-divider>
                    </tbody>
                  </v-simple-table>
                </v-card-text>
              </v-card>
              <div class="textDetails1">
                <v-card-title>
                  <span>Details</span>
                </v-card-title>
                <div>
                  <v-card class="detailsVCardBeschreibung">
                    <v-simple-table class="detailsInhalt-2">
                      <tbody>
                        <v-divider></v-divider>
                        <tr v-for="item in details" :key="item.id">
                          <td>{{ item.name }}</td>
                          <td>{{ item.werte }}</td>
                        </tr>
                        <v-divider></v-divider>
                      </tbody>
                    </v-simple-table>
                  </v-card>
                </div>
              </div>
              <div class="textDetails2">
                <v-card-title>
                  <span>Buchung</span>
                </v-card-title>
                <div>
                  <v-card class="detailsVCardBeschreibung">
                    <v-simple-table
                      class="detailsInhalt-2"
                      :v-model="angemeldet"
                    >
                      <tbody>
                        <v-divider></v-divider>
                        <tr v-for="item in buchung" :key="item.id">
                          <td>{{ item.name }}</td>
                          <td>{{ item.werte }}</td>
                        </tr>
                        <v-divider></v-divider>
                      </tbody>
                    </v-simple-table>
                  </v-card>
                  <div>
                    <v-card class="detailsVCardBuchung">
                      <v-alert
                        v-if="showAlert"
                        :type="error ? 'error' : 'success'"
                        :color="error ? 'red' : 'green'"
                      >
                        {{ notification }}
                      </v-alert>
                      <div class="grid-buchungDetails">
                        <v-btn
                          class="mx-1"
                          fab
                          dark
                          large
                          @click="
                            isLoadingParticipate = true;
                            showAlert = false;
                            participate();
                          "
                          :color="angemeldet ? 'green' : error ? 'red' : 'blue'"
                        >
                          <v-icon dark v-if="!isLoadingParticipate">
                            mdi-check
                          </v-icon>
                          <v-progress-circular
                            v-if="isLoadingParticipate"
                            color="white"
                            indeterminate
                          ></v-progress-circular>
                        </v-btn>
                        <v-btn
                          class="mx-1"
                          fab
                          dark
                          large
                          :color="vorgemerkt ? 'green' : error ? 'red' : 'blue'"
                          @click="
                            preOrder();
                            isLoadingPreorder = true;
                          "
                        >
                          <v-icon v-if="!isLoadingPreorder" dark>
                            mdi-calendar
                          </v-icon>
                          <v-progress-circular
                            v-if="isLoadingPreorder"
                            color="white"
                            indeterminate
                          ></v-progress-circular>
                        </v-btn>
                        <div>
                          <v-card-title style="margin-left: -10%">
                            <span>Anmelden</span>
                          </v-card-title>
                        </div>
                        <div>
                          <v-card-title style="margin-left: -11%">
                            <span>Vormerken</span>
                          </v-card-title>
                        </div>
                      </div>
                    </v-card>
                  </div>
                </div>
              </div>
            </div>
          </v-layout>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import authService from "@/services/auth.service";
import Event from "../services/event.service";
export default {
  name: "DetailView",
  data() {
    return {
      isAdmin: false,
      angemeldet: false,
      vorgemerkt: false,
      isLoadingParticipate: false,
      isLoadingPreorder: false,
      showAlert: false,
      error: false,
      notification: "",
      preorder: 0,
      participants: 0,
      event: {
        name: "",
        description: "",
        image: "",
        location: "",
        start: null,
        end: null,
        maxParticipants: "",
        preSale: "",
        preSaleInfo: "",
        cost: "",
        eventSpecials: "",
        contactPerson: "",
        contactEmail: "",
        contactPhoneNumber: "",
        published: "",
      },
      headers: [
        {
          id: "",
          text: "",
          align: "start",
          sortable: false,
          value: "name",
        },
        { id: "", text: "", value: "werte" },
      ],
      details: [],
      buchung: [],
      organizer: [],
    };
  },
  methods: {
    getEvent() {
      Event.getEvent(this.id).then((response) => {
        console.log(response);
        this.event = response.data;
        console.log(this.event);
        this.event.start = new Date(this.event.start);
        this.event.end = new Date(this.event.end);
        if (response.data.participants.includes(this.currentUser.id)) {
          this.angemeldet = true;
        } else {
          this.angemeldet = false;
        }
        this.participants = response.data.participants.length;
        this.preorder = response.data.preorder.length;
        this.addOrganizer();
        this.addDetails();
        this.addBuchung();
        console.log(this.angemeldet);
      });
    },
    preOrder() {
      Event.preOrder(this.id, this.currentUser.id).then((response) => {
        console.log(response.data);
      });
    },
    participate() {
      if (!this.angemeldet) {
        Event.participateEvent(this.id, this.currentUser.id).then(
          (response) => {
            console.log(response.data);
            this.event = response.data;
            this.participants = response.data.participants.length;
            this.preorder = response.data.preorder.length;
            if (response.data.participants.includes(this.currentUser.id)) {
              this.angemeldet = true;
              this.sendGoodAlert("Erfolgreich angemeldet");
            } else {
              this.angemeldet = false;
              this.sendBadAlert("Fehler bei der Anmeldung");
            }
            this.isLoadingParticipate = false;
          }
        );
      } else {
        Event.unParticipateEvent(this.id, this.currentUser.id).then(
          (response) => {
            console.log(response.data);
            this.event = response.data;
            if (!response.data.participants.includes(this.currentUser.id)) {
              this.angemeldet = true;
              this.sendGoodAlert("Erfolgreich abgemeldet");
            } else {
              this.angemeldet = false;
              this.sendBadAlert("Fehler bei der Abmeldung");
            }
            this.isLoading = false;
          }
        );
      }
    },
    addDetails() {
      this.details.push(
        {
          id: 1,
          name: "Name",
          werte: "Welcome Back Party",
        },
        {
          id: 2,
          name: "Datum",
          werte:
            this.event.start.toLocaleString() +
            " - " +
            this.event.end.toLocaleString(),
        },
        {
          id: 3,
          name: "Ort",
          werte: this.event.location,
        },
        {
          id: 4,
          name: "Einlass",
          werte: this.event.start.toLocaleString("de-DE") + " Uhr",
        },
        {
          id: 5,
          name: "Eintritt",
          werte: this.event.cost + " €",
        },
        {
          id: 6,
          name: "Specials",
          werte: "Bierpong ; Glücksrad",
        },
        {
          id: 7,
          name: "---------",
          werte: "---------",
        },
        {
          id: 8,
          name: "Vorverkauf",
          werte: this.event.preSale,
        },
        {
          id: 9,
          name: "Datum",
          werte: this.event.preSaleInfo,
        },
        {
          id: 10,
          name: "Eintritt",
          werte: this.event.cost + " €",
        }
      );
    },
    addBuchung() {
      this.buchung.push(
        {
          id: 1,
          name: "Maximale Anzahl Teilnehmer",
          werte: this.event.maxParticipants,
        },
        {
          id: 2,
          name: "Zusagen",
          werte: this.participants,
        },
        {
          id: 3,
          name: "Vorgemerkt",
          werte: this.preorder,
        }
      );
    },
    addOrganizer() {
      this.organizer.push(
        {
          id: 1,
          name: "Kontaktperson",
          werte: this.event.contactPerson,
        },
        { id: 2, name: "Telefonnummer", werte: this.event.contactPhoneNumber },
        { id: 3, name: "Email", werte: this.event.contactEmail }
      );
    },
    sendGoodAlert(message) {
      this.showAlert = true;
      this.error = false;
      this.isLoadingParticipate = false;
      this.notification = message;
    },
    sendBadAlert(message) {
      this.showAlert = true;
      this.error = true;
      this.isLoadingParticipate = false;
      this.notification = message;
    },
    openAdminView() {
      this.$router.push("/admin/" + this.$route.params.id);
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.id = this.$route.params.id;
    authService.getIsAdmin(this.currentUser.username).then((response) => {
      this.isAdmin = response.data;
    });
  },
  mounted() {
    this.getEvent();
  },
};
</script>

<style>
.bodyDetails {
  position: fixed;
  background-color: #123456;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0;
  margin: 0;
  background-image: url("../assets/WebProg4.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  overflow: auto;
}
.headline {
  margin-left: auto;
  margin-right: auto;
}
.containerFieldDetails {
  top: 15%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 4.1%;
  width: 96.4%;
  height: 100%;
}
.grid-containerDetails {
  margin-top: 1%;
  display: grid;
  padding: 0;
  grid-template-columns: 35% 75% 75%;
}
.grid-buchungDetails {
  display: grid;
  margin-top: 30%;
  margin-left: 25%;
  grid-template-columns: 50% 50%;
}
.textDetails1 {
  margin-left: 10%;
  margin-right: 10%;
}
.textDetails1 {
  margin-left: 10%;
  margin-right: 10%;
}
.detailsVCardBeschreibung {
  margin-top: 2%;
  margin-bottom: 10%;
  min-height: 20%;
  min-width: 100%;
  overflow: auto;
}
</style>
