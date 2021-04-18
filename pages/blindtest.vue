<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <div v-if="beforeStarting"><v-btn color="success" @click="ready"> Ready !</v-btn></div>
      <div v-else>
        <textf v-if="guess" @commit="commit"></textf>
        <fd @next="next" v-else :correct="correct" :img="playlist.songs[currentIndex].img" :answer="playlist.songs[currentIndex].name"></fd>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import inputText from "../components/inputText";
import feedback from "../components/feedback";

export default {
  name: "blindtest.vue",

  components:{
    "textf" : inputText,
    "fd" : feedback,
  },

  methods:{
    ready(){
      this.beforeStarting = false;
    },
    commit(text){
      this.correct = false;
      for(var i = 0; i<this.playlist.songs[this.currentIndex].guesswords.length; i++){
        if(text === this.playlist.songs[this.currentIndex].guesswords[i]){
          this.correct = true;
          i = this.playlist.songs[this.currentIndex].guesswords.length;
        }
      }
      this.guess = false;
      if(this.correct){
        console.log("Correct");
      } else {
        console.log("Incorrect");
      }
    },
    next(){

    },
  },

  data: () => ({
    beforeStarting: true,
    guess: true,
    correct : false,
    currentIndex: 0,
    currentTime: 0,
    details: [],
    playlist: null,
  }),

  mounted() {
    let playlist = this.$store.getters['getCurrentPlaylist'];
    if(this.$store.getters['getCurrentPlaylist'] === null) this.$router.push("/");
    else this.playlist = playlist;
  }
}
</script>

<style scoped>

</style>
