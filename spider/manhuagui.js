const axios = require('axios')
const cheerio = require('cheerio')
const HttpsProxyAgent = require('https-proxy-agent')
const { formateDate } = require('../utils/time')
const { manhuagui } = require('../user.config.json')
const { proxy } = require('../user.config.json')

// manhuagui 是直接服务器生成了带有数据的完整页面直接给到了前端
// const url = 'https://www.manhuagui.com/user/login' // 登录页面
// const url = 'https://www.manhuagui.com/tools/submit_ajax.ashx?action=user_login'


// 网站需要代理，无法直接访问
// 代理
const httpAgent = new HttpsProxyAgent(proxy)

// 获得所有页数
// 这个获得的订阅总数与实际有误差
// --function getSubNum() {
// --  axios({
// --    method: 'post',
// --    url: manhuagui_user_check,
// --    httpsAgent: httpAgent,  // 代理
// --    headers: {
// --      cookie: COOKIE,
// --    },
// --  }).then(res => {
// --    console.log(res.data)
// --  }).catch(err => console.log(err))
// --}
// --getSubNum()

// 获得订阅总数
const subs = {}
function getSubs(total, pageNum = 20) {
  const pages = Math.ceil(total / pageNum)
  return {
    total,
    allPages: pages,
  }
}

function getPageSubs(page = 1, cb) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: manhuagui.url_subscription + `/${page}`,
      httpsAgent: httpAgent,  // 需要代理
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        cookie: manhuagui.cookie,
      },
    }).then(res => {
      const html = res.data
      const $ = cheerio.load(html)

      // handle page num & subscripion num
      if (page === 1) {
        const subNum = $('.page-foot span').first().text().replace(/[^\d]/g, '')
        Object.assign(subs, getSubs(subNum))
      }

      const mangas = $('.dy_content_li').toArray()
      mangas.map((manga, i) => {
        const $ = cheerio.load(manga)
        const obj = {}
        obj.name = $('h3').text()
        obj.sources = []
        const m = obj.sources[0] = {}
        m.domain = manhuagui.url
        m.url = $('a').first().attr('href')
        m.id = $('a').last().attr('value')
        m.img = $('img').attr('src')
        m.latest = $('p em').first().text().trim()
        m.update_time = $('p em').first().next().text().trim() // !! 不同于dmzj
        m.update_time_UTC = formateDate(m.update_time)
        mangas[i] = obj
      })

      console.log(`get manhuagui ! total subs: ${subs.total}, current page: ${page}, total pages: ${subs.allPages}`)
      resolve(mangas)

    }).catch(err => console.log(err))
  })
}


async function getManhuaguiSubs() {
  return new Promise(async (resolve, reject) => {
    const mangas = await getPageSubs()
    for (let i = 2; i <= subs.allPages; i++) {
      // console.log(`next page`)
      const res = await getPageSubs(i)
      mangas.push(...res)
    }
    resolve(mangas)
  })
}

module.exports = {
  getManhuaguiSubs,
}
