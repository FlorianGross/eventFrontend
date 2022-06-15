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
            width: 10%; 
            text-transform: none; 
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"
          v-if="isAdmin"
          @click="openAdminView()"
          >Event Bearbeiten</v-btn
        >
      </v-card-title>
      <v-card style="height: 1px"></v-card>
      <v-container class="containerDetailView">
        <v-row justify="space-between" xs1 md3>
          <v-flex style="padding-right: 2%; padding-bottom: 1%" md4>
            <v-card>
              <v-card-title>
                <v-img
                  class="justify-content"
                  :src="event.image"
                  height="auto"
                  width="150px"
                  max-width="100%"
                  dark
                >
                </v-img>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex style="padding-right: 2%; padding-bottom: 1%" md4>
            <v-card width="auto">
              <v-card-title>Beschreibung</v-card-title>
              <v-card-text>{{ event.description }}</v-card-text>
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
            </v-card>
          </v-flex>
          <v-flex style="padding-bottom: 1%" md4>
            <v-card>
              <v-card-title>
                <span>Kontakt</span>
              </v-card-title>
              <v-card-text>
                <v-simple-table>
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
              <v-divider></v-divider>
              <v-card-title>
                <span>Buchung</span>
              </v-card-title>
              <div>
                <v-card>
                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        Maximale anmeldezahl: {{ event.maxParticipants }}
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        Anmeldezahl: {{ participants }}
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        Vorgemerkte: {{ preorder }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
                <div>
                  <v-card>
                    <v-alert
                      v-if="showAlert"
                      :type="error ? 'error' : 'success'"
                      :color="error ? 'red' : 'green'"
                    >
                      {{ notification }}
                    </v-alert>
                    <v-container style="width: 70%">
                      <v-row justify="space-around">
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
                      </v-row>
                      <v-row justify="space-around">
                        <v-card-title> Anmelden </v-card-title>
                        <v-card-title> Vormerken </v-card-title>
                      </v-row>
                    </v-container>
                  </v-card>
                </div>
              </div>
            </v-card>
          </v-flex>
        </v-row>
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
        console.log(this.angemeldet);
      });
    },
    preOrder() {
      if (!this.vorgemerkt) {
        Event.preOrder(this.id, this.currentUser.id).then((response) => {
          console.log(response.data);
          this.event = response.data;
          if (response.data.preorder.includes(this.currentUser.id)) {
            this.vorgemerkt = true;
            this.sendGoodAlert("Erfolgreich vorgemerkt");
          } else {
            this.vorgemerkt = false;
            this.sendBadAlert("Fehler beim Vormerken");
          }
          this.preorder = response.data.preorder.length;
          this.isLoadingPreorder = false;
        });
      } else {
        Event.unPreOrder(this.id, this.currentUser.id).then((response) => {
          console.log(response.data);
          this.event = response.data;
          if (!response.data.preorder.includes(this.currentUser.id)) {
            this.vorgemerkt = true;
            this.sendGoodAlert("Erfolgreich Abgemeldet");
          } else {
            this.vorgemerkt = false;
            this.sendBadAlert("Fehler beim Abmelden");
          }
          this.preorder = response.data.preorder.length;
          this.isLoadingPreorder = false;
        });
      }
    },
    participate() {
      if (!this.angemeldet) {
        Event.participateEvent(this.id, this.currentUser.id).then(
          (response) => {
            console.log(response.data);
            this.event = response.data;
            if (response.data.participants.includes(this.currentUser.id)) {
              this.angemeldet = true;
              this.sendGoodAlert("Erfolgreich angemeldet");
            } else {
              this.angemeldet = false;
              this.sendBadAlert("Fehler bei der Anmeldung");
            }
            this.participants = response.data.participants.length;
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
            this.participants = response.data.participants.length;
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
          werte: this.event.name,
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
          werte: this.event.eventSpecials,
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
.headline {
  color: black;
  margin-left: auto;
  margin-right: auto;
}
.containerDetailView {
  margin-top: 1.5%;
}
</style>
