<template>
  <div class="recommend" ref="recommend">
    <scroll
      class="recommend-wrapper"
      ref="scroll"
      :data="recommendMusicLists">
      <div>
        <div class="sliders">
          <div class="slider-wrapper" v-if="banners.length > 0">
            <slider>
              <div v-for="(banner, index) in banners" :key="index">
                <a :href="banner.url">
                  <img class="needsclick" :src="banner.picUrl" />
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="tabs">
          <div class="tab">
            <div class="icon-wrapper">
              <i class="icon iconfont music-broadcast"></i>
            </div>
            <p class="description">私人FM</p>
          </div>
          <div class="tab">
            <div class="icon-wrapper">
              <i class="icon iconfont music-calendar"></i>
              <p class="date">{{ (new Date()).getDate() }}</p>
            </div>
            <p class="description">每日推荐</p>
          </div>
          <div class="tab" @click="showAllSongLists">
            <div class="icon-wrapper">
              <i class="icon iconfont music-songs"></i>
            </div>
            <p class="description">歌单</p>
          </div>
          <div class="tab" @click="showRank">
            <div class="icon-wrapper">
              <i class="icon iconfont music-rank"></i>
            </div>
            <p class="description">排行榜</p>
          </div>
        </div>
        <div class="recommend-music-list common">
          <div class="title" @click="showAllSongLists">推荐歌单<i class="icon iconfont music-arrow-right"></i></div>
            <div class="list-content common-content">
              <ul>
                <li @click="showSongList(item)" v-for="(item, index) in recommendMusicList" :key="index">
                  <img v-lazy="item.picUrl">
                  <div class="list-play-count">
                    <i class="icon iconfont music-volume"></i>&nbsp;<span>{{listenCount(item.playCount)}}</span>
                  </div>
                  <p class="name">{{ item.name }}</p>
                </li>
              </ul>
            </div>
        </div>
        <div class="recommend-new-music common">
          <div class="title" @click="showAllNewSong">最新音乐<i class="icon iconfont music-arrow-right"></i></div>
          <div class="new-song-content common-content">
              <ul>
                <li  @click="showNewSong(song)" v-for="(song, index) in recommendNewSong" :key="index">
                  <img v-lazy="song.album.picUrl">
                  <p class="name">{{ song.name }}</p>
                </li>
              </ul>
            </div>
        </div>
        <div class="recommend-dj-program common">
          <router-link to="/broadcast">
            <div class="title" @click="showAllBroadcast">主播电台<i class="icon iconfont music-arrow-right"></i></div>
          </router-link>
          <div class="dj-program-content common-content">
              <ul>
                <li v-for="(item, index) in recommendDjProgram" :key="index">
                  <img v-lazy="item.picUrl">
                  <p class="name">{{ item.name }}</p>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="!recommendMusicLists.length">
      <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { mapGetters } from 'vuex'
import { playlistMixin } from 'common/js/mixin'
import * as apiData from 'api/data'
import { CODE_OK } from 'common/js/config'
// import { shuffle } from 'common/js/util'

export default {
  mixins: [playlistMixin],
  data () {
    return {
      banners: [],
      recommendMusicLists: [],
      recommendMusicList: [],
      recommendNewSong: [],
      recommendDjProgram: [],
      songListDesc: []
    }
  },
  created () {
    this._getBanner()
    this._getMusicList()
    this._getNewSong()
    this._getDjProgram()
    apiData.getNewAlbum().then(res => {
      // console.log('getNewAlbum', res)
    })
  },
  computed: {
    ...mapGetters([
      'currentRefreshTime'
    ])
  },
  methods: {
    handlePlaylist (playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    showRank () {
      this.$router.push({
        name: 'Ranks',
        params: {
          title: '排行榜'
        }
      })
    },
    showAllSongLists () {
      this.$router.push({
        name: 'AllSongLists',
        params: {
          title: '歌单'
        }
      })
    },
    showSongList (song) {
      this.$router.push({
        name: 'MusicList',
        params: {
          title: '歌单'
        },
        query: {
          id: song.id
        }
      })
    },
    showNewSong (song) {
      console.log(song)
      this.$router.push({
        name: 'NewSong',
        params: {
          title: '专辑'
        },
        query: {
          id: song.id
        }
      })
    },
    showAllNewSong () {
      console.log('showAllNewSong')
    },
    showAllBroadcast () {
      this.$router.push({
        name: 'Broadcast'
      })
    },
    listenCount (playCount) {
      if (playCount > Math.pow(10, 8)) {
        return `${(playCount / Math.pow(10, 8)).toFixed(2).slice(0, -1)}亿`
      } else if (playCount > 100000) {
        return `${(playCount / Math.pow(10, 4)).toFixed(2).slice(0, -1)}万`
      } else {
        return `${parseInt(playCount)}`
      }
    },
    _getBanner () {
      apiData.getBanner().then(res => {
        if (res.data.code === CODE_OK) {
          this.banners = res.data.banners
        }
      })
    },
    _getMusicList () {
      apiData.getMusicList().then(res => {
        this.recommendMusicLists = res
        this.recommendMusicList = res.slice(0, 6)
      })
    },
    _getNewSong () {
      apiData.getNewSong().then(res => {
        if (res.data.code === CODE_OK) {
          res.data.result.slice(0, 6).forEach(item => {
            this.recommendNewSong.push(item.song)
          })
        }
      })
    },
    _getDjProgram () {
      apiData.getDjProgram().then(res => {
        if (res.data.code === CODE_OK) {
          this.recommendDjProgram = res.data.result
        }
      })
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"

  .recommend
    position fixed
    top 5.5rem
    bottom 0
    width 100%
    .recommend-wrapper
      height 100%
      overflow hidden
      .tabs
        height 5rem
        padding-top .3rem
        display flex
        border-thin(#a0a0a0)
        .tab
          width 25%
          text-align center
          .icon-wrapper
            width 2.5rem
            height 2.5rem
            margin 0.5rem auto
            border-radius 50%
            border 1.5px solid #d33a31
            position relative
            .date
              position absolute
              top 15px
              left 0px
              right 0
              bottom 0
              text-align center
              color #d33a31
              font-size 16px
            .icon
              font-size 27px
              line-height 2.5rem
              color #d33a31
          .description
            color #303131
            font-size 13px

      .common
        margin-bottom 0.6rem
        .title
          height 30px
          line-height 30px
          font-size 18px
          font-weight 600
          text-indent 5px
          margin 10px 0 10px 5px
          color #303131
          &.icon
            color #919293
        .common-content
          height 100%
          width 100%
          overflow hidden
          ul
            display grid
            grid-template-columns repeat(3, 1fr)
            li
              margin-bottom 0.5rem
              box-sizing border-box
              position relative
              img
                height 137px
                width 100%
                border-radius 3px
              .name
                line-height 20px
                font-size 14px
                no-wrap-nums(2)
            li:nth-child(3n+2)
              padding 0 1.5px
            li:nth-child(3n+1)
              padding-left 3px
            li:nth-child(3n)
              padding-right 3px

      .recommend-music-list
        .list-content
          ul
            li
              .list-play-count
                text-align center
                color #fff
                position absolute
                top 5px
                right 6px
                & > span, & > i
                  font-size 14px
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
