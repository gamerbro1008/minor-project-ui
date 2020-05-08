<template>
  <VueFlowy :chart="chart"></VueFlowy>
</template>

<script>
import { mapMutations } from "vuex";
import { VueFlowy, FlowChart } from "vue-flowy";
export default {
  name: "Flowchart",
  props: ["nodes"],
  components: {
    VueFlowy
  },
  data() {
    return {
      chart: new FlowChart({ direction: "TB" })
    };
  },
  methods: {
    ...mapMutations(["changeSelectedPosition"])
  },
  mounted() {
    console.log("in mounted");

    const that = this;
    console.log(this.nodes);
    const processingDict = {};
    for (const node of this.nodes) {
      const key = node.key;
      const chartElement = this.chart.addElement(`${node.key}`, {
        label: `${node.name} - (${node.key})`
      });
      chartElement.on("click", function() {
        that.changeSelectedPosition(key);
      });
      processingDict[key] = chartElement;
      for (const parent of node.parent) {
        if (parent != -1) {
          processingDict[parent].leadsTo(chartElement);
        }
      }
    }
  },
  beforeDestroy() {
    console.log("Destroyed");

    this.chart.destroy();
  }
};
//path;

// var contentBox=document.getElementsByTagName("rect");
// contentBox.style.fill="white";
// contentBox.style.stroke= "#000";
// contentBox.style.stroke-width = 2;
// contentBox.style.fill-opacity= 0.1;
</script>

<style lang="scss">
.flow-chart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
