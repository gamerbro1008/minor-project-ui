<template>
  <div class="viewer">
    <div>Selected Node: {{ selectedPosition }}</div>
    <FlowchartOperations />
    <Flowchart :nodes="allActivities" v-if="isRefreshing == false" />
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

<style lang="scss" scoped>
.viewer {
  padding: 5px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
}
</style>
