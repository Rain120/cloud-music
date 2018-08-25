import { playMode } from 'common/js/config'

const state = {
  currentRefreshTime: 0,
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  playMode: playMode.loop,
  currentIndex: -1
}

export default state
