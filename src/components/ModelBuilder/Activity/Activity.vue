<template>
  <div class="activity">
    <Viewer />
    <Picker />
  </div>
</template>

<script>
import Viewer from "./Viewer";
import Picker from "./Picker";
export default {
  name: "Activity",
  components: {
    Viewer,
    Picker
  }
};
</script>

<style lang="scss">
.activity {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}
.activity > * {
  border: 2px solid black;
  margin: 5px;
  min-height: 200px;
}
</style>
