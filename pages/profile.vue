<template>
  <v-row>
    <v-col class="text-center">
      <h1> Profile : </h1>
      <v-sparkline
        v-if="personnalData !== null && personnalData['All'] !== undefined"
        :value="personnalData['All'].times"
        :smooth="10"
        :padding="0"
        :line-width="1"
        auto-draw
      ></v-sparkline>
    </v-col>
  </v-row>
</template>

<script>
import {auth, db} from "../plugins/firebase";

export default {

  data: () => ({
    dataAll : null,
    personnalData : null,
    array : ["All", "20", "10"],
    loaded :false,
  }),

  methods:{
    makePersonnalData(a){
      let ref = this;
        if(ref.dataAll[a] === undefined || ref.dataAll[a] === null || ref.dataAll[a][auth.currentUser.uid] === undefined || ref.dataAll[a][auth.currentUser.uid] === null ) this.personnalData[a] = null;
        else {
          this.personnalData[a] = {};
          this.personnalData[a].times = Object.values(ref.dataAll[a][auth.currentUser.uid]).map(e => e.time);
          console.log(this.personnalData[a].times);
          /*let read = null;
          for(var rec in ref.dataAll[a][auth.currentUser.uid]){
            console.log(rec);
          }
          if(read === null) this.personnalData[a] = null;*/
        }
    }
  },

  mounted() {
    if(!auth.currentUser) this.$router.push("/");
    this.dataAll = {};
    this.loaded = false;
    this.personnalData = {};
    let ref = this;
    this.array.forEach((a) => {
      db.ref('/onepiece/'+a+'/').once('value').then((snapshot) => {
        ref.dataAll[a] = JSON.parse(JSON.stringify(snapshot.val()));
        this.makePersonnalData(a);
      });
    });
  },

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

.titleOP{
  font-family: Open Sans;
  font-size: 4rem;
  text-shadow: 5px 5px #8d8d8d;
}
</style>
