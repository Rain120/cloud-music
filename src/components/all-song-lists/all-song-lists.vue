<template>
  <div class="all-song-lists">
    <back-header :title="title" :songListsHeader="songListsHeader" :descShow="descShow" @back="back" />
  </div>
</template>

<script>
import BackHeader from 'base/back-header/back-header'
import * as apiData from 'api/data'
import { CODE_OK } from 'common/js/config'

export default {
  data () {
    return {
      title: this.$route.params.title,
      songListsHeader: true,
      descShow: false
    }
  },
  created () {
    this._getCategoryList()
    this._getPlayList()
  },
  methods: {
    back () {
      this.$router.back()
    },
    _getPlayList () {
      apiData.getPlayList().then(res => {
        if (res.status === CODE_OK) {
          console.log(res.data)
        }
      })
    },
    _getCategoryList () {
      apiData.getCategoryList().then((res) => {
        if (res.status === CODE_OK) {
          console.log(res.data)
        }
      })
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
    transform: translate3d(100%, 0, 0)
  .all-song-lists
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background #fff
</style>
