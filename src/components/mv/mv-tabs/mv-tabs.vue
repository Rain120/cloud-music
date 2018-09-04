<template>
  <div class="mv-tabs">
    <div class="tabs" ref="tabsWrapper">
      <ul ref="tab">
        <li v-for="(item, index) in tabs" :key="index" @click="selectItem(index)">
          <router-link tag="div" :to="item.to" class="tab-item">
            <span class="tab-link">{{item.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      tabs: [
        {
          to: '/mv/recommend-mv',
          title: '推荐'
        },
        {
          to: '/mv/music-mv',
          title: '音乐'
        },
        {
          to: 'show-mv',
          title: 'Show'
        },
        {
          to: '/mv/acg-mv',
          title: '二次元'
        },
        {
          to: '/mv/dance-mv',
          title: '舞蹈'
        },
        {
          to: '/mv/game-mv',
          title: '游戏'
        },
        {
          to: '/mv/mvs',
          title: 'mv'
        }
      ],
      mX: 0,
      tabWidth: 80
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._initMenu()
    })
  },
  methods: {
    selectItem (index) {
      let tabs = this.$refs.tab
      let moveX = +tabs.style.transform.replace(/[^0-9\-,]/g, '').split(',')[0]
      switch (index) {
        case 0:
          if (moveX <= 0 && moveX > -this.tabWidth) {
            this.mX = 0
          }
          break
        case 1:
          if (moveX <= 0 && moveX > -this.tabWidth * 2) {
            this.mX = 0
          }
          break
        case 2:
          if (moveX < 0 && moveX >= -this.tabWidth * 2) {
            this.mX = 0
          }
          break
        case 3:
          if (moveX <= 0 && moveX >= -this.tabWidth * 2) {
            this.mX = -this.tabWidth
          }
          break
        case 4:
          if (moveX <= 0 && moveX >= -this.tabWidth * 2) {
            this.mX = -this.tabWidth * 2
          } else if (moveX === 0) {
            this.mX = -this.tabWidth * 2
          }
          break
        case 5:
          if (moveX < 0 && moveX > -this.tabWidth * 2) {
            this.mX = -this.tabWidth * 2
          }
          break
        case 6:
          if (moveX > -this.tabWidth * 2 && moveX < -this.tabWidth * 3 / 2) {
            this.mX = -this.tabWidth * 2 + 10
          }
          break
        default:
          break
      }
      tabs.style.transform = `translate(${this.mX}px, 0)`
    },
    _initMenu () {
      let tabsWidth = this.tabWidth
      let width = this.tabs.length * tabsWidth
      this.$refs.tab.style.width = `${width}px`
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.tabsWrapper, {
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        } else {
          this.scroll.refresh()
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .mv-tabs
    position relative
    top -5.5rem
    bottom 0
    width 100%
    .tabs
      margin-top 3rem
      height 2.5rem
      width 100%
      line-height 2.5rem
      box-sizing border-box
      overflow hidden
      white-space nowrap
      // display flex
      .tab-item
        // flex 1
        float left
        width 80px
        height 40px
        text-align center
        .tab-link
          padding-bottom 5px
          color #333333
        &.router-link-active
          color #d33a31
          border-bottom 2px solid #d33a31
          box-sizing border-box
</style>
