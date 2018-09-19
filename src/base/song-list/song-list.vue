<template>
  <div class="song-list" ref="songList">
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probeType="probeType"
      :listen-scroll="listenScroll"
      :data="songs.data"
      @scroll="scrollPos">
      <div>
        <slot name="header"></slot>
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
            <li class="song-desc" @click="selectItem(song, index)" v-for="(song, index) in songs.data" :key="index">
              <div class="song-item">
                <div class="order">{{index + 1}}</div>
                <div class="song">
                  <div class="desc">
                    <p class="song-name">{{song.name}}</p>
                    <p class="info">
                      {{songArtist(song.singer, song.album)}}
                      <!-- <span class="singer">{{song.singer}}</span>-<span class="artist">{{song.album}}</span> -->
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="!songs.data.length">
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
    songs: {
      type: Object,
      default () {
        return {}
      }
    },
    listType: {
      type: String,
      default: ''
    },
    collectShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handlePlaylist (playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.songList.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    songArtist (singer, album) {
      return `${singer} - ${album}`
    },
    scrollPos (pos) {
      let title = false
      if (pos.y < -240) {
        title = true
      } else {
        title = false
      }
      this.$emit('changeTitle', title)
    },
    palyAll () {
      this.$emit('playAll')
    },
    selectItem (song, index) {
      this.$emit('select', song, index)
    },
    playNums () {
      return `播放全部(共${this.songs.data.length})首`
    },
    collectNum () {
      if (this.collectNums <= Math.pow(10, 5)) {
        return ` + 收藏(${this.songs.collectNums})`
      } else {
        let cNum = (this.songs.collectNums / Math.pow(10, 4)).toFixed(1)
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
    top 3.2rem
    bottom 0
    width 100%
    .scroll-wrapper
      height 100%
      overflow hidden
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
                .song-name
                  padding .3rem 0
                .info
                  color #828080
                  font-size 13px
                  no-wrap-nums(1)
                  // .singer, .artist
                  //   font-size 12px
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
