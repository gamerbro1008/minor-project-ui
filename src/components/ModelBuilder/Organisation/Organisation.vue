<template>
  <div v-if="selectedOrg == null">
    <img
      class="fit-picture"
      src="@/assets/img/business_banner1.jpg"
      alt="business banner"
    />
    <h3>We can help you to create a Business Procesess Model like...</h3>
    <img
      class="bpm fit-picture"
      src="@/assets/img/bpm1.png"
      alt="business banner"
    />
    <img
      class="bpm fit-picture"
      src="@/assets/img/bpm2.png"
      alt="business banner"
    />
    <img class="bpm" src="@/assets/img/bpm3.png" alt="business banner" />
    <h1>Let us find a suitable model for your business enterprise.</h1>
    <h3>Choose a category</h3>
    <div>
      <Card v-for="(org, i) in orgs" v-bind:key="i" v-bind:orgData="org" />
    </div>
  </div>
  <div v-else>
    <h1>You have selected {{ selectedOrg.name }} organisation</h1>
    <button v-on:click="clearOrg" class="but">Home</button>
    <Department />
  </div>
</template>

<script>
import { host } from "@/server.js";
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
      const server = host;
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

<style lang="scss">
.fit-picture {
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 20px;
  width: 95%;
  height: 450px;
  background-size: 100% 100%;
}
.bpm {
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 20px;
  width: 32%;
  height: 300px;
  background-size: 100% 100%;
}
.but {
  background-color: #252b59; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

//.zoom {
//padding: 50px;
//background-color: green;
//transition: transform .2s; /* Animation */
//width: 200px;
//height: 200px;
//margin: 0 auto;
//}

.bpm:hover {
  transform: scale(
    1.5
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  background-color: whitesmoke;
}
</style>
