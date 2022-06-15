<template>
  <div class="bodyProfil">
    <v-card width="96.4%" style="padding-bottom: 1%;">
      <v-card-title>
        <span class="headline" style="margin-left: 50%">Profildaten</span> 
        <v-spacer></v-spacer>
        <v-btn
          color="#000080"
          style="
            color:white; 
            width: 10%; 
            text-transform: none; 
            font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"
          @click="getUserData()"
          >Reload</v-btn
        >
      </v-card-title>
      <v-card style="height: 1px"></v-card>
      <v-alert v-if="alert" :color="success ? 'green' : 'red'" dismissible :type="success ? 'success' : 'error'">{{message}}</v-alert>
      <v-container class="container1">
        <v-row justify="space-between" xs1 md3>
          <v-flex style="padding-right: 2%; width: 50%; margin-top: -1.6%;">
              <v-card-title>
                <img
                  class="justify-content"
                  :src="user.image" style="width:30%;height:60%;" 
                  dark
                />
              </v-card-title>
              <v-card-text>
                <v-file-input append-icon="mdi-send" @change="selectImage" @click:append="saveImage()" v-model="image" style="width: 20%;">
                </v-file-input>
              </v-card-text>
          </v-flex>
          <v-flex style="padding-right: 2%; margin-left: -46%; margin-top: -0.7%;">
            <v-card style="padding-right: 2%">
              <v-card-title>
                <span class="headline2">Anrede</span>
              </v-card-title>
              <div class="anredeAdresse" style="margin-bottom: 1%;">
                <v-text-field
                  clear-icon="mdi-close-circle"
                  :append-icon="edit.firstName ? 'mdi-check' : 'mdi-pen'"
                  :readonly="!edit.firstName"
                  :clearable="edit.firstName"
                  v-model="user.firstName"
                  class="textFieldStyle"
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
                  class="textFieldStyle"
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
                  class="textFieldStyle"
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
                  class="textFieldStyle"
                  label="Telefonnummer"
                  @click:append="
                    edit.phoneNumber
                      ? updateUser()
                      : (edit.phoneNumber = !edit.phoneNumber)
                  "
                ></v-text-field>
              </div>
            </v-card>
            <v-card style="margin-top: 5%; padding-right: 2%">
              <v-card-title>
                <span class="headline2">Adresse</span>
              </v-card-title>
              <div style="margin-bottom: 1%">
                <v-text-field
                  clear-icon="mdi-close-circle"
                  :append-icon="edit.street ? 'mdi-check' : 'mdi-pen'"
                  :readonly="!edit.street"
                  :clearable="edit.street"
                  v-model="user.street"
                  class="textFieldStyle"
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
                  class="textFieldStyle"
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
                  class="textFieldStyle"
                  label="Stadt"
                  @click:append="
                    edit.city ? updateUser() : (edit.city = !edit.city)
                  "
                ></v-text-field>
              </div>
              <div style="margin-bottom: 2%">
                <v-text-field
                  clear-icon="mdi-close-circle"
                  :append-icon="edit.zip ? 'mdi-check' : 'mdi-pen'"
                  :readonly="!edit.zip"
                  :clearable="edit.zip"
                  v-model="user.zip"
                  class="textFieldStyle"
                  label="Plz"
                  @click:append="
                    edit.zip ? updateUser() : (edit.zip = !edit.zip)
                  "
                ></v-text-field>
              </div> </v-card
          ></v-flex>
          <v-flex style="padding-right: 2%; padding-bottom: 2%">
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
                        <v-btn
                          fab
                          text
                          small
                          color="grey darken-2"
                          @click="prev"
                        >
                          <v-icon small> mdi-chevron-left </v-icon>
                        </v-btn>
                        <v-btn
                          fab
                          text
                          small
                          color="grey darken-2"
                          @click="next"
                        >
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
                    <v-sheet height="auto">
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
          </v-flex>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import User from "../services/user.service.js";
import Upload from "../services/upload.service.js";
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
    image: undefined,
    alert: false,
      message: "",
      success: false,
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
    selectImage(image){
      this.image = image;
    },
    saveImage() {
      console.log(this.image)
      if(this.image === undefined){
        return;
      }
      Upload.upload(this.image).then((response) => {
        console.log(response);
        this.user.image = "https://webprogevent.herokuapp.com/api/download/" + response.data.file;
        this.updateUser(); 
    });
    },
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
    updateUser() {
      User.setUser(this.user).then((response) => {
        console.log(response);
        this.success = true;
        this.message = "User updated";
        this.alert = true;
      }).catch((error) => {
        console.log(error);
        this.alert = true;
        this.message = "Error while updating user";
        this.success = false;
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
.bodyProfil {
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
}
.justify-content {
  max-width: 30%;
}
.container1 {
  margin-top: 2%;
}
.anredeAdresse {
  margin-top: 0%
}
.headline {
  color: black;
  margin-left: auto;
  margin-right: auto;
}
</style>
