<template>
  <div class="body-of-impressum">
    <div class="impressumField">
      <v-card style="height: 800px;">
        <v-card-title>
          <span class="headline">Impressum</span>
        </v-card-title>
        <v-card style="height: 350px">
          <v-card-text class="impressumText"></v-card-text>
          <h3>Hochschule Ravensburg-Weingarten</h3>
          <h3>University of Applied Sciences</h3>
          <div
            class="grid-containerRwu"
            style="margin-top: 40px;"
          >
            <img
              class="rwu"
              src="../assets/rwu.png"
            >
              <div
                class="text"
                style="margin-left: 250px;"
              >
                <div>Doggenriedstraße</div>
                <div>88250 Weingarten</div>
                <div>Deutschland</div>
                <div style="margin-top: 15px;">Telefon: +49 (0) 751/501-9344</div>
                <div>Telefax: +49 (0) 751/501-9876</div>
                <div>E-Mail: info@rwu.de</div>
    </div>
    <div class="text">
      <div>Prüfungsfach:</div>
      <div>Dozentin:</div>
      <div>Semester:</div>
      <div>Gruppe:</div>
    </div>
    <div class="text">
      <div>Web-Programmierung</div>
      <div>Bianca-Maria Braun</div>
      <div>SoSe 2022</div>
      <div>S</div>
    </div>
  </div>
  </v-card>
  <v-card style="height: 200px">
    <v-card-text class="impressumText"></v-card-text>
    <h4>Florian Groß</h4>
    <div
      class="grid-containerPersonen"
      style="margin-top: 20px;"
    >
      <img
        class="rwu"
        src="../assets/cos.jpg"
      >
        <div
          class="text"
          style="margin-left: 250px;"
        >
          <div>Vorname:</div>
          <div>Nachname:</div>
          <div>E-Mail:</div>
          <div>Semester:</div>
          </div>
          <div class="text">
            <div>Florian</div>
            <div>Groß</div>
            <div>florian.gross@hs-weingarten.de</div>
            <div>4</div>
          </div>
          </div>
  </v-card>
  <v-card style="height: 220px">
    <v-card-text class="impressumText"></v-card-text>
    <h4>Sven Herz</h4>
    <div
      class="grid-containerPersonen"
      style="margin-top: 20px;"
    >
      <img
        class="rwu"
        src="../assets/bild3.jpg"
      >
        <div
          class="text"
          style="margin-left: 250px;"
        >
          <div>Vorname:</div>
          <div>Nachname:</div>
          <div>E-Mail:</div>
          <div>Semester:</div>
          </div>
          <div class="text">
            <div>Sven</div>
            <div>Herz</div>
            <div>sven.herz@hs-weingarten.de</div>
            <div>4</div>
          </div>
          </div>
  </v-card>
  </v-card>
  </div>
  </div>
</template>

<script>
export default {
  name: "ImpressumView",
};
</script>

<style>
.headline {
  color: black;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
}
.rwu {
  max-width: 100% !important;
  height: 80% !important;
  display: block;
}
.text {
  color: #000000;
  font-size: small;
  margin-top: 10px;
}
h3 {
  margin-left: 20px;
  color: #6638b6;
}
h4 {
  margin-left: 20px;
  color: #6638b6;
}
.impressumText {
  text-align: left;
  margin-left: 10px;
}
.body-of-impressum {
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
.impressumField {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
}
.grid-containerRwu {
  margin-top: 20px;
  margin-left: 20px;
  display: grid;
  grid-template-columns: 100px 600px 100px 300px;
}
.grid-containerPersonen {
  margin-top: 20px;
  margin-left: 20px;
  display: grid;
  grid-template-columns: 100px 340px 300px;
}
</style>