<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" xl="4" sm="8" md="6">
        <div class="text-center">
          <v-card class="pa-2" v-if="score !== null">
            <h1 class="mt-3"> Score : {{ score.score }} points</h1>
            <h1> Time : {{ score.time }} s</h1>
            <v-row justify="center" align="center" class="mt-4 mb-4">
              <v-btn class="mr-6" color="secondary" @click="returnHome"> Return </v-btn>
              <v-btn color="primary" @click="retry"> Retry ! </v-btn>
            </v-row>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {auth, db} from "../plugins/firebase";

export default {
  name: "resultpage",

  data: () => ({
    score : null,
  }),

  methods:{
    returnHome(){
      this.$router.push("/");
    },
    retry(){
      this.$router.push("/blindtest");
    },
  },

  mounted() {
    let score = this.$store.getters['getScore'];
    if(score === null) this.$router.push("/");
    else{
      this.score = score;
      this.$store.commit("setScore", null);
      if(auth.currentUser){
        db.ref(score.game.name +"/"+ score.game.number +"/" + auth.currentUser.uid+"/").push({
          records: score.details,
          score: score.score,
          time: score.time
        },(error) => {
          if (error) {
            console.log(error);
          }
        });
      }
    }
  },
}
</script>

<style scoped>

</style>
