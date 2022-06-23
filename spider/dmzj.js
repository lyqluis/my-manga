const axios = require('axios')
const cheerio = require('cheerio')
const { formateDate } = require('../utils/time')
const { dmzj } = require('../user.config.json')


const COOKIE = dmzj.cookie


// 获取 dmzj 的所有订阅
function getDMZJSubs() {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: dmzj.url,
      data: 'page=1&type_id=1&letter_id=0&read_id=1', // dmzj 一次请求返回全部数据，无需翻页
      headers: {
        'x-requested-with': 'XMLHttpRequest',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        cookie: COOKIE,
      },
    }).then(res => {
      const html = res.data
      const $ = cheerio.load(html)
      const mangas = $('.dy_content_li').toArray()
      mangas.map((manga, i) => {
        const $ = cheerio.load(manga)
        const obj = {}
        obj.name = $('h3').text()
        obj.sources = []
        const m = obj.sources[0] = {}
        m.domain = 'dmzj'
        m.url = $('a').first().attr('href')
        m.id = $('a').last().attr('value')
        m.img = $('img').attr('src')
        m.latest = $('p em').first().text().trim()
        m.update_time = $('p em').last().text().trim()
        m.update_time_UTC = formateDate(m.update_time)
        mangas[i] = obj
      })

      console.log('get dmzj manga list!')
      resolve(mangas)

    }).catch(err => console.log(err))
  })
}

const dmzj_search = dmzj.url_search

// 返回从 dmzj 找到的漫画对象
function searchManga(name) {
  return new Promise((resolve, reject) => {
    axios.get(dmzj_search + encodeURIComponent(name)).then(res => {
      // console.log(res.data)
      let data = res.data.replace(/^var\s*\w*\s*\= /, '')
      data = data.replace(/\;/, '')
      data = JSON.parse(data)
      if (!data.length) {
        console.log('not found target manga!')
        return
      }
      const manga = data.find(m => m.comic_name === name)
      console.log(manga)
      resolve(manga)
    })
  })
}


// 搜索漫画并更新本地信息
// searchManga('中禅寺老师的灵怪讲义实录')
//   .then(manga => updateManga(manga,{
//     id: 'id',
//     name: 'comic_name',
//     latest: 'last_update_chapter_name',
//   }))

module.exports = {
  getDMZJSubs,
}