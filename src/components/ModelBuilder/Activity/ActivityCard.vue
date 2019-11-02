<template>
  <div class="card" v-on:click="activityClicked">
    <div v-if="realActivityData">
      <h1>{{ realActivityData.name }}</h1>
      <h3>{{ realActivityData.description }}</h3>
    </div>
  </div>
</template>

<script>
import { host } from "@/server.js";
import { mapGetters } from "vuex";
export default {
  name: "ActivityCard",
  props: ["activityId", "activityData"],
  data() {
    return {
      realActivityData: null
    };
  },
  created() {
    if (this.activityData) {
      this.realActivityData = this.activityData;
    } else {
      this.getActivityData();
    }
  },
  computed: mapGetters(["selectedOrgChanged", "selectedDeptChanged"]),
  methods: {
    getActivityData: async function() {
      const res = await fetch(
        `${host}/api/org/${this.selectedOrgChanged.id}/dept/${this.selectedDeptChanged.id}/act/${this.activityId}`
      );
      const data = await res.json();
      this.realActivityData = data;
    },
    activityClicked() {
      this.$emit("click", this.realActivityData);
    }
  }
};
</script>

<style lang="scss" scoped></style>
