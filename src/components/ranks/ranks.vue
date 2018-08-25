<template>
  <transition name="slide">
    <div class="ranks">
      <back-header
      :title="title"
      :songListsHeader="songListsHeader"
      :descShow="descShow"/>
    </div>
  </transition>
</template>

<script>
import BackHeader from 'base/back-header/back-header'
import * as apiData from 'api/data'
// import { CODE_OK } from 'common/js/config'
export default {
  data () {
    return {
      rankLists: [],
      title: this.$route.params.title,
      songListsHeader: true,
      descShow: false,
      collectNums: 0,
      collectShow: true
    }
  },
  created () {
    this._getRankLists()
  },
  methods: {
    _getRankLists () {
      for (let index = 0; index <= 23; index++) {
        apiData.getRankLists(index).then(res => {
          this.rankLists.push(res)
        }).then(() => {
          console.log(this.rankLists)
        })
      }
    }
  },
  components: {
    BackHeader
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.5s

  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)

  .ranks
    position fixed
    z-index 100
    top 0
    left 0
    bottom 0
    right 0
    background #fff
</style>
