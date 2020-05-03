<template>
  <div>Hi {{ userDetail.name }}</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ModelRecommender",
  computed: {
    ...mapGetters({ userDetail: "loggedInDetails" })
  },
  methods: {}
};
</script>

<style></style>
