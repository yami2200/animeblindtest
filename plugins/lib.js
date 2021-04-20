function melangePlaylist(playlist){
  let songs = JSON.parse(JSON.stringify(playlist.songs));
  for(var i = songs.length-1; i>=0; i--){
    const j = Math.trunc(Math.random() * i);
    let c = songs[i];
    songs[i] = songs[j];
    songs[j] = c;
  }
  return songs;
}

export {melangePlaylist}
