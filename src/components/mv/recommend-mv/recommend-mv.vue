<template>
  <div class="recommend-mv">
    <mv-list-show :mvList="topMV"></mv-list-show>
  </div>
</template>

<script>
import MvListShow from 'base/mv-list-show/mv-list-show'
import * as apiData from 'api/data'
import { CODE_OK } from 'common/js/config'
export default {
  data () {
    return {
      topMV: []
    }
  },
  created () {
    this._getTopMV()
  },
  methods: {
    _getTopMV () {
      apiData.getTopMV(100).then(res => {
        if (res.data.code === CODE_OK) {
          this.topMV = res.data.data
        }
      })
    }
  },
  components: {
    MvListShow
  }
}
</script>

<style lang="stylus" scoped>
  .recommend-mv
    position absolute
    top 0
</style>
