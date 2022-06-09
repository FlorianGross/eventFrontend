<template>
  <div class="bodyDetails">
    <v-card width="1850px">
      <v-card-title>
        <span class="headline">Events</span>
      </v-card-title>
      <v-card style="height: 1px"></v-card>
      <v-container>
        <v-layout
          row
          wrap
        >
          <div
            class="item"
            @click="eventClick(n)"
          >
            <v-card
              class="cards"
              min-height="400px"
            >
              <div
                class="grid-containerDetails"
                style="margin-top: 0px"
              >
                <div id="app">
                  <v-app id="inspire">
                    <v-card
                      max-width="375"
                      height="1100px"
                      class="mx-auto"
                    >
                      <v-img
                        class="profilBildEvent"
                        src="../assets/WelcomeBackParty _2022.jpg"
                        height="auto"
                        weight="auto"
                        dark
                      >
                        <v-row class="fill-height">
                          <v-card-title>
                            <v-btn
                              dark
                              icon
                            >
                              <v-icon>mdi-chevron-left</v-icon>
                              </v-btn>

                              <v-spacer></v-spacer>

                              <v-btn
                                dark
                                icon
                                class="mr-4"
                              >
                                <v-icon>mdi-pencil</v-icon>
                                </v-btn>

                                <v-btn
                                  dark
                                  icon
                                >
                                  <v-icon>mdi-dots-vertical</v-icon>
                                  </v-btn>
                          </v-card-title>

                          <v-spacer></v-spacer>

                          <v-card-title class="white--text pl-12 pt-12">
                            <div class="text-h4 pl-12 pt-12">
                            </div>
                          </v-card-title>
                        </v-row>
                        </v-img>

                        <v-list two-line>
                          <v-list-item>
                            <v-list-item-icon>
                              <v-icon color="indigo">
                                mdi-phone
                              </v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                              <v-list-item-title>(650) 555-1234</v-list-item-title>
                              <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-icon>
                              <v-icon>mdi-message-text</v-icon>
                            </v-list-item-icon>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-action></v-list-item-action>

                            <v-list-item-content>
                              <v-list-item-title>(323) 555-6789</v-list-item-title>
                              <v-list-item-subtitle>Work</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-icon>
                              <v-icon>mdi-message-text</v-icon>
                            </v-list-item-icon>
                          </v-list-item>

                          <v-divider inset></v-divider>

                          <v-list-item>
                            <v-list-item-icon>
                              <v-icon color="indigo">
                                mdi-email
                              </v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                              <v-list-item-title>aliconnors@example.com</v-list-item-title>
                              <v-list-item-subtitle>Personal</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-action></v-list-item-action>

                            <v-list-item-content>
                              <v-list-item-title>ali_connors@example.com</v-list-item-title>
                              <v-list-item-subtitle>Work</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>

                          <v-divider inset></v-divider>

                          <v-list-item>
                            <v-list-item-icon>
                              <v-icon color="indigo">
                                mdi-map-marker
                              </v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                              <v-list-item-title>1400 Main Street</v-list-item-title>
                              <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
    </v-card>
    </v-app>
    </div>
    <div class="textDetails">
      <v-card-title>
        <span>Details</span>
      </v-card-title>
      <div>
        <v-app id="inspire">
          <v-data-table
            :headers="headers"
            :items="details"
            class="detailsInhalt-1"
          >
            </v-data-table>
        </v-app>
      </div>

    </div>
    <div class="textDetails">
      <v-card-title>
        <span>Buchung</span>
      </v-card-title>
      <div>
        <v-app id="inspire">
          <v-data-table
            :headers="headers"
            :items="buchung"
            class="detailsInhalt-1"
          >
            </v-data-table>
            <div class="detailsInhalt-2">
              <v-card class="detailsVCardBuchung">
                <div class="grid-buchungDetails">
                  <v-btn
                    class="mx-1"
                    fab
                    dark
                    large
                    color="blue"
                  >
                    <v-icon dark>
                      mdi-check
                    </v-icon>
                    </v-btn>
                    <v-btn
                      class="mx-1"
                      fab
                      dark
                      large
                      color="blue"
                    >
                      <v-icon dark>
                        mdi-calendar
                      </v-icon>
                      </v-btn>
                      <div style="margin-left: -20px;">
                        <v-card-title>
                          <span>Anmelden</span>
                        </v-card-title>
                      </div>
                      <div style="margin-left: -23px;">
                        <v-card-title>
                          <span>Vormerken</span>
                        </v-card-title>
                      </div>
                </div>
              </v-card>
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
export default {
  name: "DetailView",
  data() {
    return {
      headers: [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "", value: "werte" },
      ],
      details: [
        {
          name: "Datum",
          werte: "22.05 - 23.05.2022",
        },
        {
          name: "Ort",
          werte: "RWU ; C-Gebäude",
        },
        {
          name: "Einlass",
          werte: "16:00 Uhr",
        },
        {
          name: "Kosten",
          werte: "7 €",
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
          name: "Kosten",
          werte: "7 €",
        },
      ],
      buchung: [
        {
          name: "Zusagen",
          werte: 700,
        },
        {
          name: "Vorgemerkt",
          werte: 100,
        },
      ],
    };
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
