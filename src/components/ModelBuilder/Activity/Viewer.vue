<template>
  <div>
    <div>Selected Node: {{ selectedPosition }}</div>
    <FlowchartOperations />
    <Flowchart :nodes="allActivities" v-if="isRefreshing == false" />
    <!-- <ol>
      <li
        v-for="(act, i) in allActivities"
        v-bind:key="i"
        v-on:click="setSelected(act.key)"
        class="card"
      >
        <ul>
          <li v-for="(data, name) in act" :key="name">{{ name }} - {{ data }}</li>
        </ul>
      </li>
    </ol>-->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Flowchart from "./Flowchart";
import FlowchartOperations from "./FlowcartOperations";
export default {
  name: "Viewer",
  computed: {
    // activites() {
    //   return this.$store.getters.activities;
    // },
    ...mapGetters({
      activities: "activities",
      selectedPosition: "selectedPosition"
    })
  },
  watch: {
    activities(newVal) {
      this.isRefreshing = true;
      this.allActivities = newVal;
      setTimeout(() => {
        this.isRefreshing = false;
      }, 5);
    }
  },
  data() {
    return {
      isRefreshing: false,
      allActivities: []
    };
  },
  methods: {
    ...mapMutations(["changeSelectedPosition"]),
    setSelected: function(key) {
      this.changeSelectedPosition(key);
    }
  },
  components: {
    Flowchart,
    FlowchartOperations
  }
};
</script>

<style></style>
