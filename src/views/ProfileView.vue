<template>
  <div class="body-of-profil">
    <div class="containerField">
      <v-card style="height: 100%">
        <v-card-title>
          <span class="headline">Profildaten</span>
          <v-btn
            color="#000080"
            style="
            color:white; 
            min-width: 10%; 
            text-transform: none; 
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"
            @click="getUserData()"
            >Reload</v-btn
          >
        </v-card-title>
        <v-card style="height: 1px"></v-card>
        <v-card-text class="profilText"></v-card-text>
        <div class="grid-containerRwu" style="margin-top: 3%">
          <div>
            <img
              class="profilBild"
              src="../assets/bild3.jpg"
              style="margin-top: -35%"
            />
            <v-file-input
              append-icon="mdi-send"
              label="File input"
              accept="image/*"
              placeholder="File input"
              v-model="image"
              prepend-icon="mdi-camera"
              @click:append="saveImage()"
            ></v-file-input>
          </div>
          <div class="text" style="margin-left: 38%; margin-top: -9.8%">
            <v-card>
              <v-card-title>
                <span class="headline2">Anrede</span>
              </v-card-title>
              <div class="text">
                <div style="margin-bottom: 1%">
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    :append-icon="edit.firstName ? 'mdi-check' : 'mdi-pen'"
                    :readonly="!edit.firstName"
                    :clearable="edit.firstName"
                    v-model="user.firstName"
                    class="textField"
                    label="Vorname"
                    @click:append="
                      edit.firstName
                        ? updateUser()
                        : (edit.firstName = !edit.firstName)
                    "
                  ></v-text-field>
                </div>
                <div style="margin-bottom: 1%">
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    :append-icon="edit.lastName ? 'mdi-check' : 'mdi-pen'"
                    :readonly="!edit.lastName"
                    :clearable="edit.lastName"
                    v-model="user.lastName"
                    class="textField"
                    label="Nachname"
                    @click:append="
                      edit.lastName
                        ? updateUser()
                        : (edit.lastName = !edit.lastName)
                    "
                  ></v-text-field>
                </div>
                <div style="margin-bottom: 1%">
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    :append-icon="edit.email ? 'mdi-check' : 'mdi-pen'"
                    :readonly="!edit.email"
                    :clearable="edit.email"
                    v-model="user.email"
                    class="textField"
                    label="Email"
                    @click:append="
                      edit.email ? updateUser() : (edit.email = !edit.email)
                    "
                  ></v-text-field>
                </div>
                <div style="padding-bottom: 2%">
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    :append-icon="edit.phoneNumber ? 'mdi-check' : 'mdi-pen'"
                    :readonly="!edit.phoneNumber"
                    :clearable="edit.phoneNumber"
                    v-model="user.phoneNumber"
                    class="textField"
                    label="Telefonnummer"
                    @click:append="
                      edit.phoneNumber
                        ? updateUser()
                        : (edit.phoneNumber = !edit.phoneNumber)
                    "
                  ></v-text-field>
                </div>
              </div>
            </v-card>
            <v-card style="margin-top: 5%">
              <v-card-title>
                <span class="headline2">Adresse</span>
              </v-card-title>
              <div class="text">
                <div style="margin-bottom: 1%">
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    :append-icon="edit.street ? 'mdi-check' : 'mdi-pen'"
                    :readonly="!edit.street"
                    :clearable="edit.street"
                    v-model="user.street"
                    class="textField"
                    label="Straße"
                    @click:append="
                      edit.street ? updateUser() : (edit.street = !edit.street)
                    "
                  ></v-text-field>
                </div>
                <div style="margin-bottom: 1%">
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    :append-icon="edit.streetNumber ? 'mdi-check' : 'mdi-pen'"
                    :readonly="!edit.streetNumber"
                    :clearable="edit.streetNumber"
                    v-model="user.streetNumber"
                    class="textField"
                    label="Hausnummer"
                    @click:append="
                      edit.streetNumber
                        ? updateUser()
                        : (edit.streetNumber = !edit.streetNumber)
                    "
                  ></v-text-field>
                </div>
                <div style="margin-bottom: 1%">
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    :append-icon="edit.city ? 'mdi-check' : 'mdi-pen'"
                    :readonly="!edit.city"
                    :clearable="edit.city"
                    v-model="user.city"
                    class="textField"
                    label="Stadt"
                    @click:append="
                      edit.city ? updateUser() : (edit.city = !edit.city)
                    "
                  ></v-text-field>
                </div>
                <div style="padding-bottom: 2%">
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    :append-icon="edit.zip ? 'mdi-check' : 'mdi-pen'"
                    :readonly="!edit.zip"
                    :clearable="edit.zip"
                    v-model="user.zip"
                    class="textField"
                    label="Plz"
                    @click:append="
                      edit.zip ? updateUser() : (edit.zip = !edit.zip)
                    "
                  ></v-text-field>
                </div>
              </div>
            </v-card>
          </div>
          <div class="calendar">
            <v-card>
              <v-row class="fill-height">
                <v-col>
                  <v-sheet height="64">
                    <v-toolbar flat>
                      <v-btn
                        outlined
                        class="mr-4"
                        color="grey darken-2"
                        @click="setToday"
                      >
                        Today
                      </v-btn>
                      <v-btn fab text small color="grey darken-2" @click="prev">
                        <v-icon small> mdi-chevron-left </v-icon>
                      </v-btn>
                      <v-btn fab text small color="grey darken-2" @click="next">
                        <v-icon small> mdi-chevron-right </v-icon>
                      </v-btn>
                      <v-toolbar-title v-if="$refs.calendar">
                        {{ $refs.calendar.title }}
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-menu bottom right>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            outlined
                            color="grey darken-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <span>{{ typeToLabel[type] }}</span>
                            <v-icon right> mdi-menu-down </v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item @click="type = 'day'">
                            <v-list-item-title>Day</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="type = 'week'">
                            <v-list-item-title>Week</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="type = 'month'">
                            <v-list-item-title>Month</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="type = '4day'">
                            <v-list-item-title>4 days</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-toolbar>
                  </v-sheet>
                  <v-sheet height="667">
                    <v-calendar
                      ref="calendar"
                      v-model="focus"
                      color="primary"
                      :events="events"
                      :event-color="getEventColor"
                      :type="type"
                      @click:event="showEvent"
                      @click:more="viewDay"
                      @click:date="viewDay"
                    ></v-calendar>
                    <v-menu
                      v-model="selectedOpen"
                      :close-on-content-click="false"
                      :activator="selectedElement"
                      offset-x
                    >
                      <v-card color="grey lighten-4" flat>
                        <v-toolbar :color="selectedEvent.color" dark>
                          <v-btn icon>
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                          <v-toolbar-title
                            v-html="selectedEvent.name"
                          ></v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-btn icon>
                            <v-icon>mdi-heart</v-icon>
                          </v-btn>
                          <v-btn icon>
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </v-toolbar>
                        <v-card-text>
                          <span v-html="selectedEvent.details"></span>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn
                            text
                            color="secondary"
                            @click="selectedOpen = false"
                          >
                            Cancel
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </div>
      </v-card>
      <header class="jumbotron">
        <h3>
          <strong>{{ currentUser.username }}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong>
        {{ currentUser.accessToken.substring(0, 20) }} ...
        {{
          currentUser.accessToken.substr(currentUser.accessToken.length - 20)
        }}
      </p>
      <p>
        <strong>Id:</strong>
        {{ currentUser.id }}
      </p>
      <p>
        <strong>Email:</strong>
        {{ currentUser.email }}
      </p>
      <strong>Authorities:</strong>
      <ul>
        <li v-for="role in currentUser.roles" :key="role">{{ role }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import User from "../services/user.service.js";
export default {
  name: "ProfileView",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
    this.getUserData();
  },
  data: () => ({
    image: null,
    user: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      zip: "",
      city: "",
      street: "",
      country: "",
      image: "",
      roles: [],
    },
    edit: {
      username: false,
      password: false,
      email: false,
      firstName: false,
      lastName: false,
      phoneNumber: false,
      address: false,
      zip: false,
      city: false,
      street: false,
      country: false,
      roles: false,
    },
    focus: "",
    type: "week",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
  }),
  methods: {
    getUserData() {
      User.getUser(this.currentUser.username).then((response) => {
        console.log(response);
        this.user.username = response.data.username;
        this.user.firstName = response.data.firstName;
        this.user.lastName = response.data.lastName;
        this.user.email = response.data.email;
        this.user.phoneNumber = response.data.phoneNumber;
        this.user.address = response.data.address;
        this.user.street = response.data.street;
        this.user.streetNumber = response.data.streetNumber;
        this.user.zip = response.data.zip;
        this.user.city = response.data.city;
        this.user.country = response.data.country;
        this.user.image = response.data.image;
      });
    },
    saveImage() {
      User.saveImage(this.currentUser.username, this.image).then((response) => {
        console.log(response);
      });
    },
    updateUser() {
      User.setUser(this.user).then((response) => {
        console.log(response);
      });
      edit.firstName = false;
      edit.lastName = false;
      edit.email = false;
      edit.phoneNumber = false;
      edit.address = false;
      edit.street = false;
      edit.streetNumber = false;
      edit.zip = false;
      edit.city = false;
      edit.country = false;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
};
</script>

<style>
.body-of-profil {
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
.containerField {
  top: 15%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 4.1%;
  width: 96.4%;
}
.profilBild {
  margin-left: 10%;
  margin-bottom: 8%;
  max-height: 35%;
}
.grid-containerRwu {
  margin-left: 0.5%;
  display: grid;
  grid-template-columns: 10.5% 38% 49.5%;
}
.text {
  margin-left: 5%;
  font-size: 95%;
}
.headline {
  margin-left: auto;
  margin-right: auto;
}
.calendar {
  width: 97%;
  height: 30%;
  margin-left: 5%;
  margin-top: -6%;
}
.textField {
  width: 95%;
}
</style>
