<template>
  <div class="recommend">
    in RecommendedModel
    <!-- <Viewer />
    <Picker /> -->
  </div>
</template>

<script>
//import Viewer from "./Viewer";
//import Picker from "./Picker";
export default {
  name: "RecommendedModel",
  components: {
    //Viewer,
    //Picker
  }
};
</script>

<style lang="scss">
.recommend {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}
.recommend > * {
  border: 2px solid black;
  margin: 5px;
  min-height: 200px;
}
</style>
