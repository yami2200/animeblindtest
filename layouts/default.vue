<template>
  <v-app>


    <v-app-bar dense absolute>
      <v-btn icon @click="clickPlay">
        <v-icon>mdi-play</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="clickAccount">
        <v-icon>mdi-account</v-icon>
      </v-btn>

    </v-app-bar>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Sign in :</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  @change="wrongLogin = false"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  @change="wrongLogin = false"
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
          <p v-if="wrongLogin" style="color: #ff4452"> Wrong email or password !</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="success"
            text
            @click="login"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-main>
      <v-container fill-height fluid>
        <nuxt :bus="bus" />
      </v-container>
    </v-main>
    <v-footer
      :absolute="true"
      app
      class="text-center"
    >
      <v-spacer>
        <span>Yami - &copy; {{ new Date().getFullYear() }}</span>
      </v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from "vue";
import {auth} from "../plugins/firebase";

export default {
  data () {
    return {
      dialog:false,
      wrongLogin : false,
      email: "",
      password: "",
      bus: new Vue(),
    }
  },

  mounted() {
    this.bus.$on("loginRequest", () => {
      this.dialog = true;
    })
  },

  methods:{
    clickAccount(){
      if(auth.currentUser){
        this.$router.push("/profile");
      } else {
        this.dialog = true;
      }
    },
    clickPlay(){
      this.$router.push("/");
    },
    login(){
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.dialog = false;
        })
        .catch((error) => {
          this.wrongLogin = true;
          console.log(error);
        });
    },
  }
}
</script>

<style scoped>
.v-application {
  background-color: #eeeeee;
}
</style>
