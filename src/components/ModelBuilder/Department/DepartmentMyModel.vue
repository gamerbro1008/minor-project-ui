<template>
  <div v-if="selectedDept == null">
    <h1>Select Department</h1>
    <!-- {{depts}} -->
    <Card v-for="(dept, i) in depts" v-bind:key="i" v-bind:deptData="dept" />
  </div>
  <div v-else>
    <h2>You have selected {{ selectedDept.name }} department</h2>
    <button v-on:click="clearDept" class="but">Choose Department</button>
    <MyModel />
  </div>
</template>

<script>
import { host } from "@/server.js";
import { mapGetters } from "vuex";
import Card from "../ModelRecommender/Card";
import MyModel from "../DashboardOptions/MyModel";
export default {
  name: "DepartmentMyModel",
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
      const server = host;
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
    MyModel
  }
};
</script>

<style></style>
