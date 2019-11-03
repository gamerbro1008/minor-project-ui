<template>
  <div>
    <button v-on:click="clearActivities">Clear</button>
    <button v-on:click="removeActivity">Remove</button>
    <!-- <button v-on:click="joinActivity(joinWith)">Join</button>
      <input type="number" v-model="joinWith"> -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "FlowchartOperations",
  methods: {
    ...mapMutations(["clearActivities", "removeActivity", "joinActivity"])
  },
  data() {
    return {
      joinWith: 0
    };
  }
};
</script>

<style></style>
