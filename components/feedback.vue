<template>
  <v-card class="pa-2" @keydown="test">
    <v-img ref="card" :src="img"></v-img>
      <v-row class="mt-2" justify="center" align="center" v-if="correct">
        <v-icon color="success" medium>mdi-check-bold</v-icon>
        <h1 class="ml-3 mt-3" style="color: #49a329"> Correct !</h1>
      </v-row>
      <v-row class="mt-2"  justify="center" align="center" v-else="correct">
        <v-icon color="error" x-large>mdi-alert-circle</v-icon>
        <h1 class="ml-3 mt-3" style="color: #ff4452"> Incorrect !</h1>
    </v-row>
    <v-row v-if="!correct" justify="center" align="center">
      <h1> Answer : {{ answer }}</h1>
    </v-row>
    <v-row justify="center" align="center">
      <v-btn
        ref="nextBtn"
        class="mt-2 mb-2"
        color="primary"
        @click="click"
      >
        Next
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "feedback",

  props:["correct", "img", "answer"],

  methods:{
    next(){
      this.$emit("next");
    },
    click(e){
      if(e.clientX === 0 && e.clientY === 0) return;
      this.next();
    },
    test(e){
      if(e.key === "Enter") this.next();
    },
  },

  mounted () {
    this.$refs["nextBtn"].$el.focus();
  },

}
</script>

<style scoped>

</style>
