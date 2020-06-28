<template>
  <div class="recommend">
    <div>
      <h2>These are Models created by you...</h2>
      <h3>Click the "Show Model" to see that Model</h3>
      <!-- suggested models -->
      <ModelCard
        v-for="(model, i) in myModels"
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
      myModels: []
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
      selectedDept: "selectedDeptChanged",
      userDetails: "loggedInDetails"
    })
  },
  methods: {
    getMyModels: async function() {
      console.log("in my models");
      this.myModels = [];
      const res = await fetch(
        `${host}/api/org/${this.selectedOrg.id}/dept/${this.selectedDept.id}/modelScore/myModels/${this.userDetails.id}`
      );
      console.log("request sent");
      const models = await res.json();
      this.myModels = models;
      console.log("models....................", models);
      console.log("1111111111111111111111111111111111111111111111");
      console.log(
        "..................mymodels....................",
        this.myModels
      );
    }
  },
  created() {
    console.log("In created");
    this.getMyModels();
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
