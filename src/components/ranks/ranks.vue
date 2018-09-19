<template>
  <transition name="slide">
    <div class="ranks">
      <back-header
      :title="title"
      :songListsHeader="songListsHeader"
      :descShow="descShow" />
      <scroll
        class="rank-scroll-wrapper"
        v-show="globalRankLists.length && officialRankLists.length"
        ref="scroll"
        :data="officialRankLists.concat(globalRankLists)">
        <div>
          <div class="offical-rank">
            <p class="title">官方榜</p>
            <ul>
              <li v-for="(rank, index) in officialRankLists"
                :key="index"
                @click="showRankList(rank)">
                <div class="rank">
                  <div class="rank-left">
                    <img v-lazy="rank.data.playlist.coverImgUrl" />
                  </div>
                  <div class="rank-right">
                    <ul>
                      <li v-for="(item, index) in rank.data.playlist.tracks.slice(0, 3)"
                        :key="index">
                        <p>{{getRankList (item, index)}}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="global-rank">
            <p class="title">全球榜</p>
            <ul>
              <li v-for="(item, index) in globalRankLists"
                :key="index">
                  <img v-lazy="item.data.playlist.coverImgUrl" />
                  <p class="name">{{item.data.playlist.name}}</p>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
      <div class="loading-container" v-show="!globalRankLists.length  || !officialRankLists.length">
        <loading></loading>
      </div>
    </div>
  </transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import BackHeader from 'base/back-header/back-header'
import * as apiData from 'api/data'
import { CODE_OK } from 'common/js/config'
export default {
  data () {
    return {
      officialRankLists: [],
      globalRankLists: [],
      title: this.$route.params.title,
      songListsHeader: true,
      descShow: false,
      collectNums: 0,
      collectShow: true
    }
  },
  created () {
    this._getRankList()
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.scroll.refresh()
    })
  },
  methods: {
    showRankList (rank) {
      if (CODE_OK === rank.data.code) {
        this.$router.push({
          name: 'MusicList',
          params: {
            title: '歌单'
          },
          query: {
            id: rank.data.playlist.id
          }
        })
      }
    },
    getRankList (item, index) {
      return `${index}.${item.name} - ${item.ar[0].name}`
    },
    _getRankList () {
      let ranksRet = []
      for (let index = 0; index <= 23; index++) {
        ranksRet.push(Promise.resolve(apiData.getRankList(index)))
      }
      Promise.all(ranksRet).then(res => {
        res.map((rank, index) => {
          if (index < 4) {
            this.officialRankLists.push(rank)
          } else if (index >= 4 && index <= 23) {
            this.globalRankLists.push(rank)
          }
        })
      })
    }
  },
  components: {
    Scroll,
    BackHeader,
    Loading
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
    top 0
    left 0
    bottom 0
    right 0
    background #fff
    .rank-scroll-wrapper
      position absolute
      top 3.2rem
      bottom 0
      width 100%
      overflow hidden
      .title
        font-size 1.1rem
        padding .3rem
      .offical-rank
        .rank
          display flex
          .rank-left
            width 35%
            padding .2rem 0 0 .2rem
            img
              width 95%
              height 95%
              border-radius .8rem
          .rank-right
            flex 1
            li
              padding .6rem
      .global-rank
        ul
          display grid
          grid-template-columns repeat(3, 1fr)
          li
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
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
