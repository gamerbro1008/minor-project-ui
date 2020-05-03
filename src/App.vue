<template>
  <div id="app">
    <h1 style="color:navy;text-align:center;">
      <font size="20">Business Buddy</font>
    </h1>
    <hr style="color:dark grey;height:2px;" />
    <div id="nav">
      <router-link to="/">Home</router-link>|

      <router-link to="/" v-if="loggedIn == true"
        ><span v-on:click="clearLog()">Logout</span></router-link
      >
      <router-link to="/login" v-if="loggedIn == false"
        >Login/Register</router-link
      ><!--modified-->
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isSaving: false
    };
  },

  computed: {
    ...mapGetters({
      loggedIn: "loggedInToggle",
      userDetail: "loggedInDetails"
    })
  },
  methods: {
    clearLog() {
      this.isSaving = true;
      const userDetails = { inDB: false, userDetail: null };
      console.log("...........................");
      this.$store.commit("loggedInToggle", userDetails);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: right;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
