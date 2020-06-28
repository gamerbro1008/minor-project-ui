<template>
  <div class="recommend">
    <div>
      <h2>Recommended Models</h2>
      <h4>Click the "Show Model" to see that Model</h4>
      <!-- suggested models -->
      <ModelCard
        v-for="(model, i) in suggestedModels"
        :key="i"
        :modelId="model.Id"
        v-bind:modelData="model"
      />
    </div>
    <!-- <Viewer />
    <Picker /> -->
  </div>
</template>

<script>
//import Viewer from "./Viewer";
//import Picker from "./Picker";
import ModelCard from "./ModelCard";
import { host } from "@/server.js";
import { mapGetters } from "vuex";
export default {
  name: "RecommendedModel",
  data() {
    return {
      //allActivities: [],
      suggestedModels: []
      // searchTerm: "",
      // searchedActivities: []
    };
  },
  components: {
    ModelCard
    //Picker
  },
  computed: {
    ...mapGetters({
      selectedOrg: "selectedOrgChanged",
      selectedDept: "selectedDeptChanged"
    })
  },
  methods: {
    getSuggestedModels: async function() {
      console.log("in suggested models");
      this.suggestedModels = [];
      const res = await fetch(
        `${host}/api/org/${this.selectedOrg.id}/dept/${this.selectedDept.id}/modelScore/`
      );
      console.log("request sent");
      const models = await res.json();
      this.suggestedModels = models;
      console.log("models....................", models);
      console.log("1111111111111111111111111111111111111111111111");
      console.log(
        "..................suggestedmodels....................",
        this.suggestedModels
      );
    }
  },
  created() {
    console.log("In created");
    this.getSuggestedModels();
    console.log("funcion called");
  }
};
</script>

<style lang="scss">
.recommend {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
}
.recommend > * {
  border: 2px solid black;
  margin: 5px;
  min-height: 200px;
}
</style>
