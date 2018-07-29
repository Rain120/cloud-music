import { playMode } from 'common/js/config'

const state = {
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  playMode: playMode.loop,
  currentIndex: -1
}

export default state
