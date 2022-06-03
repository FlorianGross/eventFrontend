<template>
<div class="body">
   <v-card width="95%">
     <v-container>
      <v-layout row wrap>
              <v-flex
                v-for="n in 9"
                :key="n"
                xs4
              >
          <div class="item" @click="eventClick(n)">
            <v-card>
            <v-img src="../assets/WelcomeBackParty _2022.jpg" height="1000"></v-img>
            <v-card-text>
              Welcome Back Party
            </v-card-text>
          </v-card>
          </div>
        </v-flex>

      </v-layout>
    </v-container>
    </v-card>
    </div>
</template>

<script>
import router from '@/router';

export default {
  name: 'HomeView',
  methods: {
    eventClick(event) {
      router.push({ path: "/event/"+event }).catch(() => {});
    }
  }
}
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
