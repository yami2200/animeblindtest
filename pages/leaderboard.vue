<template>
  <v-container fluid>
    <v-row justify="center" align="center" class="mt-10">
      <v-col cols="12" xl="4" sm="8" md="6">
        <v-row justify="center" align="center">
          <h1> Leaderboard : </h1>
        </v-row>

        <v-row justify="center" align="center">
          <v-select
            @change="changePlaylist"
            color="accent"
            class="mt-5"
            :items="listPlaylist"
            v-model="selectionPlaylist"
            solo
          ></v-select>
          <v-select
            @change="changeType"
            color="accent"
            class="mt-5 ml-10"
            :items="numberPlayed"
            v-model="selectN"
            solo
          ></v-select>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" xl="4" sm="8" md="6">
        <v-list v-if="data!=null">
          <v-list-item
            v-for="(person,index) in data"
            :key="index"
          >
          {{ index + 1}} - {{ person.name }} : {{ person.score }} points
          </v-list-item>
        </v-list>
        <empty-data v-else></empty-data>
      </v-col>
    </v-row>


  </v-container>
</template>

<script>
import {db} from "@/plugins/firebase";
import emptyData from "@/components/emptyData";
import {mix_selectionPlaylistPage} from "@/mixins/mix_selectionPlaylistPage";

export default {
  name: "leaderboard",

  components: {
    "emptyData" : emptyData,
  },

  mixins: [mix_selectionPlaylistPage],

  data : () => ({
    data: null,
    users: null
  }),

  methods:{
    changePlaylist(){
      this.changeType();
    },
    loadDB(data){
      if(data === null) {
        this.data = null;
        return;
      }
      this.data = [];
      Object.keys(this.users).forEach((u) => {
        let all_records = data[u];
        let object = {};
        object.name = this.users[u];
        if(all_records !== undefined){
          object.score = this.maximumScore(Object.values(all_records).map(e => e.score));
        } else {
          object.score = 0;
        }
        this.data.push(object);
      });
      this.data.sort(function (a,b) {
        return b.score - a.score;
      });
      console.log(this.data);
    },
    maximumScore(array){
      var max = 0;
      array.forEach((n) => {
        if(n>max) max = n;
      });
      return max;
    },
    loadUsers(users){
      if(users == null) this.$router.push('/');
      this.users = users;
      db.ref('/'+this.selectionPlaylist+'/'+this.selectN).once('value').then((snapshot) => {
        this.loadDB(JSON.parse(JSON.stringify(snapshot.val())));
      });
    },
    changeType(users){
      db.ref('/users/').once('value').then((snapshot) => {
        this.loadUsers(JSON.parse(JSON.stringify(snapshot.val())));
      });
    },
    postMounted(){
      this.changeType();
      this.listPlaylist = this.listPlaylist.list.map(e => e.name);
    }
  },

}
</script>

<style scoped>

</style>
