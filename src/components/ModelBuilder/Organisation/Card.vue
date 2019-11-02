<template>
  <div v-if="orgData != null" v-on:click="orgSelected" class="card">
    <h3>{{ orgData.name }}</h3>
  </div>
  <div v-else v-on:click="deptSelected" class="card">
    <h3>{{ deptData.name }}</h3>
    <p>{{ deptData.description }}</p>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["orgData", "deptData"],
  methods: {
    orgSelected: function() {
      this.$store.commit("selectedOrgChanged", this.orgData);
    },
    deptSelected: function() {
      this.$store.commit("selectedDeptChanged", this.deptData);
    }
  }
};
</script>

<style></style>
