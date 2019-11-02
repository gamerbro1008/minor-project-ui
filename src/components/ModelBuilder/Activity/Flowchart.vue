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
    const that = this;
    console.log(this.nodes);
    const processingDict = {};
    for (const node of this.nodes) {
      const key = node.key;
      const chartElement = this.chart.addElement(`${node.key}`, {
        label: node.name
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

    // const idea = this.chart.addElement("idea");
    // const A = this.chart.addElement("A", { label: "vscode" });
    // const B = this.chart.addElement("B", { label: "github" });
    // idea.leadsTo(A).leadsTo(B);
    // const C = this.chart.addElement("C", { label: "npm" });
    // A.leadsTo(C);

    // A.on("click", function() {
    //   console.log("click!");
    // });
  },
  beforeDestroy() {
    console.log("Destroyed");
    this.chart.destroy();
  }
};
</script>

<style></style>
