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
            min-width: 140px; 
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
          <div class="item">
            <v-card class="cards" min-height="400px">
              <div class="grid-containerDetails" style="margin-top: 0px">
                <div id="app" style="width: 400px">
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
                      <v-card-text>
                        <v-simple-table class="detailsInhalt-1">
                          <tbody>
                            <v-divider></v-divider>
                            <tr v-for="item in organizer" :key="item.name">
                              <td>{{ item.name }}</td>
                              <td>{{ item.werte }}</td>
                            </tr>
                            <v-divider></v-divider>
                          </tbody>
                        </v-simple-table>
                      </v-card-text>
                    </v-card>
                  </v-app>
                </div>
                <div class="textDetails" style="width: 500px">
                  <v-card-title>
                    <span>Details</span>
                  </v-card-title>
                  <div>
                    <v-app id="inspire">
                      <v-card class="detailsVCardBeschreibung"> </v-card>
                      <v-simple-table class="detailsInhalt-1">
                        <tbody>
                          <v-divider></v-divider>
                          <tr v-for="item in details" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.werte }}</td>
                          </tr>
                          <v-divider></v-divider>
                        </tbody>
                      </v-simple-table>
                    </v-app>
                  </div>
                </div>
                <div class="textDetails" style="width: 600px">
                  <v-card-title>
                    <span>Buchung</span>
                  </v-card-title>
                  <div>
                    <v-app id="inspire">
                      <v-simple-table class="detailsInhalt-1">
                        <tbody>
                          <v-divider></v-divider>
                          <tr v-for="item in buchung" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.werte }}</td>
                          </tr>
                          <v-divider></v-divider>
                        </tbody>
                      </v-simple-table>
                      <div class="detailsInhalt-2">
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
                              <v-icon dark v-if="!isLoading">
                                mdi-check
                              </v-icon>
                              <v-progress-circular
                                v-if="isLoading"
                                color="white"
                                indeterminate
                              ></v-progress-circular>
                            </v-btn>
                            <v-btn class="mx-1" fab dark large color="blue">
                              <v-icon dark> mdi-calendar </v-icon>
                            </v-btn>
                            <div style="margin-left: -20px">
                              <v-card-title>
                                <span>Anmelden</span>
                              </v-card-title>
                            </div>
                            <div style="margin-left: -23px">
                              <v-card-title>
                                <span>Vormerken</span>
                              </v-card-title>
                            </div>
                          </div>
                        </v-card>
                        <v-btn @click="sendGoodAlert('Erfolgreich angemeldet')"
                          >Test1</v-btn
                        >
                        <v-btn @click="sendBadAlert('Erfolglos angemeldet')"
                          >Test2</v-btn
                        >
                      </div>
                    </v-app>
                  </div>
                </div>
              </div>
            </v-card>
          </div>
        </v-layout>
      </v-container>
    </v-card>
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
      Event.getEvent(this.id).then((response) => {
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
.detailsVCardBeschreibung {
  margin-top: 8%;
  min-height: 150px;
  min-width: 400px;
}
</style>
