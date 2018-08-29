<template>
  <transition name="slide">
    <div class="music-list">
      <back-header
      :title="title"
      :description="description"
      :descShow="descShow"/>
      <song-list
        @select="playSong"
        @playAll="playAll"
        @changeTitle="changeTitle"
        :songs="songListDesc"
        :songList="songList"
        :listType="this.$route.params.title"
        :title="this.$route.params.title"
        :collectShow="collectShow">
          <div slot="header" class="header-slot">
            <div class="song-list-header">
              <div class="songinfo">
                <div class="list-img">
                  <img v-lazy="songList.coverImgUrl" />
                </div>
                <div class="list-desc">
                  <div class="list-name">{{songList.name}}</div>
                  <div class="list-info">
                    <div class="song-list-user" v-if="songList.creator">
                      <img class="avatar" v-lazy="songList.creator.avatarUrl"/>
                      <span class="nickname">{{songList.creator.nickname}}</span>
                      <i class="icon iconfont music-arrow-right"></i>
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
          </div>
        </song-list>
    </div>
  </transition>
</template>

<script>
import BackHeader from 'base/back-header/back-header'
import SongList from 'base/song-list/song-list'
import * as apiData from 'api/data'
import { CODE_OK } from 'common/js/config'
import { createSong } from 'common/js/song'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      songList: {},
      songListDesc: {},
      currentListTitle: '',
      title: this.$route.params.title,
      description: '编辑推荐：',
      descShow: true,
      collectShow: true
    }
  },
  created () {
    this.$nextTick(() => {
      this._getSongListDesc()
    })
  },
  methods: {
    playSong (song, index) {
      this.selectPlay({
        songs: this.songListDesc.data,
        index
      })
    },
    playAll () {
      this.randomPlay({
        songs: this.songListDesc.data
      })
    },
    changeTitle (listTitle) {
      this.title = listTitle ? this.currentListTitle : this.$route.params.title
    },
    _normalizeSongs (songs) {
      let ret = []
      songs.map((song, index) => {
        ret.push(createSong(song))
        // this._getPlayUrl(song.id).then(res => {
        //   song.songData = res.data[0]
        //   song.playUrl = song.songData.url
        // })
        // song.singer = song.ar.map(item => item.name)[0]
        // song.picUrl = song.al.picUrl
        // song.playUrl = `http://music.163.com/song/media/outer/url?id=${song.id}.mp3`
      })
      return ret
    },
    // 第二种playurl的获取
    // _getPlayUrl (id) {
    //   return apiData.getPlayUrl(id).then(res => {
    //     if (res.data.code === CODE_OK) {
    //       return res.data
    //     }
    //   })
    // },
    _getSongListDesc () {
      apiData.getSongListDesc(this.$route.query.id).then(res => {
        if (res.data.code === CODE_OK) {
          this.songList = res.data.playlist
          this.currentListTitle = this.songList.name
          this.description += this.songList.description
          this.songListDesc.data = this._normalizeSongs(this.songList.tracks)
          this.songListDesc.collectNums = this.songList.subscribedCount
        }
      })
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ])
  },
  components: {
    BackHeader,
    SongList
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.5s

.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)

.music-list
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  background #fff
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
          .list-name
            font-size 1.3rem
            font-weight 500
            padding 0.8rem
          .list-info
            padding-left 0.5rem
            .song-list-user
              position relative
              bottom -2.5rem
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
</style>
