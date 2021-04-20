import listBlindtest from "@/blindtest/listBlindtest.json";
const selectedPlaylist = 0;

export const mix_selectionPlaylistPage = {

  data: () => ({
    numberPlayed: [],
    selectN: "",
    selectionPlaylist : "",
    listPlaylist : [],
  }),

  methods:{
    postMounted(){
      console.log("mix post mounted page");
    },
  },

  mounted() {
    this.listPlaylist = JSON.parse(JSON.stringify(listBlindtest));
    this.selectionPlaylist = this.listPlaylist.list[selectedPlaylist].name;
    this.numberPlayed = this.listPlaylist.list[selectedPlaylist].listTypes;
    this.selectN = this.numberPlayed[selectedPlaylist];
    this.postMounted();
  },

}
