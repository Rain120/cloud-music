import { playMode } from 'common/js/config'

const state = {
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  playMode: playMode.loop,
  currentPlayIndex: -1
}

export default state
