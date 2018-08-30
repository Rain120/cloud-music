export default class Song {
  constructor ({id, singer, name, album, picUrl, playUrl, dt}) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.picUrl = picUrl
    this.playUrl = playUrl
    this.dt = dt
  }
}

export function createSong (music) {
  // console.log(music)
  return new Song({
    id: music.id,
    singer: music.ar[0].name,
    name: music.name,
    album: music.al.name,
    picUrl: music.al.picUrl,
    playUrl: `http://music.163.com/song/media/outer/url?id=${music.id}.mp3`,
    dt: music.dt
  })
}

function singerName (arr) {
  let name = []
  name = arr.map((item) => {
    return item.name
  })

  return name.join('/')
}

export function createRecommendSong (music) {
  return new Song({
    id: music.id,
    singer: singerName(music.song.artists),
    name: music.name,
    album: music.song.album.name,
    picUrl: music.song.album.picUrl
  })
}

export function createRecommendListSong (music) {
  return new Song({
    id: music.id,
    singer: singerName(music.artists),
    name: music.name,
    album: music.album.name,
    picUrl: music.album.picUrl
  })
}

export function createSearchSong (music) {
  return new Song({
    id: music.id,
    singer: singerName(music.artists),
    name: music.name,
    album: music.album.name
  })
}
