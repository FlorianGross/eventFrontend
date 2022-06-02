<template>
  <div></div>
</template>

<script>
export default {
  name: "AdminView",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser || !this.currentUser.roles.includes("ROLE_ADMIN")) {
      this.$router.push("/profile");
    }
  },
};
</script>

<style></style>
