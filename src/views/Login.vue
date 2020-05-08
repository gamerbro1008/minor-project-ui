<template>
  <div v-if="loggedIn == false">
    <div v-if="register == false">
      <div class="login">
        <h1>
          Login to get access to our services which are made...only for you!
        </h1>
        <div class="card">
          <div class="formhead card" id="login">
            <h1 align="center">LOGIN</h1>
          </div>

          <!--<form>-->
          <div class="card">
            <label for="username" class="lbl">Username:</label>
            <input
              type="text"
              name="username"
              class="card"
              placeholder="Please Enter Your Username"
              required
              v-model="username"
            /><br />
            <label for="pass" class="lbl">Password:</label>
            <input
              type="password"
              name="pass"
              class="card"
              placeholder="Please Enter Your Password"
              required
              v-model="pass"
            />
            <br />
            <button class="btn" v-on:click="doLogin()">GO!</button>{{ msg }}
            <div></div>
          </div>
          <label for="quesregister" class="lab fl">New to Business Buddy?</label
          ><br />
          <button class="btn col2 bor" v-on:click="setRegister()">
            Sign up!
          </button>
          <!-- <label for='quesregister' class="lbl">New to Business Buddy?</label> -->
          <!-- <button class="btn">Let's Sign up!</button> -->
          <!--</form>-->
        </div>

        <!---------bytech walon ka form--------->
        <!---------bytech walon ka form--------->
        <!---------bytech walon ka form--------->
      </div>
    </div>
    <div v-else>
      <div class="card">
        <div class="card formhead" id="sign">
          <h1 align="center">SIGN-UP</h1>
        </div>

        <div class="card">
          <!-- <div class="invisible-card"> -->
          <label for="name" class="lbl">Name:</label>
          <input
            type="text"
            name="name"
            class="card fr"
            placeholder="Please Enter Your Name"
            required
            v-model="name"
          /><br />
          <br />
          <!-- </div> -->
          <!-- <div class="invisible-card"> -->
          <label for="orgName" class="lbl">organisation name:</label><br />
          <input
            type="text"
            name="orgName"
            class="card fr"
            placeholder="Please Enter Your Organisation name"
            required
            v-model="orgName"
          /><br />
          <br />
          <!--</div>-->
          <!-- <div class="invisible-card"> -->
          <label for="emailid" class="lbl">Email-id:</label>
          <input
            type="email"
            name="emailid"
            class="card fr"
            placeholder="Please Enter Your Email-id"
            required
            v-model="email"
          /><br />
          <br />
          <!-- </div> -->
          <label for="contact" class="lbl">Phone number:</label>
          <input
            type="number"
            name="contact"
            class="card fr"
            placeholder="Enter Your Phone Number"
            required
            v-model="contact"
          />
          <br />
          <label for="orgDesc" class="lbl">Organisation description:</label>
          <input
            type="text"
            name="orgDesc"
            class="card fr"
            placeholder="Please Enter Your Organisation description"
            required
            v-model="orgDesc"
          /><br />
          <br />
          <label for="pass" class="lbl">Password:</label>
          <input
            type="password"
            name="pass"
            class="card fr"
            placeholder="Set Your Password"
            required
            v-model="Rpass"
          />
          <br />
          <label for="Cpass" class="lbl">Confirm Password:</label>
          <input
            type="password"
            name="cpass"
            class="card fr"
            placeholder="Confirm Your Password"
            required
            v-model="Cpass"
          />
          <br />
          <button class="btn col2 bor" v-on:click="doRegister()">
            SIGN-UP!</button
          >{{ passMsg }}
        </div>

        <label for="quesregister" class="lab fl">Already registered?</label
        ><br />
        <button class="btn col2 bor" v-on:click="setRegister()">Log In!</button>
      </div>
    </div>
  </div>
  <div v-else>
    <ModelRecommender />
  </div>
</template>

<script>
import { host } from "@/server.js";
import { mapGetters } from "vuex";
import ModelRecommender from "@/components/ModelBuilder/ModelRecommender/ModelRecommender.vue";

export default {
  name: "login",
  components: {
    ModelRecommender
  },

  data() {
    return {
      register: false,
      username: "",
      pass: "",
      isSaving: false,
      msg: "",
      //user: []
      name: "",
      orgName: "",
      email: "",
      contact: 0,
      orgDesc: "",
      Rpass: "",
      Cpass: "",
      passMsg: ""
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: "loggedInToggle",
      userDetail: "loggedInDetails"
    })
  },
  methods: {
    doLogin: async function() {
      this.isSaving = true;

      if (
        this.username == "" ||
        this.username == null ||
        this.pass == "" ||
        this.pass == null
      ) {
        return;
      }

      const res = await fetch(
        `${host}/api/login/${this.username}/${this.pass}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.username,
            pass: this.pass
          })
        }
      );
      ///////////////////
      const userDetails = await res.json();
      this.$store.commit("loggedInToggle", userDetails);
      ///////////////////////
      //const users = await res.json();
      //this.user = users;
      this.username = "";
      this.pass = "";
      this.isSaving = false;
      this.msg = "Login attempted!";
      setTimeout(() => {
        this.msg = "";
      }, 2000);
    },
    setRegister: function() {
      this.register = !this.register;
    },
    doRegister: async function() {
      this.isSaving = true;
      if (this.Rpass != this.Cpass) {
        this.passMsg = "Passwords do not match";
      } else {
        console.log(this.name);

        await fetch(`${host}/api/register/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: this.name,
            orgName: this.orgName,
            email: this.email,
            contact: this.contact,
            orgDesc: this.orgDesc,
            Rpass: this.Rpass
          })
        });
        this.name = "";
        this.description = "";
        this.isSaving = false;
        this.msg = "Registered successfully";
        setTimeout(() => {
          this.msg = "";
        }, 2000);
      }
    }
  }
};
</script>

<style scoped>
.btn {
  background-color: #252b59; /* mera blue #252b59 */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  min-width: 15%;
}
.card {
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  user-select: none;
  width: 60%;
}

.invisible-card {
  padding: 10px;
  border: 1px solid white;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  user-select: none;
  width: 90%;
}

.lbl {
  padding: 10px;
  margin-top: 20px;
  user-select: none;
}
.formhead {
  background-color: #252b59; /* mera blue #252b59 */
  color: white;
  text-align: center;
  text-decoration: none;
  border: 5px solid black;
}

.form-control,
.input-group .form-control {
  background-color: #f5f5f5;
  border-color: #e7e6e6;
  border-radius: 3px;
  box-shadow: none;
  color: black;
  font-family: "museoslab-300", sans-serif;
  height: 40px;
  margin-bottom: 20px;
}

.napa-form-login-register .input-group .icon {
  color: #9d9d9d;
  font-size: 17px;
  position: absolute;
  right: 7px;
  text-align: center;
  top: 7px;
}
</style>
