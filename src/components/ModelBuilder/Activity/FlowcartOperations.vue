<template>
  <div>
    <button v-on:click="clearActivities" class="btn">Clear</button>
    <button v-on:click="removeActivity" class="btn">Remove</button>
    <button @click="saveFlowchart" class="link-download btn">Save</button>
    <!-- <button v-on:click="joinActivity(joinWith)">Join</button>
      <input type="number" v-model="joinWith"> -->
    <!-- <canvas id="canvas" width="500" height="500"></canvas>-->
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "FlowchartOperations",
  methods: {
    ...mapMutations([
      "clearActivities",
      "removeActivity",
      "joinActivity",
      "saveFlowchart"
    ])
  },
  data() {
    return {
      joinWith: 0
    };
  }
};
</script>

<style>
.btn {
  background-color: #252b59; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
}
</style>
