<template>
  <div class="body-of-profil">
    <div class="containerField">
      <v-card style="height: 800px">
        <v-card-title><span class="headline">Profil</span></v-card-title>
        <v-card style="height: 10px"></v-card>
        <v-card-text class="profilText"></v-card-text>
        <div class="grid-containerRwu" style="margin-top: 40px;">
          <img class="profilBild" src="../assets/bild3.jpg">
          <div class="text" style="margin-left: 250px;">
            <div style="margin-bottom: 1%;">Vorname</div>
            <div style="margin-bottom: 1%;">Nachname</div>
            <div style="margin-bottom: 1%;">E-Mail</div>
            <div>Telefonnummer</div>
            <div style="margin-top: 20px; margin-bottom: 1%;">Straße</div>
            <div style="margin-bottom: 1%;">Hausnummer</div>
            <div style="margin-bottom: 1%;">Stadt</div>
            <div>Postleitzahl</div>
          </div>
          <div class="text">
            <div style="margin-bottom: 0,5%;">Sven</div>
            <div style="margin-bottom: 0%;">Herz</div>
            <div style="margin-bottom: 1%;">s.herz@gmx.de</div>
            <div>0123456789</div>
            <div style="margin-top: 20px; margin-bottom: 1%;">Heimweg</div>
            <div style="margin-bottom: 1%;">14</div>
            <div style="margin-bottom: 1%;">Türkheim</div>
            <div>86842</div>
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
  background-color: white;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.containerField {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
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
  grid-template-columns: 200px 500px 500px;
}
</style>
