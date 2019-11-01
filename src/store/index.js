import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedOrg: null,
    selectedDept: null,
    selectedActivities: [{ id: 2 }],
    selectedPosition: 1
  },
  mutations: {
    selectedOrgChanged(state, newOrg) {
      state.selectedDept = null;
      state.selectedOrg = newOrg;
    },
    selectedDeptChanged(state, newDept) {
      state.selectedDept = newDept;
    },
    addActivity(state, activity) {
      state.selectedActivities.splice(state.selectedPosition, 0, activity);
      state.selectedPosition += 1;
    },
    removeActivity(state, index) {
      state.selectedActivities.splice(index, 1);
      state.selectedPosition -= 1;
    },
    clearActivities(state) {
      state.selectedActivities = [];
      state.selectedPosition = 0;
    },
    changeSelectedPosition(state, index = null) {
      if (index == null) {
        index = state.selectedActivities.length - 1;
      }
      state.selectedPosition = index;
    }
  },
  getters: {
    selectedOrgChanged(state) {
      return state.selectedOrg;
    },
    selectedDeptChanged(state) {
      return state.selectedDept;
    },
    activities(state) {
      return state.selectedActivities;
    },
    lastActivity(state) {
      return state.selectedActivities[state.selectedActivities.length - 1] || 0;
    },
    selectedPosition(state) {
      return state.selectedPosition;
    }
  }
});
