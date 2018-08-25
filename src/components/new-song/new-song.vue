<template>
  <transition name="slide">
    <div class="new-song">
      <back-header
      :title="title"
      :description="description"
      :descShow="descShow"/>
      <song-list>
        <div slot="header" class="header-slot">
          <div class="song-list-header">
            <div class="songinfo">
              <div class="list-img">
                <img v-lazy="songList.coverImgUrl" alt="专辑"/>
              </div>
              <div class="list-desc">
                <!-- <div class="list-name">{{songList.name}}</div> -->
                  <div class="album">
                    <p class="singer">歌手: Rainy</p>
                    <p class="time">发行时间: 2018-08-19</p>
                  </div>
              </div>
            </div>
          </div>
          <div class="features">
            <div class="commment-icon">
              <i class="icon iconfont music-message"></i>
              <!-- <p>{{songList.commentCount}}</p> -->
            </div>
            <div class="share-icon">
              <i class="icon iconfont music-share"></i>
              <!-- <p>{{songList.shareCount}}</p> -->
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
      </song-list>
    </div>
  </transition>
</template>

<script>
import BackHeader from 'base/back-header/back-header'
import SongList from 'base/song-list/song-list'

export default {
  data () {
    return {
      songList: {},
      songListDesc: [],
      title: this.$route.params.title,
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
    BackHeader,
    SongList
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.5s

.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)

.new-song
  position fixed
  z-index 100
  top 0
  left 0
  bottom 0
  right 0
  background #fff
  .header-slot
    .header-slot
    .song-list-header
      .songinfo
        display flex
        .list-img
          width 40%
          margin-left 0.6rem
          img
            float right
            width 10rem
            height 10rem
            border-radius 3px
        .list-desc
          flex 1
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
</style>
