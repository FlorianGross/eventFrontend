<template>
  <h1>Logout</h1>
</template>

<script>
export default {
  name: "LogoutComponent",
  mounted() {
    console.log("logout");
    this.$store.dispatch("auth/logout");
    this.$router.push("/");
  },
};
</script>

<style></style>
