export const state = () => ({
  playlist : null,
  score : null,
  game : null,
})

export const mutations = {
  setPlaylist(state, playlist) {
    state.playlist = playlist
  },
  setScore(state, score) {
    state.score = score
  },
  setGame(state, game) {
    state.game = game
  },
}

export const getters = {
  getCurrentPlaylist(state) {
    return state.playlist
  },
  getScore(state) {
    return state.score
  },
  getGame(state) {
    return state.game
  },
}
