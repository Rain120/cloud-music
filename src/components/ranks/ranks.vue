<template>
  <transition name="slide">
    <div class="ranks">
      <back-header
      :title="title"
      :songListsHeader="songListsHeader"
      :descShow="descShow"/>
      <scroll
      class="rank-scroll-wrapper"
      ref="scroll"
      :data="globalRankLists">
        <div>
          <div class="offical-rank">
            <p class="title">官方榜</p>
            <ul>
              <li v-for="(rank, index) in officialRankLists"
                :key="index">
                <div class="rank">
                  <div class="rank-left">
                    <img v-lazy="rank.data.playlist.coverImgUrl" />
                  </div>
                  <div class="rank-right">
                    <ul>
                      <li v-for="(item, index) in rank.data.playlist.tracks.slice(0, 3)"
                        :key="index">
                        <p>getRankList(item, index)</p>
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
              <li v-for="(item, index) in officialRankLists"
                :key="index">
                  <img v-lazy="item.data.playlist.coverImgUrl" />
                  <p class="name">{{item.data.playlist.name}}</p>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
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
  computed: {
    getRankList (item, index) {
      return `${index}.${item.name} - ${item.ar[0].name}`
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
    _getRankList () {
      for (let index = 0; index <= 23; index++) {
        apiData.getRankList(index).then(res => {
          if (res.code === CODE_OK) {
            if (index < 4) {
              this.officialRankLists.push(res)
            } else {
              this.globalRankLists.push(res)
            }
          }
        })
      }
    }
  },
  components: {
    Scroll,
    BackHeader
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
    z-index 100
    top 0
    left 0
    bottom 0
    right 0
    background #fff
    .rank-scroll-wrapper
      height 100%
      overflow hidden
      .title
        padding .5rem 0 0 .5rem
        font-size 1.1rem
      .offical-rank
        .rank
          display flex
          .rank-left
            width 35%
            margin .4rem
            img
              width 95%
              height 95%
              border-radius .8rem
          .rank-right
            flex 1
            li
              padding .8rem
      .global-rank
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
</style>
