<template>
  <v-container fill-height fluid>

        <v-row justify="center" align="center" class="mt-10">
          <v-col cols="12" xl="4" sm="8" md="6">
            <v-row justify="center" align="center">
              <h1> Profile : </h1>
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
            <v-card class="pa-6">
              <h2> Time : </h2>
              <v-sparkline
                v-if="dataT!=null"
                height="200"
                :gradient="gradientT"
                :radius="10"
                :value="dataT"
                :smooth="10"
                :padding="0"
                :line-width="1"
                auto-draw
                :fill="true"
              ></v-sparkline>
              <v-card v-else class="pa-6" height="300">
                <v-container fill-height fluid>
                  <v-row fill-height justify="center" align="center" height="200">
                    <h2> No Data</h2>
                  </v-row>
                </v-container>
              </v-card>
            </v-card>
          </v-col>
          <v-col cols="12" xl="4" sm="8" md="6">
            <v-card class="pa-6">
              <h2> Score : </h2>
              <v-sparkline
                v-if="dataS!=null"
                height="200"
                :gradient="gradientS"
                :value="dataS"
                :smooth="10"
                :padding="0"
                :radius="10"
                :line-width="1"
                auto-draw
                :fill="true"
              ></v-sparkline>
              <v-card v-else class="pa-6" height="300">
                <v-container fill-height fluid>
                  <v-row fill-height justify="center" align="center" height="200">
                    <h2> No Data</h2>
                  </v-row>
                </v-container>
              </v-card>

            </v-card>
          </v-col>
        </v-row>
<!--
        <v-row justify="center" align="center">
          <v-col cols="12" xl="2" sm="6" md="4">
              <v-select
                color="accent"
                class="mt-5"
                :items="listSongs"
                v-model="selectedSong"
                solo
              ></v-select>
          </v-col>
        </v-row>

        <v-row justify="center" align="center">
          <v-col cols="12" xl="4" sm="8" md="6">
            <v-card class="pa-6">
              <h2> Time Specific Song : </h2>
              <v-sparkline
                v-if="dataSS!=null"
                :radius="10"
                height="200"
                :value="dataSS"
                :smooth="10"
                :padding="0"
                :line-width="1"
                :gradient="gradientT"
                auto-draw
                :fill="true"
              ></v-sparkline>
            </v-card>
          </v-col>
        </v-row>
    -->
  </v-container>
</template>

<script>
import {auth, db} from "../plugins/firebase";
import listBlindtest from "../blindtest/listBlindtest.json";

export default {

  data: () => ({
    dataAll : null,
    personnalData : null,
    array : ["All", "20", "10"],
    loaded :false,
    numberPlayed : ["All", "20", "10"],
    selectN: "All",
    selectionPlaylist : "onepiece",
    listPlaylist : ["onepiece"],
    dataT : [1,4,5,6,7,8,9,15,19,50],
    dataS : [1,4,5,6,7,8,9,15,19,50],
    dataSS : [1,4,5,6,7,8,9,15,19,50],
    listSongs : [],
    selectedSong : null,
    gradientT: ['red', 'yellow', 'green'],
    gradientS: ['green', 'yellow', 'red'],
  }),

  methods:{
    changePlaylist(){
      let playlist = listBlindtest.list.filter((p) => p.name === this.selectionPlaylist);
      if(playlist.length === undefined || playlist.length === 0) return;
      let playlistS = JSON.parse(JSON.stringify(playlist[0]));
      this.listSongs = playlistS.songs.map(e => e.name);
      this.selectedSong = this.listSongs[0];
      this.changeType();
    },
    loadDB(data){
      if(data === null) {
        this.dataT = null;
        this.dataS = null;
        return;
      }
      this.dataT = Object.values(data).map(e => e.time);
      this.dataS = Object.values(data).map(e => e.score);
    },
    changeType(){
      db.ref('/onepiece/'+this.selectN+'/'+auth.currentUser.uid+"/").once('value').then((snapshot) => {
        this.loadDB(JSON.parse(JSON.stringify(snapshot.val())));
      });
    }
  },

  mounted() {
    if(!auth.currentUser) this.$router.push("/");
    this.changePlaylist();
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
