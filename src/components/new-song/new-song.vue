<template>
  <transition name="slide">
    <div class="new-song">
      <back-header :title="title" :description="description" :descShow="descShow" @back="back" />
    </div>
  </transition>
</template>

<script>
import BackHeader from 'base/back-header/back-header'
export default {
  data () {
    return {
      songList: {},
      songListDesc: [],
      title: '歌单',
      description: '编辑推荐：',
      descShow: true,
      collectNums: 0,
      collectShow: true
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  },
  components: {
    BackHeader
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .new-song
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background #fff
</style>
