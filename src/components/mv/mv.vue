<template>
  <div class="mv-wrapper">
    <mv-tabs class="tabs"></mv-tabs>
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import MvTabs from './mv-tabs/mv-tabs'
export default {
  data () {
    return {
      data: [],
      transitionName: ''
    }
  },
  computed: {
    name () {
      if (this.transitionName === 'slide-right') {
        return 'slide-left'
      } else {
        return 'slide-right'
      }
    }
  },
  watch: {
    $route (to, from) {
      let fromIndex = from.meta.tab
      let toIndex = to.meta.tab
      let diff = parseInt(fromIndex) - parseInt(toIndex)
      this.transitionName = diff > 0 ? 'slide-right' : 'slide-left'
    }
  },
  components: {
    MvTabs,
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
  .mv-wrapper
    position fixed
    top 5.5rem
    bottom 0
    width 100%
    .tabs
      height 2.5rem
    .slide-left-enter
      transform translate(100%)
    .slide-left-enter-active
      transition all .3s
    .slide-left-leave-active
      transform translate(-100%)
      transition all  .3s
    .slide-right-enter
      transform translate(-100%)
    .slide-right-enter-active
      transition all .3s
    .slide-right-leave-active
      transform translate(100%)
      transition all .3s
</style>
