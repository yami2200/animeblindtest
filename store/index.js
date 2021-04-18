export const state = () => ({
  playlist : null,
})

export const mutations = {
  setPlaylist(state, playlist) {
    state.playlist = playlist
  },
}

export const getters = {
  getCurrentPlaylist(state) {
    return state.playlist
  }
}
