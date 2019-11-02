<template>
  <div>
    {{ selectedPosition }}
    <ol>
      <li
        v-for="(act, i) in activites"
        v-bind:key="i"
        v-on:click="setSelected(act.key)"
        class="card"
      >
        <ul>
          <li v-for="(data, name) in act" :key="name">
            {{ name }} - {{ data }}
          </li>
        </ul>
      </li>
    </ol>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Viewer",
  computed: {
    activites() {
      return this.$store.getters.activities || [];
    },
    ...mapGetters({
      //   activities: "activities",
      selectedPosition: "selectedPosition"
    })
  },
  methods: {
    ...mapMutations(["changeSelectedPosition"]),
    setSelected: function(key) {
      this.changeSelectedPosition(key);
    }
  }
};
</script>

<style></style>
