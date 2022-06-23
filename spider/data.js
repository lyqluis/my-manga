// handle data in manga.json
const MANGAS = require('../manga.json')
const fs = require('fs')

let id = 0

const mangaObj = {
  name: String,
  author: [String],
  img: String,
  id: Number, // 本地唯一id
  sources: [{
    domain: String,
    id: Number | String,
    latest: String,
    update_time: String,
    update_time_UTC: Number | String,
    url: String,
    img: String,
  },
  { /* ... */ },
  ]
}

function findManga(key, val, list = MANGAS) {
  return list.find(m => m[key] === val)
}


/**
 * @func: 
 * @param {mangaObj} manga
 */
function updateManga(manga, list = MANGAS, writable) {
  const target = findManga('name', manga.name, list)
  // 更新已有漫画
  if (target) {
    // 更新漫画源
    updateMangaSource(manga, target, list, writable)
  } else {
    // 添加新漫画
    addManga(manga, list, writable)
  }
}

/**
 * @func: 添加新漫画
 * @param {mangaObj} manga
 */
function addManga(manga, list = MANGAS, writable) {
  if (findManga('name', manga.name, list)) return
  list.push(manga)
  writable && fs.writeFileSync('manga.json', JSON.stringify(list), 'utf8')
  console.log(`manga ${manga.name} is added!`)
}

/**
 * @func: 更新漫画源
 * @param {mangaObj} manga
 */
function updateMangaSource(manga, target, list = MANGAS, writable) {
  if (target) {
    const source = manga.sources[0]
    const localSource = target.sources.find(s => s.domain === source.domain)
    // 添加新源
    if (!localSource) {
      target.sources.push(source)
      console.log(`manga ${manga.name} - ${source.domain} added!`)
    } else {
      // 更新漫画源
      Object.assign(localSource, source)
      console.log(`manga ${manga.name} - ${source.domain} updated!`)
    }
    // 排序所有源的更新时间戳
    sortSource(target.sources)
    writable && fs.writeFileSync('manga.json', JSON.stringify(list), 'utf8')
  }
}

function coverAllIds(list = MANGAS, writable) {
  console.log(`###### start writing all subs id! ######`)
  list.map(m => {
    m.id = ++id
  })
  writable && fs.writeFileSync('manga.json', JSON.stringify(list), 'utf8')
  console.log(`add all subs id finished!`)
}

function addId(list = MANGAS) {
  return list.length + 1
}

// 排序所有漫画更新时间，最近更新 -> 最旧更新
function sortAllSubs(list = MANGAS) {
  console.log(`###### start sorting all subs! ######`)
  list.sort((a, b) => b.sources[0].update_time_UTC - a.sources[0].update_time_UTC)
  console.log(`sort all subs finished!`)
}

// 排序源的更新时间，最近更新 -> 最旧更新
function sortSource(sources) {
  sources.sort((a, b) => b.update_time_UTC - a.update_time_UTC)
}

module.exports = {
  findManga,
  addId,
  coverAllIds,
  addManga,
  updateMangaSource,
  updateManga,
  sortAllSubs,
}