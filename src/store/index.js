import Vue from "vue";
import Vuex from "vuex";
import { host } from "@/server.js";
//import html2canvas from "html2canvas";

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
    key: -1
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
    //saveFlowchart() {
    // var replaceSVGwithCanvas = function(callback) {
    //   //find all svg elements in $container
    //   var $container = $("flow");
    //   //$container is the jQuery object of the div that you need to convert to image. This div may contain highcharts along with other child divs, etc
    //   var svgElements = $container.find("svg");
    //   svgElements.each(function() {
    //     var canvas, xml;
    //     canvas = document.createElement("canvas");
    //     canvas.className = "screenShotTempCanvas";
    //     //convert SVG into a XML string
    //     xml = new XMLSerializer().serializeToString(this);
    //     // Removing the name space as IE throws an error
    //     xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, "");
    //     //draw the SVG onto a canvas
    //     canvg(canvas, xml);
    //     $(canvas).insertAfter(this);
    //     $(this).hide();
    //   });
    //   callback(); //to be called after the process in finished
    // };
    // replaceSVGwithCanvas(function onComplete() {
    //   html2canvas(document.getElementById("canvas"), {
    //     onrendered: function(canvasObj) {
    //       startPrintProcess(canvasObj, "printedPDF", function() {
    //         alert("PDF saved");
    //       });
    //       //save this object to the pdf
    //     }
    //   });
    // });

    //   html2canvas(document.querySelector("#flow"), {
    //     foreignObjectRendering: true,
    //     windowWidth: document.querySelector("#flow").scrollWidth,
    //     windowHeight: document.querySelector("#flow").scrollHeight
    //   }).then(canvas => {
    //     document.body.appendChild(canvas);
    //     var img = canvas.toDataURL();
    //     console.log(img);
    //   });
    // },
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
    }
  }
});
