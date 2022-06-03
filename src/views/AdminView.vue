<template>
  <div class="body" >
    <v-card width="96%">
      <v-card-title>
        Erstellen Sie ihr eigenes Event:
      </v-card-title>
      <v-card-text>
        Zum Erstellen eines Events müssen Sie einen Titel und eine Beschreibung eingeben.
      </v-card-text>
      <v-card-text>
        <v-text-field
          v-model="title"
          label="Titel"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-text>
        <v-textarea
          v-model="description"
          label="Beschreibung"
          required
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="createEvent">Erstellen</v-btn>
      </v-card-actions>
    </v-card>
    <v-spacer/>
    <v-card>
      <v-card-title>
        Ihre Events:
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-tile
            v-for="event in events"
            :key="event.id"
            @click="eventClick(event)"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ event.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AdminView",
  data() {
    return {
      title: "",
      description: "",
      events: []
    };
  },
  methods: {
    eventClick(event) {
      this.$router.push({ path: "/event/" + event.id }).catch(() => {});
    },
    createEvent() {
      if (this.title.length > 0 && this.description.length > 0) {
        this.events.push({
          id: this.events.length,
          title: this.title,
          description: this.description
        });
        this.title = "";
        this.description = "";
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    //if (!this.currentUser || !this.currentUser.roles.includes("ROLE_ADMIN")) {
   //   this.$router.push("/profile");
   // }
  },
};
</script>

<style>
.item {
  margin: 20px;
}
.body {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}
</style>