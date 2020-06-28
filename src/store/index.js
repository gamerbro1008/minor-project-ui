import Vue from "vue";
import Vuex from "vuex";
import { host } from "@/server.js";
import { svgAsDataUri } from "save-svg-as-png";

Vue.use(Vuex);
// var proxy = require('html2canvas-proxy');
// var express = require('express');

// var app = express();
// app.use('/', proxy());

export default new Vuex.Store({
  state: {
    selectedOrg: null,
    selectedDept: null,
    selectedActivities: [],
    selectedKey: -1,
    loggedIn: false,
    userDetail: null,
    key: -1,
    modeluri: "",
    isSaving: false
  },
  mutations: {
    selectedOrgChanged(state, newOrg) {
      state.selectedOrg = newOrg;
      state.selectedDept = null;
    },
    loggedInToggle(state, logvalue) {
      state.loggedIn = logvalue["inDB"];
      state.userDetail = logvalue["userDetail"];
    },
    loggedInDetails(state, logvalue) {
      state.userDetail = logvalue["userDetail"];
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
    removeActivity(state) {
      const key = state.selectedKey;

      const parentsOfKeyActivity = state.selectedActivities.filter(
        x => x.key == key
      )[0].parent;

      let index = -1;
      let i = 0;
      state.selectedActivities.forEach(activity => {
        if (activity.parent.includes(key)) {
          console.log("child found");

          const index = activity.parent.indexOf(key);
          activity.parent.splice(index, 1);
          activity.parent = [...activity.parent, ...parentsOfKeyActivity];

          if (activity.parent.length == 0) {
            activity.parent.push(0);
          }
        }
        if (activity.key == key) {
          index = i;
        }
        i++;
      });
      state.selectedKey = parentsOfKeyActivity[0] || 0;
      state.selectedActivities.splice(index, 1);
    },
    joinActivity(state, parentKey) {
      const childActivity = state.selectedActivities.filter(
        x => (x.key = state.selectedKey)
      )[0];
      console.log("child activity", childActivity);

      // childActivity.parent.push(parentKey)
      console.log("added parent", childActivity.parent);

      state.selectedKey = parentKey;
      const x = state.selectedActivities;
      state.selectedActivities = {};
      setTimeout(() => {
        state.selectedActivities = x;
      }, 5);
    },
    clearActivities(state) {
      state.selectedActivities = [];
      state.selectedKey = -1;
      state.key = -1;
    },
    async saveFlowchart(state) {
      console.log("in save flowchart");
      var x = document.getElementsByTagName("rect");
      console.log(document.getElementsByTagName("rect").length);
      for (var i = 0; i < x.length; i++) {
        console.log("in loop");
        x[i].style.stroke = "#000";
        x[i].style.strokeWidth = 2;
        x[i].style.fillOpacity = 0.1;
        console.log("updated");
      }
      var path = document.getElementsByClassName("path");
      console.log("paths: ", path);
      console.log("path length:" + path.length);
      for (var j = 0; j < path.length; j++) {
        console.log("in path loop");
        path[j].style.stroke = "black";
        path[j].style.strokeWidth = 1.5;

        console.log("updated");
      }
      await svgAsDataUri(document.getElementById("f")).then(
        uri =>
          // console.log(uri),
          // console.log("............111111111111111111111111111111........."),
          (state.modeluri = uri),
        console.log(state.modeluri)
      );
      console.log("1111111111111111111111111111111111111");
      console.log(state.modeluri);
      //console.log(state.userDetail.name, state.loggedIn);
      console.log(state.selectedDept.id, state.selectedDept.orgId);
      ////////////////////////////////////////////
      state.isSaving = true;
      if (state.loggedIn != true) {
        state.userDetail = { id: 0 };
        console.log(state.userDetail.id);
      }

      //console.log(this.name);

      await fetch(`${host}/api/model/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dataUri: state.modeluri,
          userId: state.userDetail.id,
          orgId: state.selectedDept.orgId,
          deptId: state.selectedDept.id,
          score: 1
        })
      });
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
    loggedInToggle(state) {
      return state.loggedIn;
    },
    loggedInDetails(state) {
      return state.userDetail;
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
    },
    modelLink(state) {
      return state.modeluri;
    }
  }
});
