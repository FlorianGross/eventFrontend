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
              <v-textarea label="Beschreibung">
              </v-textarea>
              <v-dialog v-model="dialog" width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                    Anfangszeit
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    Anfangszeit
                  </v-card-title>
                  <v-card-text>
                    <v-date-picker
                      v-model="date"
                      scrollable
                      no-title
                      landscape
                      format="dd.MM.yyyy"
                    ></v-date-picker>
                    <v-time-picker
                      v-model="time"
                      no-title
                      landscape
                      format="HH:mm"></v-time-picker>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                      Annehmen
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog" width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                    Endzeit
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    Endzeit
                  </v-card-title>
                    <v-date-picker
                      v-model="date"
                      scrollable
                      no-title
                      landscape
                      format="dd.MM.yyyy"
                    ></v-date-picker>
                    <v-time-picker
                      v-model="time"
                      no-title
                      landscape
                      format="HH:mm"></v-time-picker>
                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                      I accept
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
