<template>
  <div>
    <div>
      <div>
        <h3>Recommended Activities</h3>
        <h4>Click the suggestion to add activity in flowchart.</h4>
        <!-- suggested activities -->
        <ActivityCard
          v-for="(activity, i) in suggestedActivities"
          :key="i"
          :activityId="activity.suggestedActId"
          v-on:click="addActivity"
        />
      </div>
      <hr />
      <div>
        <h3>Searched</h3>
        <input type="text" v-model="searchTerm" placeholder="search" />
        <ActivityCard
          v-for="(activity, i) in searchedActivities"
          :key="i"
          :activityId="activity.suggestedActId"
          v-on:click="addActivity"
        />
      </div>

      <!-- <hr />
      <div>
        <h3>All</h3>
        <ActivityCard
          v-for="(activity, i) in allActivities"
          :key="i"
          :activityData="activity"
          v-on:click="addActivity"
        />
      </div> -->
      <hr />
      <div>
        <Create />
      </div>
    </div>
  </div>
</template>

<script>
import { host } from "@/server.js";
import { mapGetters, mapMutations } from "vuex";
import ActivityCard from "./ActivityCard";
import Create from "./Create";
export default {
  name: "Picker",
  data() {
    return {
      allActivities: [],
      suggestedActivities: [],
      searchTerm: "",
      searchedActivities: []
    };
  },
  components: {
    ActivityCard,
    Create
  },
  computed: mapGetters({
    selectedOrg: "selectedOrgChanged",
    selectedDept: "selectedDeptChanged",
    lastActivity: "lastActivity"
  }),
  watch: {
    lastActivity() {
      this.getSuggestedActivities();
    },
    searchTerm() {
      this.getSearchedActivities();
    }
  },
  methods: {
    ...mapMutations(["addActivity"]),
    getAllActivities: async function() {
      const res = await fetch(
        `${host}/api/org/${this.selectedOrg.id}/dept/${this.selectedDept.id}/act/`
      );
      const acts = await res.json();
      this.allActivities = acts;
    },
    getSuggestedActivities: async function() {
      this.suggestedActivities = [];
      const res = await fetch(
        `${host}/api/org/${this.selectedOrg.id}/dept/${
          this.selectedDept.id
        }/activityScore/${this.lastActivity.id || 0}`
      );
      const acts = await res.json();
      this.suggestedActivities = acts;
    },
    getSearchedActivities: async function() {
      this.searchedActivities = [];
      if (this.searchTerm == "" || this.searchTerm == null) {
        return;
      }
      const res = await fetch(
        `${host}/api/org/${this.selectedOrg.id}/dept/${this.selectedDept.id}/activityScore/${this.lastActivity.id}/search/${this.searchTerm}`
      );
      const acts = await res.json();
      this.searchedActivities = acts;
    }
  },
  created() {
    this.getAllActivities();
    this.getSuggestedActivities();
  }
};
</script>

<style></style>
