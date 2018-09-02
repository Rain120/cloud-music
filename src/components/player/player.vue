<template>
  <div class="player" v-show="playList.length > 0">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.picUrl">
        </div>
        <back-header
        :singer="currentSong.singer"
        :songName="currentSong.name"
        :player="player"
        @back="back"></back-header>
        <div class="normal-top" ref="topCdWrapper" @click="showLyric">
          <div class="top-wrapper">
            <div class="triger" :class="{'triger-paused': !playing}">
              <img src="./triger.png">
            </div>
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdRotate">
                <img class="image" :src="currentSong.picUrl">
              </div>
            </div>
            <div class="operators">
              <div class="op-icon"><i class="icon iconfont music-favorite"></i></div>
              <div class="op-icon"><i class="icon iconfont music-download"></i></div>
              <div class="op-icon"><i class="icon iconfont music-message"></i></div>
              <div class="op-icon"><i class="icon iconfont music-more"></i></div>
            </div>
          </div>
        </div>
        <scroll
          class="normal-lyric"
          ref="scroll"
          :data="currentLyric && currentLyric.lines">
          <div class="lyric-wrapper" @click="showLyric">
            <div v-if="currentLyric">
              <p
                class="text"
                :class="{'current': currentLineNum === index}"
                ref="lyricLine"
                v-for="(line, index) in currentLyric.lines"
                :key="index"
                >{{line.txt}}</p>
            </div>
          </div>
        </scroll>
        <div class="normal-bottom">
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
    </transition>
    <transition name="mini">
      <div
        class="mini-player"
        v-show="!fullScreen"
        ref="miniplayer"
        @click="open"
        @touchstart.prevent="middleTouchStart"
        @touchmove.prevent="middleTouchMove"
        @touchend="middleTouchEnd">
        <div class="icon">
          <img :class="cdRotate" width="40" height="40" :src="currentSong.picUrl">
        </div>
        <div class="text">
          <h2 class="name">{{currentSong.name}}</h2>
          <p class="desc" v-if="!this.playing">{{currentSong.singer}}</p>
          <div class="playing-lyric-wrapper" v-else>
            <div class="playing-lyric" ref="miniLyric">{{playingLiric}}</div>
          </div>
        </div>
        <div class="control" @click.stop="togglePlaying">
          <progress-circle :radius="radius" :percent="percent">
            <i :class="miniIcon" class="common icon iconfont music-play"></i>
          </progress-circle>
        </div>
        <div class="control">
          <i class="icon iconfont music-more-music"></i>
        </div>
      </div>
    </transition>
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
import Scroll from 'base/scroll/scroll'
import BackHeader from 'base/back-header/back-header'
import ProgressBar from 'base/progress-bar/progress-bar'
import ProgressCircle from 'base/progress-circle/progress-circle'
import { playMode, CODE_OK } from 'common/js/config'
import { shuffle } from 'common/js/util'
import { mapGetters, mapMutations } from 'vuex'
import animations from 'create-keyframe-animation'
import * as apiData from 'api/data'
import Lyric from 'common/js/lyric'

