<template>
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
          <button class="btn" v-on:click="doLogin()">GO!</button>
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
      <div class="card formhead" id="sign"><h1 align="center">SIGN-UP</h1></div>
      <form method="get">
        <div class="card">
          <!-- <div class="invisible-card"> -->
          <label for="fname" class="lbl">First Name:</label>
          <input
            type="text"
            name="fname"
            class="card fr"
            placeholder="Please Enter Your Fisrt Name"
            required
          /><br />
          <br />
          <!-- </div> -->
          <!-- <div class="invisible-card"> -->
          <label for="lname" class="lbl">Last Name:</label><br />
          <input
            type="text"
            name="lname"
            class="card fr"
            placeholder="Please Enter Your Last Name"
            required
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
          /><br />
          <br />
          <!-- </div> -->
          <label for="phone" class="lbl">Phone number:</label>
          <input
            type="number"
            name="phone"
            class="card fr"
            placeholder="Enter Your Phone Number"
            required
          />
          <br />
          <label for="dusername" class="lbl">Username:</label>
          <input
            type="text"
            name="username"
            class="card fr"
            placeholder="Please Enter Your Desired Username"
            required
          /><br />
          <br />
          <label for="pass" class="lbl">Password:</label>
          <input
            type="password"
            name="pass"
            class="card fr"
            placeholder="Set Your Password"
            required
          />
          <br />
          <label for="Cpass" class="lbl">Confirm Password:</label>
          <input
            type="password"
            name="cpass"
            class="card fr"
            placeholder="Confirm Your Password"
            required
          />
          <br />
          <button class="btn col2 bor" type="submit" value="submit">
            SIGN-UP!
          </button>
        </div>
      </form>
      <label for="quesregister" class="lab fl">Already registered?</label><br />
      <button class="btn col2 bor" v-on:click="setRegister()">Log In!</button>
    </div>
  </div>
</template>

<script>
import { host } from "@/server.js";
export default {
  name: "login",
  data() {
    return {
      register: false,
      username: "",
      pass: "",
      isSaving: false,
      msg: ""
    };
  },
  methods: {
    doLogin: async function() {
      this.isSaving = true;
      await fetch(`${host}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.username,
          pass: this.pass
        })
      });
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
