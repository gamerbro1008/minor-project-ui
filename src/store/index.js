import Vue from "vue";
import Vuex from "vuex";
import { host } from "@/server.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedOrg: null,
    selectedDept: null,
    selectedActivities: [],
    selectedKey: -1,
    key: -1
  },
  mutations: {
    selectedOrgChanged(state, newOrg) {
      state.selectedOrg = newOrg;
      state.selectedDept = null;
    },
    selectedDeptChanged(state, newDept) {
      if (newDept != state.selectedDept) {
        state.selectedActivities = [];
        state.selectedKey = -1;
        state.key = -1;
      }
      state.selectedDept = newDept;
    },
    addActivity(state, activity) {
      const addToSuggestion = async function() {
        const prevAct =
          state.selectedActivities.filter(x => x.key == state.selectedKey)[0] ||
          null;
        const suggestedAct = activity;
        if (prevAct) {
          await fetch(
            `${host}/api/org/${suggestedAct.orgId}/dept/${suggestedAct.deptId}/activityScore/${prevAct.id}/increment/${suggestedAct.id}`
          );
        }
      };
      addToSuggestion();

      activity = JSON.parse(JSON.stringify(activity));
      if (activity.parent == undefined) {
        activity.parent = [];
      }
      activity.parent.push(state.selectedKey);
      state.key++;
      activity.key = state.key;
      state.selectedKey = state.key; // so that next item comes below previous item by default

      state.selectedActivities.push(activity);
    },
    removeActivity(state, key) {
      const parentOfKeyActivity = state.selectedActivities.filter(
        x => x.key == key
      )[0].parent;
      state.selectedActivities.forEach(activity => {
        if (activity.parent.includes(key)) {
          const index = activity.parent.indexOf(key);
          activity.parent.splice(index, 1);
          activity.parent = [...activity.parent, ...parentOfKeyActivity];

          if (activity.parent.length == 0) {
            activity.parent.push(0);
          }
        }
      });
    },
    clearActivities(state) {
      state.selectedActivities = [];
      state.selectedKey = -1;
      state.key = -1;
    },
    changeSelectedPosition(state, key = null) {
      if (key == null) {
        key = state.key;
      }
      state.selectedKey = key;
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
      return (
        state.selectedActivities.filter(x => x.key == state.selectedKey)[0] || {
          id: 0
        }
      );
    },
    selectedPosition(state) {
      return state.selectedKey;
    }
  }
});
