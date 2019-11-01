<template>
  <div>
    <ol>
      <li v-for="(act, i) in activites" v-bind:key="i">{{ act }}</li>
    </ol>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Viewer",
  computed: {
    activites() {
      return this.$store.getters.activities || [];
    },
    ...mapGetters({
      //   activities: "activities",
      selectedPosition: "selectedPosition"
    })
  }
};
</script>

<style></style>
