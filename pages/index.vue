<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" xl="4" sm="8" md="6">
        <div class="text-center">
          <v-card class="pa-2">
            <v-img src="onepiecelogo.jpg"></v-img>
            <v-row class="mt-2">
              <v-spacer></v-spacer>
              <v-btn
                class="mt-2 mb-2"
                color="primary"
                fab
                x-large
                @click="play"
              >
                <v-icon>mdi-play</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-select
                style="width: 60px"
                color="accent"
                class="mt-5 ml-10"
                :items="numberPlayed"
                v-model="selectN"
                solo
              ></v-select>
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {auth, db} from "../plugins/firebase";
import listBlindtest from "../blindtest/listBlindtest.json";
import {melangePlaylist} from "@/plugins/lib";

export default {

  props:["bus"],

  data: () => ({
    numberPlayed: ["All", "20", "10"],
    selectN: "All",
    selectionPlaylist : "onepiece",
    listPlaylist : JSON.parse(JSON.stringify(listBlindtest)),
  }),

  methods:{
    play(){
      let playlist = this.listPlaylist.list.filter((p) => p.name === this.selectionPlaylist);
      if(playlist.length === undefined || playlist.length === 0) return;
      let playlistS = JSON.parse(JSON.stringify(playlist[0]));
      playlistS.songs = melangePlaylist(playlistS);
      this.$store.commit("setPlaylist", playlistS);
      this.$store.commit("setGame", JSON.parse(JSON.stringify({name : this.selectionPlaylist, number : this.selectN})));
      this.$router.push("/blindtest");
    },
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
