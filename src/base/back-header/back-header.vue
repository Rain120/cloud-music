<template>
  <div class="back-header">
    <div class="back" :class="descShow ? 'song-list-width' : 'player-header-width'" @click="back">
      <i class="icon iconfont music-back"></i>
    </div>
    <div class="songlist-header" v-show="!player">
      <div class="subtitle">
        <div class="song-desc">
          <p :class="[descShow ? 'title' : 'nodesc']">{{title}}</p>
          <p v-show="descShow" class="description">{{description}}</p>
        </div>
      </div>
      <div class="search">
        <i class="icon iconfont music-search"></i>
      </div>
      <div class="more">
        <i class="icon iconfont music-more"></i>
      </div>
    </div>
    <div class="player-header" v-show="player">
      <div class="song-desc">
        <p class="song-name" v-html="songName"></p>
        <p class="singer" v-html="singer"><i class="icon iconfont music-arrow-right"></i></p>
      </div>
      <div class="share">
        <i class="icon iconfont music-share"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    descShow: {
      type: Boolean,
      default: false
    },
    songName: {
      type: String,
      default: ''
    },
    singer: {
      type: String,
      default: ''
    },
    player: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back () {
      this.$emit('back')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"

  .back-header
    width 100%
    margin-top 10px
    z-index 50
    display flex
    .back
      padding 0 10px
      i
        font-size 32px
    .song-list-width
      width 2rem
    .player-header-width
      width 1rem
    i
      font-size 22px
      display inline-block
      line-height 31px
      vertical-align middle
    .songlist-header, .player-header
      width calc(100% - 30px)
      display grid
      grid-template-columns 70% 12% 16%
      .back
        i
          font-size 30px
          margin-left 20%
      .subtitle, .song-desc
        font-size 0
        .title, .song-name
          font-size 19px
          no-wrap()
        .nodesc
          font-size 20px
          display inline-block
          line-height 31px
          vertical-align middle
        .description, .singer
          no-wrap()
          padding-top 5px
          font-size 12px
          color #000
        .singer
          padding 0.4rem 0
    .player-header
      margin-left 15px
      display grid
      grid-template-columns 80% 20%
      border-thin(#a0a0a0)
      .song-desc
        i
          font-size 12px
          color #a0a0a0
      .share
        display inline-block
</style>
