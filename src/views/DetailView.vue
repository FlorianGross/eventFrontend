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
          >Event Bearbeiten</v-btn>
        </v-card-title>
        <v-card style="height: 1px"></v-card>
        <v-container>
          <v-layout
            row
            wrap
          >
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
                        <tr
                          v-for="item in organizer"
                          :key="item.name"
                        >
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
                        <tr
                          v-for="item in details"
                          :key="item.name"
                        >
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
                    <v-simple-table class="detailsInhalt-2">
                      <tbody>
                        <v-divider></v-divider>
                        <tr
                          v-for="item in buchung"
                          :key="item.name"
                        >
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
                                isLoading = true;
                                angemeldet = false;
                                showAlert = false;
                              "
                            :color="
                                angemeldet ? 'green' : error ? 'red' : 'blue'
                              "
                          >
                            <v-icon
                              dark
                              v-if="!isLoading"
                            >
                              mdi-check
                              </v-icon>
                              <v-progress-circular
                                v-if="isLoading"
                                color="white"
                                indeterminate
                              ></v-progress-circular>
                                </v-btn>
                                <v-btn
                                  class="mx-1"
                                  fab
                                  dark
                                  large
                                  color="blue"
                                >
                                  <v-icon dark> mdi-calendar </v-icon>
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
                    <v-btn @click="sendGoodAlert('Erfolgreich angemeldet')">Test1</v-btn>
                    <v-btn @click="sendBadAlert('Erfolglos angemeldet')">Test2</v-btn>
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
      isLoading: false,
      showAlert: false,
      error: false,
      notification: "",
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
          text: "",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "", value: "werte" },
      ],
      details: [],
      buchung: [],
      organizer: [],
    };
  },
  methods: {
    getEvent() {
      Event.getEvent(this.id).then(response => {
        console.log(response);
        this.event = response.data;
        console.log(this.event);
      });
      this.addOrganizer();
      this.addDetails();
      this.addBuchung();
    },
    addDetails() {
      this.details.push(
        {
          name: "Name",
          werte: "Welcome Back Party",
        },
        {
          name: "Datum",
          werte: "22.05 - 23.05.2022",
        },
        {
          name: "Ort",
          werte: this.event.location,
        },
        {
          name: "Einlass",
          werte: this.event.start + " Uhr",
        },
        {
          name: "Eintritt",
          werte: this.event.cost + " €",
        },
        {
          name: "Specials",
          werte: "Bierpong ; Glücksrad",
        },
        {
          name: "---------",
          werte: "---------",
        },
        {
          name: "Vorverkauf",
          werte: "ja",
        },
        {
          name: "Datum",
          werte: "11.05. & 16.05.2022",
        },
        {
          name: "Ort",
          werte: "RWU ; B-Gebäude & NZ",
        },
        {
          name: "Eintritt",
          werte: this.event.cost + " €",
        }
      );
    },
    addBuchung() {
      this.buchung.push(
        {
          name: "Maximale Anzahl Teilnehmer",
          werte: this.event.maxParticipants,
        },
        {
          name: "Zusagen",
          werte: 0,
        },
        {
          name: "Vorgemerkt",
          werte: 0,
        }
      );
    },
    addOrganizer() {
      this.organizer.push(
        {
          name: "Kontaktperson",
          werte: this.event.contactPerson,
        },
        { name: "Telefonnummer", werte: this.event.contactPhoneNumber },
        { name: "Email", werte: this.event.contactEmail }
      );
    },
    sendGoodAlert(message) {
      this.showAlert = true;
      this.angemeldet = true;
      this.error = false;
      this.isLoading = false;
      this.notification = message;
    },
    sendBadAlert(message) {
      this.showAlert = true;
      this.angemeldet = false;
      this.error = true;
      this.isLoading = false;
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
    authService.getIsAdmin(this.currentUser.username).then(response => {
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
