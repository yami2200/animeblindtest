<template>
  <v-card class="pa-3">
    <v-row justify="center" align="center">
      <v-text-field ref="textField" v-model="text" @keydown="keypress" class="ml-5 mt-5" outlined autocomplete="off"> </v-text-field>
      <v-btn class="ml-5 mr-5" @click="send"> Send </v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "inputText",

  data: () => ({
    text : "",
    autocomplete : new Date().getTime().toString()
  }),

  methods:{
    send(){
      this.$emit("commit", this.text)
    },
    keypress(e){
      if(e.key === "Enter") this.send();
    },
    dynamicID(){
      return new Date().getTime().toString()+"aze";
    }
  },

  mounted () {
    this.$refs["textField"].focus();
  },

}
</script>

<style scoped>

</style>
