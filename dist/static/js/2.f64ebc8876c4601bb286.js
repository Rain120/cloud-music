webpackJsonp([2],{H4HZ:function(s,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=i("2+wy"),a=i("ZV4u"),n={data:function(){return{songList:{},songListDesc:[],title:this.$route.params.title,description:"编辑推荐：",descShow:!0,collectNums:0,collectShow:!0}},methods:{},components:{BackHeader:e.a,SongList:a.a}},l={render:function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("transition",{attrs:{name:"slide"}},[i("div",{staticClass:"new-song"},[i("back-header",{attrs:{title:s.title,description:s.description,descShow:s.descShow}}),s._v(" "),i("song-list",[i("div",{staticClass:"header-slot",attrs:{slot:"header"},slot:"header"},[i("div",{staticClass:"song-list-header"},[i("div",{staticClass:"songinfo"},[i("div",{staticClass:"list-img"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:s.songList.coverImgUrl,expression:"songList.coverImgUrl"}],attrs:{alt:"专辑"}})]),s._v(" "),i("div",{staticClass:"list-desc"},[i("div",{staticClass:"album"},[i("p",{staticClass:"singer"},[s._v("歌手: Rainy")]),s._v(" "),i("p",{staticClass:"time"},[s._v("发行时间: 2018-08-19")])])])])]),s._v(" "),i("div",{staticClass:"features"},[i("div",{staticClass:"commment-icon"},[i("i",{staticClass:"icon iconfont music-message"})]),s._v(" "),i("div",{staticClass:"share-icon"},[i("i",{staticClass:"icon iconfont music-share"})]),s._v(" "),i("div",{staticClass:"download-icon"},[i("i",{staticClass:"icon iconfont music-download"}),s._v(" "),i("p",[s._v("下载")])]),s._v(" "),i("div",{staticClass:"checkmore-icon"},[i("i",{staticClass:"icon iconfont music-volume"}),s._v(" "),i("p",[s._v("多选")])])])])])],1)])},staticRenderFns:[]};var o=i("VU/8")(n,l,!1,function(s){i("iRWi")},"data-v-4fd515d1",null);t.default=o.exports},P2Q4:function(s,t){},ZV4u:function(s,t,i){"use strict";var e=i("qwAB"),a=i("y/jF"),n={mixins:[i("F4+m").a],created:function(){this.probeType=3,this.listenScroll=!0},mounted:function(){var s=this;this.$nextTick(function(){s.$refs.scroll.refresh()})},props:{songs:{type:Object,default:function(){return{}}},listType:{type:String,default:""},collectShow:{type:Boolean,default:!1}},methods:{handlePlaylist:function(s){var t=s.length>0?"60px":"";this.$refs.songList.style.bottom=t,this.$refs.scroll.refresh()},songArtist:function(s,t){return s+" - "+t},scrollPos:function(s){var t=!1;t=s.y<-240,this.$emit("changeTitle",t)},palyAll:function(){this.$emit("playAll")},selectItem:function(s,t){this.$emit("select",s,t)},playNums:function(){return"播放全部(共"+this.songs.data.length+")首"},collectNum:function(){return this.collectNums<=Math.pow(10,5)?" + 收藏("+this.songs.collectNums+")":" + 收藏("+(this.songs.collectNums/Math.pow(10,4)).toFixed(1)+"万)"}},components:{Scroll:e.a,Loading:a.a}},l={render:function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",{ref:"songList",staticClass:"song-list"},[i("scroll",{ref:"scroll",staticClass:"scroll-wrapper",attrs:{probeType:s.probeType,"listen-scroll":s.listenScroll,data:s.songs.data},on:{scroll:s.scrollPos}},[i("div",[s._t("header"),s._v(" "),i("div",{staticClass:"songs"},[i("div",{staticClass:"operate"},[i("div",{staticClass:"play"},[i("div",{staticClass:"play-btn",on:{click:s.palyAll}},[i("i",{staticClass:"icon iconfont music-play"})]),s._v(" "),i("span",{staticClass:"songs-num"},[s._v(s._s(s.playNums()))])]),s._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:s.collectShow,expression:"collectShow"}],staticClass:"collect"},[s._v(s._s(s.collectNum()))])]),s._v(" "),i("ul",s._l(s.songs.data,function(t,e){return i("li",{key:e,staticClass:"song-desc",on:{click:function(i){s.selectItem(t,e)}}},[i("div",{staticClass:"song-item"},[i("div",{staticClass:"order"},[s._v(s._s(e+1))]),s._v(" "),i("div",{staticClass:"song"},[i("div",{staticClass:"desc"},[i("p",{staticClass:"song-name"},[s._v(s._s(t.name))]),s._v(" "),i("p",{staticClass:"info"},[s._v("\n                    "+s._s(s.songArtist(t.singer,t.album))+"\n                    ")])])])])])}))])],2)]),s._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!s.songs.data.length,expression:"!songs.data.length"}],staticClass:"loading-container"},[i("loading")],1)],1)},staticRenderFns:[]};var o=i("VU/8")(n,l,!1,function(s){i("P2Q4")},"data-v-01b90823",null);t.a=o.exports},iRWi:function(s,t){}});
//# sourceMappingURL=2.f64ebc8876c4601bb286.js.map