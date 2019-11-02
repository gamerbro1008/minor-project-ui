<template>
  <div>
    <div>
      <div>
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
        <!-- all activities -->
        <!-- <ActivityCard v-for="(activity,i) in allActivities" :key="i" :activityData="activity"  v-on:click="addActivity" />   -->
      </div>
    </div>
  </div>
</template>

<script>
import { host } from "@/server.js";
import { mapGetters, mapMutations } from "vuex";
import ActivityCard from "./ActivityCard";
export default {
  name: "Picker",
  data() {
    return {
      allActivities: [],
      suggestedActivities: []
    };
  },
  components: {
    ActivityCard
  },
  computed: mapGetters({
    selectedOrg: "selectedOrgChanged",
    selectedDept: "selectedDeptChanged",
    lastActivity: "lastActivity"
  }),
  watch: {
    lastActivity(newVal) {
      console.log("Showing new suggestion for", newVal);
      this.getSuggestedActivities();
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
    }
  },
  created() {
    this.getAllActivities();
    this.getSuggestedActivities();
  }
};
</script>

<style></style>
