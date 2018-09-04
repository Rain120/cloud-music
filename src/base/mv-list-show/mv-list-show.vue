<template>
  <div class="mv-list-show">
    <scroll class="mv-list-wrapper" ref="scroll" :data="mvList">
    <!-- @touchstart.prevent="ontouchStart($event)" @touchmove.prevent="ontouchMove($event)" @touchend="ontouchEnd($event)" -->
      <div class="mv-content">
        <ul>
          <li class="item" v-for="(mv, index) in mvList" :key="index">
            <img v-lazy="mv.cover" @load="loadImage">
            <div class="artist">
              <p class="mv-name">{{ mv.name }}</p>
              <p class="artist-name">{{ mv.artistName }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="loading-container" v-show="!mvList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
  data () {
    return {
      touch: {}, // 保存着起始位置x1和变化的位置x2
      touchStartTime: 0, // touch开始
      touchEndTime: 0, // touch结束时间
      currentDistance: 0, // 上一个touch事件完成后，已滑动距离。
      totalDiff: 0, // 总滑动距离
      checkedLoaded: false
    }
  },
  props: {
    mvList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    ontouchStart (e) {
      let touch = e.changedTouches[0]
      this.touch.x1 = touch.pageX
    },
    ontouchMove (e) {
      let touch = e.changedTouches[0]
      this.touch.x2 = touch.pageX
      let diff = this.touch.x2 - this.touch.x1
      this.totalDiff = diff + this.currentDistance
      if (this.totalDiff < 0) {
        this.totalDiff = 0
      } else if (this.totalDiff > this.maxMoveDistance) {
        this.totalDiff = this.maxMoveDistance
      }
      let el = e.currentTarget
      this.translate(el, this.totalDiff, 0)
      this.translate(this.leftEl, this.totalDiff, 0)
    },
    ontouchEnd (e) {
      let touch = e.changedTouches[0]
      this.touch.x2 = touch.pageX
      let diff = this.touch.x2 - this.touch.x1
      this.touchEndTime = Date.now()
      this.totalDiff = diff + this.currentDistance
      this.currentDistance = this.totalDiff
      let el = e.currentTarget
      let touchTime = this.touchEndTime - this.touchStartTime
      if (this.totalDiff > this.maxMoveDistance / 2 || (touchTime < 150 && this.totalDiff > this.maxMoveDistance / 10)) {
        this.translate(el, this.maxMoveDistance, 0, {
          transitionTimingFunction: 'linear',
          transitionDuration: '.1s'
        })
        this.translate(this.leftEl, this.maxMoveDistance, 0, {
          transitionTimingFunction: 'linear',
          transitionDuration: '.1s'
        })
        this.$emit('dragedSlide')
      } else {
        this.totalDiff = this.currentDistance = 0
        this.translate(el, this.totalDiff, 0)
        this.translate(this.leftEl, this.totalDiff, 0)
      }
    },
    translate (el, x, y, options) {
      const defaultOptions = {
        useTransfrom: true,
        transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        transitionDuration: '0s'
      }
      for (let option in options) {
        defaultOptions[option] = options[option]
      }
      if (defaultOptions.useTransfrom) {
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
        el.style.transitionProperty = 'transform'
        el.style.transitionTimingFunction = defaultOptions.transitionTimingFunction
        el.style.transitionDuration = defaultOptions.transitionDuration
      } else {
        el.style.left = x
        el.style.top = y
      }
    },
    loadImage () {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
  .mv-list-show
    position fixed
    top 5.5rem
    bottom 0
    width 100%
    .mv-list-wrapper
      padding 0 1px
      height 100%
      overflow hidden
      .mv-content
        .item
          height 185px
          width 100%
          img
            width 100%
            height 150px
          .artist
            height 30px
            margin-top 2px
            padding-left 5px
            .mv-name
              font-size 14px
            .artist-name
              font-size 12px
              margin-top 3px
              color #888
      .loading-container
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
</style>
