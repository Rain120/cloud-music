<template>
  <div class="song-list" ref="list">
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probeType="probeType"
      :listen-scroll="listenScroll"
      :data="songs"
      @scroll="scrollPos">
      <div>
        <div class="song-list-header">
          <div class="songinfo">
            <div class="list-img">
              <img v-lazy="songList.coverImgUrl" />
            </div>
            <div class="list-desc">
              <div class="list-name">{{songList.name}}</div>
              <div class="list-info">
                <div class="song-list-user" v-if="listType === '歌单' && songList.creator">
                  <img class="avatar" v-lazy="songList.creator.avatarUrl"/>
                  <span class="nickname">{{songList.creator.nickname}}</span>
                  <i class="icon iconfont music-arrow-right"></i>
                </div>
                <div class="album" v-else>
                  <p class="singer">歌手: Rainy</p>
                  <p class="time">发行时间: 2018-08-19</p>
                </div>
              </div>
            </div>
          </div>
          <div class="features">
            <div class="commment-icon">
              <i class="icon iconfont music-message"></i>
              <p>{{songList.commentCount}}</p>
            </div>
            <div class="share-icon">
              <i class="icon iconfont music-share"></i>
              <p>{{songList.shareCount}}</p>
            </div>
            <div class="download-icon">
              <i class="icon iconfont music-download"></i>
              <p>下载</p>
            </div>
            <div class="checkmore-icon">
              <i class="icon iconfont music-volume"></i>
              <p>多选</p>
            </div>
          </div>
        </div>
        <div class="songs">
          <div class="operate">
            <div class="play">
              <div class="play-btn" @click="palyAll">
                <i class="icon iconfont music-play"></i>
              </div>
              <span class="songs-num">{{playNums()}}</span>
            </div>
            <div class="collect" v-show="collectShow">{{collectNum()}}</div>
          </div>
          <ul>
            <li class="song-desc" @click="selectItem(song, index)" v-for="(song, index) in songs" :key="index">
              <div class="song-item">
                <div class="order">{{index + 1}}</div>
                <div class="song">
                  <div class="desc">
                    <p class="song-name">{{song.name}}</p>
                    <p class="info">
                      <span class="singer">{{song.ar[0].name}}</span> - <span class="artist">{{song.name}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="!songs.length">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { playlistMixin } from 'common/js/mixin'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      songsnum: ''
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.scroll.refresh()
    })
  },
  props: {
    songList: {
      type: Object,
      default () {
        return {}
      }
    },
    songs: {
      type: Array,
      default () {
        return []
      }
    },
    listType: {
      type: String,
      default: ''
    },
    collectNums: {
      type: Number
    },
    collectShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollPos (pos) {
      let title = false
      if (pos.y < -240) {
        title = true
      } else {
        title = false
      }
      this.$emit('changeTitle', title)
    },
    handlePlaylist (playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.list.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    palyAll () {
      this.$emit('playAll')
    },
    selectItem (song, index) {
      this.$emit('select', song, index)
    },
    playNums () {
      return `播放全部(共${this.songs.length})首`
    },
    collectNum () {
      if (this.collectNums <= Math.pow(10, 5)) {
        return ` + 收藏(${this.collectNums})`
      } else {
        let cNum = (this.collectNums / Math.pow(10, 4)).toFixed(1)
        return ` + 收藏(${cNum}万)`
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
  @import "~common/stylus/mixin"
  .song-list
    position absolute
    top 52px
    bottom 0
    width 100%
    .scroll-wrapper
      height 100%
      overflow hidden
      .song-list-header
        .songinfo
          display flex
          margin-top 20px
          .list-img
            width 40%
            margin-left 0.6rem
            img
              float right
              width 135px
              height 135px
              border-radius 3px
          .list-desc
            flex 1
            .list-name
              font-size 1.3rem
              font-weight 500
              padding 0.8rem
            .list-info
              padding-left 0.5rem
              .song-list-user
                .avatar
                  width 2rem
                  height 2rem
                  display inline-block
                  vertical-align middle
                  border-radius 50%
                .nickname
                  display inline-block
                  vertical-align middle
                  padding 0 .5rem
            .album
              .singer
                font-size 1.2rem
              .time
                font-size 1rem
                padding .4rem 0
        .features
          display flex
          margin 10px
          div
            flex 1
            text-align center
          i
            font-size 24px
          p
            padding-top 3px
      .songs
        height 100%
        border 1px solid rgba(180, 180, 180, .1)
        border-radius 10px
        background rgba(180, 180, 180, .1)
        .operate
          display flex
          border-thin(#a0a0a0)
          .play
            width 65%
            .play-btn
              width 50px
              text-align center
              display inline-block
              position relative
              top 4px
              i
                font-size 22px
            .songs-num
              text-align center
              line-height 40px
              vertical-align middle
          .collect
            flex 1
            background #2ed82e
            font-size 18px
            color #fff
            text-align center
            line-height 40px
            vertical-align middle
            border-radius 0 10px 0 0
        .song-desc
          .song-item
            display table
            height 50px
            .order
              display table-cell
              width 80px
              font-size 20px
              text-align center
              vertical-align middle
            .song
              padding 10px 0
              border-thin(#a0a0a0)
              .desc
                .info
                  color #828080
                  .singer, .artist
                    font-size 12px
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
