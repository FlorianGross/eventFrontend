<template>
  <div></div>
</template>

<script>
export default {
  name: "DetailView",
  data() {
    return {
      id: "",
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
};
</script>

<style>
.id_Holder {
  font-size: 50px;
  text-align: center;
  margin-top: 50px;
}
</style>
