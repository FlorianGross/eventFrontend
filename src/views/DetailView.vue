<template>
  <div class="id_Holder">
      {{ getId()}}
  </div>
</template>

<script> 
export default {
    name: "DetailView",
    setup(){
        const route = this.$route.params.id;
        console.log(route);
        return {
            getId: function(){
                return route;
            }
        }
    }

}
</script>

<style>
.id_Holder {
    font-size: 50px;
    text-align: center;
    margin-top: 50px;
}
</style>