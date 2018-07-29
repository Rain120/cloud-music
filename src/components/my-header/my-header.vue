<template>
  <div class="my-header">
    <div class="menu">
      <i class="icon iconfont music-menu ripple" @click="showSidebar"></i>
    </div>
    <sidebar ref="sidebar"/>
    <div class="tabs">
      <router-link tag="div" to="/mine" class="item ripple">
        <i class="icon iconfont music-mine"></i>
      </router-link>
      <router-link tag="div" to="/index" class="item ripple">
        <i class="icon iconfont music-icon"></i>
      </router-link>
      <router-link tag="div" to="/mv" class="item ripple">
        <i class="icon iconfont music-mv"></i>
      </router-link>
    </div>
    <div class="search">
      <i class="icon iconfont music-search ripple"></i>
    </div>
  </div>
</template>

<script>
import Sidebar from 'src/components/sidebar/sidebar'
export default {
  methods: {
    search () {
      this.$router.push('/search')
    },
    showSidebar () {
      this.$refs.sidebar.open()
    }
  },
  components: {
    Sidebar
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  .my-header
    i
      color #ffffff
      font-size 26px
    display grid
    grid-template-columns 10% 10% 60% 20% 16%
    width 100%
    height 3rem
    background #d33a31
    text-align center
    position absolute
    top 0
    right 0
    .menu, .search
      margin auto
    .tabs
      height 3rem
      color #e58983
      display flex
      justify-content center
      align-items center
      .item
        flex 1
        vertical-align middle
</style>
