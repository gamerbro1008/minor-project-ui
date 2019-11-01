<template>
  <div>{{ suggestedActivities }}</div>
</template>

<script>
export default {
  name: "Picker",
  data() {
    return {
      suggestedActivities: []
    };
  },
  computed: {
    lastActivity() {
      const x = this.$state.getters.lastActivity || 0;
      return x;
    }
  },
  watch: {
    suggestedActivities: async function() {
      console.log("Chala");
      const lastActivityId = this.lastActivity.id;
      const res = await fetch(
        "http:///127.0.0.1:5000/api/activityScore/act/" + lastActivityId
      );
      const acts = await res.json();
      return acts;
    }
  }
};
</script>

<style></style>
