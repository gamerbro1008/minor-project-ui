<template>
  <div class="home">
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
