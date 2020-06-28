<template>
  <div class="card">
    <div v-if="modelData">
      <div class="wrap-collabsible">
        <input v-bind:id="modelData.id" class="toggle clr" type="checkbox" />
        <label v-bind:for="modelData.id" class="lbl-toggle"
          >Show Model -- Chosen by {{ modelData.score }} user(s) :)</label
        >
        <div class="collapsible-content">
          <div class="content-inner">
            <!-- image............................................................ -->
            <div><img v-bind:src="modelData.dataUri" /></div>
            <button v-on:click="chooseModel" class="but">Perfect!!!</button>
          </div>
        </div>
      </div>
      <!-- image............................................................ -->
      <div>
        <!-- <img v-bind:src="modelData.dataUri" /> -->
      </div>
      <!-- <button v-on:click="chooseModel" class="but">Perfect!!!</button> -->
    </div>
  </div>
</template>

<script>
import { host } from "@/server.js";
import { mapGetters } from "vuex";
export default {
  name: "ModelCard",
  props: ["modelData"],
  data() {
    return {
      realModelData: null,
      open: false
    };
  },
  created() {
    if (this.modelData) {
      this.realModelData = this.modelData;
    }
  },
  computed: mapGetters(["selectedOrgChanged", "selectedDeptChanged"]),
  methods: {
    chooseModel: async function() {
      //  console.log(modelData);
      //  console.log(modelData.dataUri);
      //  console.log(modelData.id);
      console.log(this.$props.modelData);

      await fetch(
        //  "/api/org/${this.realModelData.orgId}/dept/${this.realModelData.deptId}/modelScore/"'increment/<modelId>'
        `${host}/api/org/${this.realModelData.orgId}/dept/${this.realModelData.deptId}/modelScore/increment/${this.realModelData.id}`
      );
      //const data = await res.json();
    }
    //  modelClicked() {
    //    this.$emit("click", this.realModelData);
    //  }
  }
};
</script>

<style lang="scss" scoped>
.wrap-collabsible {
  margin-bottom: 1.2rem 0;
}

.clr {
  background: #252b59;
}

input[type="checkbox"] {
  display: none;
}

.lbl-toggle {
  display: block;
  padding: 1rem;
  color: #252b59;
  background: white;
  cursor: pointer;

  border-radius: 7px;
  transition: all 0.25s ease-out;
}

.lbl-toggle:hover {
  color: white;
  background-color: #252b59;
}

.lbl-toggle::before {
  content: " ";
  display: inline-block;

  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid currentColor;
  vertical-align: middle;
  margin-right: 0.7rem;
  transform: translateY(-2px);

  transition: transform 0.2s ease-out;
}

.toggle:checked + .lbl-toggle::before {
  transform: rotate(90deg) translateX(-3px);
}

.collapsible-content {
  max-height: 0px;
  overflow: hidden;
  transition: max-height 0.25s ease-in-out;
}

.toggle:checked + .lbl-toggle + .collapsible-content {
  max-height: 100%;
}

.toggle:checked + .lbl-toggle {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.collapsible-content .content-inner {
  border-bottom: 1px solid rgba(250, 224, 66, 0.45);
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  padding: 0.5rem 1rem;
}
</style>
