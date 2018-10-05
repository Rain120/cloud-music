<template>
  <transition name="slide">
    <div class="all-song-list-wrapper">
      <div class="all-song-lists">
        <back-header
        :title="title"
        :songListsHeader="songListsHeader"
        :descShow="descShow" />
        <div class="fine-song-lists" @click="showHighQuality">
          <div class="left">
            <img src="http://p1.music.126.net/B2RjM_mkyBxeDCS6OlwKyw==/109951163430806499.jpg" alt="">
          </div>
          <div class="right">
            <p class="high-quality">精品歌单<i class="icon iconfont music-arrow-right"></i></p>
            <p class="title">香港乐坛女子图鉴（1983-2005）</p>
            <p class="desc">这些香港女歌手的成功，构成了港乐辉煌史的一部分。</p>
          </div>
        </div>
        <div class="all-lists-wrapper">
          <div class="lists-title">
            <div class="select-type">全部歌单<i class="icon iconfont music-arrow-right"></i></div>
            <div class="hot-types">
              <span>华语</span>
              <span>电子</span>
              <span>说唱</span>
            </div>
          </div>
        </div>
      </div>
      <div class="loading-container" v-if="!lists.length">
        <loading></loading>
      </div>
    </div>
  </transition>
</template>

<script>
import BackHeader from 'base/back-header/back-header'
import Loading from 'base/loading/loading'
import * as apiData from 'api/data'
import { CODE_OK } from 'common/js/config'

export default {
  data () {
    return {
      title: this.$route.params.title,
      songListsHeader: true,
      descShow: false,
      highquality: {},
      lists: []
    }
  },
  created () {
    this._getCategoryList()
    this._getPlayList()
    this._getHighquality()
  },
  methods: {
    showHighQuality () {
      this.$router.push({
        name: 'HighQuality'
      })
    },
    _normalizeLists (data) {
      if (data.more && this.lists.length < data.total) {
        this.lists = this.lists.concat(data.playlists)
      }
    },
    _getPlayList () {
      apiData.getPlayList().then(res => {
        if (res.status === CODE_OK) {
          this._normalizeLists(res.data)
          console.log(this.lists, res.data)
        }
      })
    },
    _getCategoryList () {
      apiData.getCategoryList().then((res) => {
        if (res.status === CODE_OK) {
          // console.log(res.data)
        }
      })
    },
    _getHighquality () {
      apiData.getHighquality().then(res => {
        if (res.status === CODE_OK) {
          console.log('getHighquality', res.data)
        }
      })
    }
  },
  components: {
    BackHeader,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition all 0.5s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
  .all-song-list-wrapper
    .all-song-lists
      position fixed
      top 0
      left 0
      bottom 0
      right 0
      background #fff
      .fine-song-lists
        height 150px
        display flex
        .left
          width 30%
          padding-left 20px
          img
            width 100%
            height 83%
            margin-top 5%
        .right
          flex 1
          padding-left 1rem
          margin-top 3%
          letter-spacing 2px
          .high-quality
            font-size 1.4rem
            padding 8px 2px
            i
              font-size 1.4rem
          .title
            font-size 1.1rem
            padding 8px 0
          .desc
            font-size .8rem
            padding-right 5px
      .all-lists-wrapper
        .lists-title
          display flex
          padding 0 20px
          .select-type
            width 50%
            text-align left
          .hot-types
            flex 1
            text-align right
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