export default {
  data () {
    return {
      player: true,
      songReady: false,
      currentTime: 0,
      currentLyric: null,
      currentLineNum: 0,
      radius: 36,
      currentShow: 'cd',
      playingLiric: '',
      delayTime: 0
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLineNum = 0
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$refs.audio.play()
        this.getSongLyric()
      }, 1000)
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
    disableBtn () {
      return this.songReady ? '' : 'disable'
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
  created () {
    this.touch = {}
  },
  methods: {
    getSongLyric () {
      let id = this.currentSong.id
      apiData.getLyric(id).then(res => {
        if (res.status === CODE_OK) {
          this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric)
          if (this.playing) {
            this.currentLyric.play()
          }
        }
      }).catch(() => {
        this.currentLyric = '暂无歌词'
        this.playingLiric = '暂无歌词'
        this.currentLineNum = 0
      })
    },
    currentLyricLine (index) {
      return this.currentLyric.lines[index]
    },
    handleLyric ({lineNum, txt}) {
      this.currentLineNum = lineNum
      if (this.currentLineNum < this.currentLyric.lines.length) {
        if (this.currentLyricLine(this.currentLineNum + 1).time) {
          this.delayTime = (this.currentLyricLine(this.currentLineNum + 1).time - this.currentLyricLine(this.currentLineNum).time) / 1000
        }
      } else {
        this.delayTime = 0
      }
      if (lineNum > 5) {
        let line = this.$refs.lyricLine[lineNum - 5]
        this.$refs.scroll.scrollToElement(line, 1000)
      } else {
        this.$refs.scroll.scrollTo(0, 0, 1000)
      }
      this.playingLiric = txt
    },
    showLyric () {
      if (this.currentShow === 'cd') {
        this.currentShow = 'lyric'
        this.$refs.topCdWrapper.style['opacity'] = 0
        this.$refs.topCdWrapper.style['zIndex'] = -1
        this.$refs.scroll.$el.style['opacity'] = 1
        this.$refs.scroll.$el.style['zIndex'] = 1
        this.$refs.topCdWrapper.style['transition'] = `300ms`
      } else {
        this.currentShow = 'cd'
        this.$refs.scroll.$el.style['opacity'] = 0
        this.$refs.scroll.$el.style['zIndex'] = -1
        this.$refs.scroll.$el.style['transition'] = `300ms`
        this.$refs.topCdWrapper.style['opacity'] = 1
        this.$refs.topCdWrapper.style['zIndex'] = 1
      }
    },
    formatTime (time) {
      time = time | 0
      const minutes = (time / 60 | 0).toString().padStart(2, '0')
      const seconds = (time % 60).toString().padStart(2, '0')
      return `${minutes}:${seconds}`
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    onProgressBarChange (percent) {
      let currentTime = this.currentSong.dt / 1000 * percent
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) {
        this.togglePlaying()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    },
    prevSong () {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.getSongLyric()
        this.setCurrentIndex(index)

        if (!this.playing) {
          this.togglePlaying()
        }
      }
      this.songReady = false
    },
    nextSong () {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        this.getSongLyric()
        this.setCurrentIndex(index)

        if (!this.playing) {
          this.togglePlaying()
        }
      }

      this.songReady = false
    },
    loop () {
      this.$refs.audio.currentTime = 0
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    ready () {
      this.songReady = true
    },
    error () {
      this.songReady = true
    },
    changeMode () {
      const mode = (this.playMode + 1) % 3
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
    togglePlaying () {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing)

      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    back () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    end () {
      if (this.playMode === playMode.single) {
        this.loop()
      } else {
        this.nextSong()
      }
    },
    middleTouchStart (e) {
      this.touch.initiated = true
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    middleTouchMove (e) {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      let deltaX = touch.pageX - this.touch.startX
      let deltaY = touch.pageY - this.touch.startX
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      this.touch.percent = deltaX / window.innerWidth
    },
    middleTouchEnd () {
      if (this.touch.percent > 0.5) {
        this.prevSong()
      } else if (this.touch.percent < -0.5) {
        this.nextSong()
      }
    },
    enter (el, done) {
      const {x, y, scale} = this._getPosAndScale()
      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0, 0, 0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(1)`
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter () {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave (el, done) {
      this.$refs.cdWrapper.style.transition = 'all 0.4s'
      const {x, y, scale} = this._getPosAndScale()
      this.$refs.cdWrapper.style['transform'] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave () {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style['transform'] = ''
    },
    _getPosAndScale () {
      const targetWidth = 40
      const paddingLeft = 40
      const paddingBottom = 20
      const paddingTop = 4.5 * 16
      const width = window.innerWidth * 0.7
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {
        x,
        y,
        scale
      }
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
    Scroll,
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
      z-index 150
      background #fff
      &.normal-enter-active, &.normal-leave-active
        transition all 0.4s
        .top, .bottom
          transition all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity 0
        .top
          transform translate3d(0, -100px, 0)
        .bottom
          transform translate3d(0, 100px, 0)
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
        height 75%
        .top-wrapper
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
          .operators
            width 70%
            margin 20% auto
            display flex
            text-align center
            .op-icon
              flex 1
              i
                font-size 2rem
      .normal-lyric
        position absolute
        top 3.5rem
        width 100%
        height 72%
        overflow hidden
        z-index -1
        opacity 0
        .lyric-wrapper
          width 80%
          margin 0 auto
          overflow hidden
          text-align center
          .text
            line-height 32px
            color #149d52
            font-size 1rem
            &.current
              color #f00
      .normal-bottom
        position absolute
        bottom 2.5rem
        width 100%
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
      width 100%
      height 60px
      position fixed
      left 0
      bottom 0
      z-index 180
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
          // no-wrap()
          white-space nowrap
          font-size 16px
          color #222
          // animation miniPlayerLyric 10s linear infinite
        .desc
          no-wrap()
          font-size 14px
          color #222
        .playing-lyric-wrapper
            .playing-lyric
              width 100%
              height 20px
              line-height 20px
              font-size 14px
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
  @keyframes miniPlayerLyric
    0%
      transform translate(0%)
    100%
      transform translate(-100%)
  .triger
    transition all .8s
    transform-origin .48rem .476rem
  .triger-paused
    transform rotate(-28deg)
</style>
