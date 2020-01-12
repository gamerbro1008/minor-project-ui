<template>
  <div class="home">
    <!-- <img class="fit-picture" src="@/assets/img/business_banner1.jpg" alt="business banner"> -->
    <ModelBuilder />
  </div>
</template>

<script>
// @ is an alias to /src
import ModelBuilder from "@/components/ModelBuilder/ModelBuilder.vue";

export default {
  name: "home",
  components: {
    ModelBuilder
  }
};
</script>
<style></style>
