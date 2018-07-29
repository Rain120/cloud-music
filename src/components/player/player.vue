<template>
  <div class="player" v-show="playList.length > 0">
    <div class="normal-player" v-show="fullScreen">
      <back-header :singer="currentSong.ar[0].name" :songName="currentSong.name" :player="player" @back="back"></back-header>
      <div class="normal-top">
         <div class="cd-wrapper" ref="cdWrapper">
            <div class="cd" :class="cdRotate">
              <img class="image" :src="currentSong.al.picUrl">
            </div>
          </div>
      </div>
      <div class="normal-bottom">
        <div class="operators">
          <div class="op-icon"><i class="icon iconfont music-favorite"></i></div>
          <div class="op-icon"><i class="icon iconfont music-download"></i></div>
          <div class="op-icon"><i class="icon iconfont music-message"></i></div>
          <div class="op-icon"><i class="icon iconfont music-more"></i></div>
        </div>
        <div class="progress-wrapper">
          <span class="time time-start">00:00</span>
          <div class="progress-bar-wrapper">
            <progress-bar></progress-bar>
          </div>
          <span class="time time-end">04:00</span>
        </div>
        <div class="handoff">
          <div class="handoff-icon" @click="changeMode"><i class="mode icon iconfont" :class="iconMode"></i></div>
          <div class="handoff-icon"><i class="prev icon iconfont music-prev"></i></div>
          <div class="handoff-icon"><i @click="togglePlay" class="run icon iconfont music-play" :class="playIcon"></i></div>
          <div class="handoff-icon"><i class="next icon iconfont music-next"></i></div>
          <div class="handoff-icon"><i class="list icon iconfont music-more-music"></i></div>
        </div>
      </div>
    </div>
    <div class="mini-player" @click="open" v-show="!fullScreen"></div>
  </div>
</template>

<script>
import BackHeader from 'base/back-header/back-header'
import ProgressBar from 'base/progress-bar/progress-bar'
import ProgressCircle from 'base/progress-circle/progress-circle'
import { playMode } from 'common/js/config'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      player: true,
      songReady: false
    }
  },
  computed: {
    cdRotate () {
      return this.playing ? 'play' : 'pause'
    },
    playIcon () {
      return this.playing ? 'music-pause' : 'music-play'
    },
    iconMode () {
      return this.playMode === playMode.loop ? 'music-loop' : this.playMode === playMode.shuffle ? 'music-Shuffle' : 'music-single'
    },
    ...mapGetters([
      'fullScreen',
      'playList',
      'playMode',
      'playing',
      'currentSong'
    ])
  },
  methods: {
    changeMode () {
      const mode = (this.playMode + 1) % 3
      this.setPlayMode(mode)
    },
    togglePlay () {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing)
      // if (this.currentLyric) {
      //   this.currentLyric.togglePlay()
      // }
    },
    togglePlaying () {
      this.setPlayingState(!this.playing)
    },
    back () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayingState: 'SET_PLAYING_STATE'
    })
  },
  components: {
    BackHeader,
    ProgressBar,
    ProgressCircle
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position fixed
      left 0
      right 0
      top 0
      bottom 0
      z-index 50
      background #fff
      .normal-top
        display inline-block
        vertical-align top
        position relative
        margin-top 2rem
        width 100%
        height 0
        padding-top 80%
        .cd-wrapper
          position absolute
          left 10%
          top 0
          width 80%
          height 100%
          .cd
            width 100%
            height 100%
            box-sizing border-box
            border 10px solid rgba(0, 0, 0, 0.8)
            border-radius 50%
            &.play
              animation rotate 30s linear infinite
            &.pause
              animation-play-state paused
          .image
            position absolute
            left 0
            top 0
            width 100%
            height 100%
            border-radius 50%
      .normal-bottom
        position absolute
        bottom 30px
        width 100%
        .operators
          display flex
          text-align center
          .op-icon
            flex 1
            i
              font-size 28px
        .progress-wrapper
          display flex
          align-items center
          width 95%
          margin 10px auto
          padding 10px 0
          .time
            font-size 12px
            flex 0 0 30px
            line-height 30px
            width 30px
            &.time-start
              padding-right 4px
              text-align left
            &.time-end
              padding-left 4px
              text-align right
          .progress-bar-wrapper
            flex 1
        .handoff
          display flex
          text-align center
          align-items center
          .handoff-icon
            flex 1
            .mode, .list
              font-size 28px
            .prev, .next
              font-size 38px
            .run
              font-size 50px
    .mini-player
      display flex
      align-items center
      position fixed
      left 0
      bottom 0
      // z-index 180
      width 100%
      height 60px
      background rgba(238, 207, 207, 0.8)
      &.mini-enter-active, &.mini-leave-active
        transition all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity 0
      .icon
        flex 0 0 40px
        width 40px
        padding 0 10px 0 20px
        img
          border-radius 50%
          &.play
            animation rotate 10s linear infinite
          &.pause
            animation-play-state paused
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
