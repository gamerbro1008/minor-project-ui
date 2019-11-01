<template>
  <div v-if="selectedDept == null">
    <h1>Select Department</h1>
    <!-- {{depts}} -->
    <Card v-for="(dept, i) in depts" v-bind:key="i" v-bind:deptData="dept" />
  </div>
  <div v-else>
    <h1>You have selected {{ selectedDept.name }} department type.</h1>
    <button v-on:click="clearDept">Need something else?</button>
    <Activity />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "../Organisation/Card";
import Activity from "../Activity/Activity";
export default {
  name: "Department",
  data() {
    return {
      depts: []
    };
  },
  computed: {
    ...mapGetters({
      selectedOrg: "selectedOrgChanged",
      selectedDept: "selectedDeptChanged"
    })
  },
  methods: {
    getDeptsFromServer: async function() {
      const server = "http://127.0.0.1:5000";
      const api = `/api/org/${this.selectedOrg.id}/dept/`;
      const res = await fetch(server + api);
      const depts = await res.json();
      this.depts = depts;
    },
    clearDept: function() {
      this.$store.commit("selectedDeptChanged", null);
    }
  },
  created() {
    this.getDeptsFromServer();
  },
  components: {
    Card,
    Activity
  }
};
</script>

<style></style>
