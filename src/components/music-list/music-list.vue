<template>
  <transition name="slide">
    <div class="music-list">
      <back-header :title="title" :description="description" :descShow="descShow" @back="back" />
      <song-list
        @select="playSong"
        @playAll="playAll"
        :songs="songListDesc"
        :songList="songList"
        :collectNums="collectNums"
        :collectShow="collectShow"></song-list>
    </div>
  </transition>
</template>

<script>
import BackHeader from 'base/back-header/back-header'
import SongList from 'base/song-list/song-list'
import * as apiData from 'api/data'
import { CODE_OK } from 'common/js/config'
import { mapActions } from 'vuex'

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
  mounted () {
    this.$nextTick(() => {
      this._getSongListDesc()
    })
  },
  methods: {
    playSong (song, index) {
      this.selectPlay({
        songs: this.songListDesc,
        index
      })
    },
    playAll () {
      this.randomPlay({
        songs: this.songListDesc
      })
    },
    back () {
      this.$router.back()
    },
    normalizeSongs (songs) {
      return songs.map((song, index) => {
        song.singer = song.ar.map(item => item.name)[0]
        song.picUrl = song.al.picUrl
        song.playUrl = `http://music.163.com/song/media/outer/url?id=${song.id}.mp3`
      })
    },
    _getSongListDesc () {
      apiData.getSongListDesc(this.$route.query.id).then(res => {
        if (res.data.code === CODE_OK) {
          this.songList = res.data.playlist
          this.collectNums = this.songList.subscribedCount
          this.description += this.songList.description
          this.songListDesc = this.songList.tracks
          this.normalizeSongs(this.songListDesc)
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
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
  .music-list
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    background #fff
</style>
