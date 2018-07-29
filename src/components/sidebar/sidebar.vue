<template>
  <div class="sidebar">
    <transition name="fold">
      <div class="sidebar-content" ref="scroll" v-show="showSidebar">
        <div class="avatar">
          <!-- <img src="./avatar.png"> -->
        </div>
        <div class="username info">Rainy</div>
        <div class="email info">Email: 108513194@qq.com</div>
        <div class="blog info">Github: <a href="https://github.com/Rain120">Rain120</a></div>
        <div class="info">
          这里什么也没有，哈哈哈哈
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" @click.stop.prevent="hide" v-show="showSidebar"></div>
    </transition>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
export default {
  data () {
    return {
      showSidebar: false
    }
  },
  methods: {
    hide () {
      this.showSidebar = false
    },
    open () {
      this.showSidebar = true
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
  .sidebar
    .sidebar-content
      position fixed
      top 0
      left 0
      z-index 40
      width 60%
      height 100%
      background-color rgba(255, 255, 255, 0.6)
      // background-color #222222
      color #ffffff
      transform translate3d(0, 0, 0)
      &.fold-enter-active, &.fold-leave-active
        transition all .5s
      &.fold-enter, &.fold-leave-active
        transform translate3d(-100%, 0, 0)
      .avatar
        position relative
        top 10px
        left 25%
        img
          display block
          width 140px
          height 140px
          border-radius 50%
      .info
        text-align center
        margin-top 20px
        font-size 16px
    .mask
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      z-index 30
      background rgba(7, 17, 27, .6)
      opacity 1
      &.fade-enter-active, &.fade-leave-active
        transition all .5s
      &.fade-enter, &.fade-leave-active
        opacity 0
</style>
