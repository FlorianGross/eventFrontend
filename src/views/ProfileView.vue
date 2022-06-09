<template>
  <div class="body-of-profil">
    <div class="containerField">
      <v-card style="height: 850px">
        <v-card-title>
          <span class="headline">Profildaten</span>
        </v-card-title>
        <v-card style="height: 1px"></v-card>
        <v-card-text class="profilText"></v-card-text>
        <div class="grid-containerRwu" style="margin-top: 40px">
          <div>
            <img class="profilBild" src="../assets/bild3.jpg" />
            <v-file-input
              label="File input"
              prepend-icon="mdi-camera"
            ></v-file-input>
          </div>
          <div class="text" style="margin-left: 250px">
            <v-card>
              <v-card-title>
                <span class="headline2">Anrede</span>
              </v-card-title>
              <div class="text">
                <div style="margin-bottom: 1%">
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    :append-icon="firstName ? 'mdi-check' : 'mdi-pen'"
                    clearable
                    v-model="firstName"
                    class="textField"
                    label="Vorname"
                    @click:append="updateUser(firstName)"
                  ></v-text-field>
                </div>
                <div style="margin-bottom: 1%">
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    :append-icon="lastName ? 'mdi-check' : 'mdi-pen'"
                    v-model="lastName"
                    clearable
                    class="textField"
                    label="Nachname"
                    @click:append="updateUser(lastName)"
                  ></v-text-field>
                </div>
                <div style="margin-bottom: 1%">
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    :append-icon="email ? 'mdi-check' : 'mdi-pen'"
                    clearable
                    v-model="email"
                    class="textField"
                    label="Email"
                    @click:append="updateUser(email)"
                  ></v-text-field>
                </div>
                <div style="padding-bottom: 2%">
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    :append-icon="phoneNumber ? 'mdi-check' : 'mdi-pen'"
                    clearable
                    v-model="phoneNumber"
                    class="textField"
                    label="Telefonnummer"
                    @click:append="updateUser(phoneNumber)"
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
                    :append-icon="street ? 'mdi-check' : 'mdi-pen'"
                    clearable
                    class="textField"
                    v-model="street"
                    label="Straße"
                    @click:append="updateUser(street)"
                  ></v-text-field>
                </div>
                <div style="margin-bottom: 1%">
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    :append-icon="streetNumber ? 'mdi-check' : 'mdi-pen'"
                    clearable
                    class="textField"
                    v-model="streetNumber"
                    label="Hausnummer"
                    @click:append="updateUser(streetNumber)"
                  ></v-text-field>
                </div>
                <div style="margin-bottom: 1%">
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    :append-icon="city ? 'mdi-check' : 'mdi-pen'"
                    clearable
                    v-model="city"
                    class="textField"
                    label="Stadt"
                    @click:append="updateUser(city)"
                  ></v-text-field>
                </div>
                <div style="padding-bottom: 2%">
                  <v-text-field
                    clear-icon="mdi-close-circle"
                    :append-icon="zipCode ? 'mdi-check' : 'mdi-pen'"
                    clearable
                    v-model="zipCode"
                    class="textField"
                    label="PLZ"
                    @click:append="updateUser(zipCode)"
                  ></v-text-field>
                </div>
              </div>
            </v-card>
          </div>
          <div class="calendar">
            <v-card
              ><v-row class="fill-height">
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
                      <v-card color="grey lighten-4" min-width="350px" flat>
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
              </v-row></v-card
            >
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
  },
  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    street: "",
    zipCode: "",
    streetNumber: "",
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
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
  }),
  methods: {
    updateUser(event) {
      console.log(event);
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
}
.containerField {
  top: 15%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 79px;
  width: 1850px;
}
.profilBild {
  margin-left: 10%;
  margin-bottom: 8%;
  max-height: 35%;
}
.grid-containerRwu {
  margin-top: 20px;
  margin-left: 20px;
  display: grid;
  grid-template-columns: 200px 700px 900px;
}
.setting_btn {
  margin-top: 5%;
  width: 453px;
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
  height: 50px;
  width: 400px;
}
</style>
