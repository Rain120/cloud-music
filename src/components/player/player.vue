<template>
  <div class="player" v-show="playList.length > 0">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.picUrl">
      </div>
      <back-header :singer="currentSong.singer" :songName="currentSong.name" :player="player" @back="back"></back-header>
      <div class="normal-top">
        <div class="triger" :class="{'triger-paused': !playing}">
          <img src="./triger.png">
        </div>
         <div class="cd-wrapper" ref="cdWrapper">
            <div class="cd" :class="cdRotate">
              <img class="image" :src="currentSong.picUrl">
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
          <span class="time time-start">{{formatTime(currentTime)}}</span>
          <div class="progress-bar-wrapper">
            <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
          </div>
          <span class="time time-end">{{formatTime(currentSong.dt / 1000)}}</span>
        </div>
        <div class="handoff">
          <div class="handoff-icon" @click="changeMode"><i class="mode icon iconfont" :class="iconPlayMode"></i></div>
          <div class="handoff-icon" @click="prevSong" :class="disableBtn"><i class="prev icon iconfont music-prev"></i></div>
          <div class="handoff-icon" @click="togglePlaying" :class="disableBtn"><i class="run icon iconfont music-play" :class="playIcon"></i></div>
          <div class="handoff-icon" @click="nextSong" :class="disableBtn"><i class="next icon iconfont music-next"></i></div>
          <div class="handoff-icon"><i class="list icon iconfont music-more-music"></i></div>
        </div>
      </div>
    </div>
    <div class="mini-player" @click="open" v-show="!fullScreen">
      <div class="icon">
        <img :class="cdRotate" width="40" height="40" :src="currentSong.picUrl">
      </div>
      <div class="text">
        <h2 class="name">{{currentSong.name}}</h2>
        <p class="desc">{{currentSong.singer}}</p>
      </div>
      <div class="control" @click.stop="togglePlaying">
        <progress-circle :radius="radius"  :percent="percent">
          <i :class="miniIcon" class="common icon iconfont music-play"></i>
        </progress-circle>
      </div>
      <div class="control">
        <i class="icon iconfont music-more-music"></i>
      </div>
    </div>
    <audio
      ref="audio"
      :src="currentSong.playUrl"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"></audio>
  </div>
</template>

<script>
import BackHeader from 'base/back-header/back-header'
import ProgressBar from 'base/progress-bar/progress-bar'
import ProgressCircle from 'base/progress-circle/progress-circle'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      player: true,
      songReady: false,
      currentTime: 0,
      radius: 36
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return
      }
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing (newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? this.$nextTick(() => audio.play()) : this.$nextTick(() => audio.pause())
      })
    }
  },
  computed: {
    cdRotate () {
      return this.playing ? 'play' : 'play pause'
    },
    playIcon () {
      return this.playing ? 'music-pause' : 'music-play'
    },
    iconPlayMode () {
      return this.playMode === playMode.loop ? 'music-loop' : this.playMode === playMode.shuffle ? 'music-Shuffle' : 'music-single'
    },
    miniIcon () {
      return this.playing ? 'icon-pause-mini music-pause' : 'icon-play-mini music-play'
    },
    percent () {
      return this.currentTime / (this.currentSong.dt / 1000)
    },
    ...mapGetters([
      'fullScreen',
      'playList',
      'playMode',
      'playing',
      'currentSong',
      'currentIndex',
      'sequenceList'
    ])
  },
  methods: {
    formatTime (time) {
      time = time | 0
      const minutes = this._pad(time / 60 | 0)
      const seconds = this._pad(time % 60)
      return `${minutes}:${seconds}`
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    onProgressBarChange (percent) {
      this.$refs.audio.currentTime = this.currentSong.dt / 1000 * percent
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    prevSong () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playList.length - 1
      }
      this.setCurrentIndex(index)

      if (!this.playing) {
        this.togglePlaying()
      }

      this.songReady = false
    },
    nextSong () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playList.length) {
        index = 0
      }
      this.setCurrentIndex(index)

      if (!this.playing) {
        this.togglePlaying()
      }

      this.songReady = false
    },
    loop () {
      this.$refs.audio.currentTime = 0
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    end () {
      if (this.playMode === playMode.single) {
        this.loop()
      } else {
        this.nextSong()
      }
    },
    ready () {
      this.songReady = true
    },
    error () {
      this.songReady = true
    },
    disableBtn () {
      return this.songReady ? '' : 'disable'
    },
    changeMode () {
      const mode = (this.playMode + 1) % 3
      console.log(mode)
      this.setPlayMode(mode)
      let list = null
      if (mode === this.playMode) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    resetCurrentIndex (list, song) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
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
    _pad (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlaylist: 'SET_PLAYLIST'
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
      .background
        position absolute
        left 0
        top 0
        width 100%
        height 100%
        z-index -1
        opacity 0.6
        filter blur(40px)
      .normal-top
        display inline-block
        vertical-align top
        position relative
        margin-top 4.5rem
        width 100%
        height 0
        padding-top 70%
        .triger
          position absolute
          height 4.20rem
          top -5rem
          margin-left -.6rem
          left 50%
          z-index 10
          img
            height 210%
        .cd-wrapper
          position absolute
          left 15%
          top 0
          width 70%
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
          width 70%
          margin 0 auto
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
      width 100%
      height 60px
      background rgba(230, 229, 229, 0.8)
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
      .text
        display flex
        flex-direction column
        justify-content center
        flex 1
        line-height 20px
        overflow hidden
        .name
          margin-bottom 2px
          no-wrap()
          font-size 16px
          color #222
        .desc
          no-wrap()
          font-size 14px
          color #222
      .control
        flex 0 0 30px
        width 30px
        padding 0 10px
        .music-play
          font-size 33px
        .common
          font-size 31px
          position absolute
          left -1.09rem
          top 0.2rem
        .music-more-music
          font-size 33px
          position relative
          right 1.5rem
  @keyframes rotate
    0%
      transform rotate(0)
    100%
      transform rotate(360deg)
  .triger
    transition all .8s
    transform-origin .48rem .476rem
  .triger-paused
    transform rotate(-28deg)
</style>
