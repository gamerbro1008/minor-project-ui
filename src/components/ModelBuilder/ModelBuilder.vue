<template>
  <div>
    <Organisation />
  </div>
</template>

<script>
import Organisation from "./Organisation/Organisation";
export default {
  name: "ModelBuilder",
  components: {
    Organisation
  }
};
</script>

<style lang="scss">
.card {
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 20px;
  user-select: none;
}
</style>
