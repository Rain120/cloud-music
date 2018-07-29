import * as types from './mutation-types'

const mutations = {
  [types.SET_PLAYING_STATE] (state, payload) {
    state.playing = payload
  },
  [types.SET_FULL_SCREEN] (state, payload) {
    state.fullScreen = payload
  },
  [types.SET_PLAYLIST] (state, payload) {
    state.playList = payload
  },
  [types.SET_SEQUENCE_LIST] (state, payload) {
    state.sequenceList = payload
  },
  [types.SET_PLAY_MODE] (state, payload) {
    state.playMode = payload
  },
  [types.SET_CURRENT_PLAY_INDEX] (state, payload) {
    state.currentPlayIndex = payload
  }
}

export default mutations
