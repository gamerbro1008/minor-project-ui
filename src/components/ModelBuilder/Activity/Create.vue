<template>
  <div>
    <h3>Can't find?</h3>
    <h4>Then add it</h4>
    <div>
      <input type="text" placeholder="name" v-model="name" />
      <input type="text" placeholder="description" v-model="description" />
    </div>
    <button @click="createActivity" :disabled="isSaving">Save</button>
    <div>{{ msg }}</div>
  </div>
</template>

<script>
import { host } from "@/server.js";
import { mapGetters } from "vuex";
export default {
  name: "Create",
  data() {
    return {
      name: "",
      description: "",
      isSaving: false,
      msg: ""
    };
  },
  computed: mapGetters({
    selectedOrg: "selectedOrgChanged",
    selectedDept: "selectedDeptChanged"
  }),
  methods: {
    createActivity: async function() {
      this.isSaving = true;
      await fetch(
        `${host}/api/org/${this.selectedOrg.id}/dept/${this.selectedDept.id}/act/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: this.name,
            description: this.description
          })
        }
      );
      this.name = "";
      this.description = "";
      this.isSaving = false;
      this.msg = "Created! Try it finding again";
      setTimeout(() => {
        this.msg = "";
      }, 2000);
    }
  }
};
</script>

<style></style>
