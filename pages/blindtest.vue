<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <div v-if="beforeStarting"><v-btn color="success" @click="ready"> Ready !</v-btn></div>
      <div v-else>
        <div v-if="guess">
          <v-row justify="center" align="center" class="mb-5">
            <h1> {{ getDuration }}</h1>
          </v-row>
          <textf @commit="commit"></textf>
        </div>
        <fd @next="next" v-else :correct="correct" :img="playlist.songs[currentIndex].img" :answer="playlist.songs[currentIndex].name"></fd>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import inputText from "../components/inputText";
import feedback from "../components/feedback";
import {Howl, Howler} from 'howler';

export default {
  name: "blindtest.vue",

  components:{
    "textf" : inputText,
    "fd" : feedback,
  },

  computed:{
    getDuration: function () {
      if(this.sound!=null) return this.durationFormat(20-this.currentTime);
      return '00:00';
    }
  },

  methods:{
    durationFormat(duration) {
      var sec = Math.trunc(duration);
      var mili = Math.trunc((duration - sec*1.0)*100)
      return (sec<10 ? '0'+sec : sec) + ":"+(mili<10 ? '0'+mili : mili);
    },
    ready(){
      this.beforeStarting = false;
      this.currentIndex = 0;
      this.loadCurrent();
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
      this.sound.pause();
      this.sound = null;
      clearInterval(this.updateSeek);
      this.details.push({index : this.playlist.songs[this.currentIndex].index, time : this.currentTime, correct : this.correct})
      this.currentTime = 0.0;
    },
    next(){
      if(this.currentIndex>=this.getNumberMusics()-1){
        this.setScore();
        this.$router.push("/resultpage");
      } else {
        this.currentIndex ++;
        this.loadCurrent();
      }
    },
    loadCurrent(){
      this.guess = true;
      this.sound = new Audio(this.playlist.songs[this.currentIndex].music);
      this.sound.addEventListener('canplaythrough', this.soundLoaded, false);
      //this.sound.load();
    },
    soundLoaded(){
      this.sound.removeEventListener("canplaythrough", this.soundLoaded, false);
      this.sound.play();
      this.currentTime = 0.0;
      this.updateSeek = setInterval(() => {
        this.currentTime += 0.1;
        if(this.currentTime >= 20){
          this.commit("Error Time #484248")
        }
      }, 100)
    },
    setScore(){
      let score = 0;
      let timemax = 0.0;
      this.details.forEach((d) => {
        if(d.correct) score += 1000;
        timemax += d.time;
      });
      score += 1000 * (((this.getNumberMusics() * 20) - timemax)/(this.getNumberMusics() * 20));
      score = Math.trunc(score);
      timemax = Math.trunc(timemax) + (Math.trunc(timemax * 100) - (Math.trunc(timemax) * 100)) / 100.0;
      this.$store.commit("setScore", JSON.parse(JSON.stringify({game : this.game, details: this.details, score : score, time : timemax})));
    },
    getNumberMusics(){
      if(this.game.number === "All") return this.playlist.songs.length;
      return parseInt(this.game.number);
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
    sound: null,
    volume: 0.5,
    updateSeek: null,
    game: null
  }),

  mounted() {
    let playlist = this.$store.getters['getCurrentPlaylist'];
    let game = this.$store.getters['getGame'];
    if(this.$store.getters['getCurrentPlaylist'] === null || game === null) this.$router.push("/");
    else{
      this.playlist = playlist;
      this.game = game;
    }
  },

  destroyed() {
    if(this.sound !== null){
      this.sound.pause();
      this.sound = null;
      clearInterval(this.updateSeek);
    }
  },
}
</script>

<style scoped>

</style>
