/*
 * @Author: Rainy
 * @Date: 2018-03-26 16:03:05
 * @Last Modified by: Rainy
 * @Last Modified time: 2018-10-05 17:37:35
 */
// 详见 https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi
import axios from 'axios'
import apiConfig from './config'

export function getPlayUrl (id) {
  let url = apiConfig.playUrl + '?id=' + id
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 获取轮播图数据
export function getBanner () {
  let url = apiConfig.recommendBannerPath
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 获取专辑内容
export function getAlbum (id) {
  let url = apiConfig.albumSongs + '?id=' + id
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 获取歌词
export function getLyric (id) {
  let url = apiConfig.lyric + `?id=${id}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

/**
 * mv 评论
 * @param {*} id 必选参数, mv id
 * @param {*} limit 可选参数,取出评论数量 , 默认为 20
 * @param {*} offset 偏移数量,用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 */
export function getMVComment (id, limit, offset) {
  let url = apiConfig.MVComment + `?id=${id}&limit=${limit}&offset=${offset}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 获取 mv 数据
export function getMVDetail (id, limit, offset) {
  let url = apiConfig.MVDetail + `?mvid=${id}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 获取相似歌手
export function getMVSimi (id) {
  let url = apiConfig.MVSimi + `?mvid=${id}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 获取歌单详情
export function getMusicListDetail (id) {
  let url = apiConfig.musicListDetailPath + `?id=${id}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 推荐 mv
export function getMV () {
  let url = apiConfig.recommendMVPath
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 推荐歌单
export function getMusicList () {
  let url = apiConfig.recommendMusicListPath
  return axios.get(url).then(res => {
    return Promise.resolve(res.data.result)
  })
}

export function getSongListDesc (id) {
  let url = apiConfig.songListDesc + `?id=${id}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 独家放送
export function getPrivateContent () {
  let url = apiConfig.recommendPrivatePath
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}
// 最新音乐
export function getNewSong () {
  let url = apiConfig.newSong
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}
// 推荐电台
export function getDjProgram () {
  let url = apiConfig.DjProgram
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}
/**
 * 搜索
 * @param {*} keywords 必选参数，关键词
 * @param {*} type 搜索类型默认为 1 即单曲,
  *       取值意义: 1: 单曲 10: 专辑 100: 歌手
 *                 1000: 歌单 1002: 用户 1004: MV
 *                 1006: 歌词 1009: 电台
 * @param {*} limit 可选参数，返回数量，默认是30
 * @param {*} offset 可选参数， 用于分页，如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 */
export function getSearchSongs (keywords, page) {
  let url = apiConfig.search + `?keywords=${keywords}&offset=${page}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

export function getSearchSuggest (name) {
  let url = apiConfig.suggest + `?keywords=${name}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

export function getHotSearch () {
  let url = apiConfig.hotSearch
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 获取歌手专辑
export function getSingerAlbum (id) {
  let url = apiConfig.singerAlbum + `?id=${id}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 获取歌手描述
export function getSingerDesc (id) {
  let url = apiConfig.singerDesc + `?id=${id}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 获取歌手 mv
export function getSingerMV (id) {
  let url = apiConfig.singerMV + `?id=${id}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 获取歌手单曲
export function getSingerMusic (id) {
  let url = apiConfig.singerMusic + `?id=${id}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// mv 排行
export function getTopMV (limit = 30, offset = 0) {
  let url = apiConfig.topMV + `?limit=${limit}&offset=${offset}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 最新专辑
export function getNewAlbum (limit = 30, offset = 0) {
  // let url = apiConfig.newAlbum + `?limit=${limit}&offset=${offset}`
  let url = apiConfig.newAlbum
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 最新专辑
export function getPlayList (limit = 30, cat = '全部') {
  let url = `${apiConfig.playList}?limit=${limit}&cat=${cat}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 歌单分类
export function getCategoryList () {
  let url = apiConfig.categoryList
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 排行榜榜单
export function getRankList (index) {
  let url = `${apiConfig.rank}?idx=${index}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 是否有版权
export function isHasCopyright (index) {
  let url = `${apiConfig.copyright}?idx=${index}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 获取精品歌单highquality
export function getHighquality (limit = 30) {
  let url = `${apiConfig.highquality}?limit=${limit}`
  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}
