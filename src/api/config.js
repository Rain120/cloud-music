let url = `http://localhost:3000`

let apiConfig = {
  playUrl: `${url}/music/url`,
  recommendBannerPath: `${url}/banner`,
  recommendMusicListPath: `${url}/personalized`,
  recommendMVPath: `${url}/personalized/mv`,
  newSong: `${url}/personalized/newsong`,
  DjProgram: `${url}/personalized/djprogram`,
  recommendPrivatePath: `${url}/personalized/privatecontent`,
  musicListDetailPath: `${url}/recommendMVPath`,
  albumSongs: `${url}/album`,
  lyric: `${url}/lyric`,
  topMV: `${url}/top/mv`,
  MVDetail: `${url}/mv`,
  MVSimi: `${url}/simi/mv`,
  MVComment: `${url}/comment/mv`,
  hotSearch: `${url}/search/hot`,
  suggest: `${url}/search/suggest`,
  search: `${url}/search`,
  singerMV: `${url}/artist/mv`,
  singerAlbum: `${url}/artist/album`,
  singerMusic: `${url}/artists`,
  singerDesc: `${url}/artist/desc`,
  songListDesc: `${url}/playlist/detail`,
  newAlbum: `${url}/top/album`,
  playList: `${url}/top/playlist`,
  categoryList: `${url}/playlist/catlist`,
  rank: `${url}/top/list`,
  copyright: `${url}/check/music`,
  highquality: `${url}/top/playlist/highquality`
}

export default apiConfig
