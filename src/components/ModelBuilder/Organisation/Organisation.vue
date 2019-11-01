<template>
  <div v-if="selectedOrg == null">
    <h1>Let us find suitable model for your business enterprise.</h1>
    <h3>Select</h3>
    <div>
      <Card v-for="(org, i) in orgs" v-bind:key="i" v-bind:orgData="org" />
    </div>
  </div>

  <!--  -->

  <div v-else>
    <h1>You have selected {{ selectedOrg.name }} organisation type.</h1>
    <button v-on:click="clearOrg">Need something else?</button>
    <Department />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Department from "../Department/Department";
import Card from "./Card";
export default {
  name: "Organisation",
  components: {
    Card,
    Department
  },
  data() {
    return {
      orgs: []
    };
  },
  computed: {
    ...mapGetters({ selectedOrg: "selectedOrgChanged" })
  },
  methods: {
    getOrgsFromServer: async function() {
      const server = "http://127.0.0.1:5000";
      const api = "/api/org/";
      const res = await fetch(server + api);
      const orgs = await res.json();
      this.orgs = orgs;
    },
    clearOrg: function() {
      this.$store.commit("selectedOrgChanged", null);
    }
  },
  created() {
    this.getOrgsFromServer();
  }
};
</script>

<style></style>
