const fs = require('fs')
const path = require('path')
const { updateManga, coverAllIds, sortAllSubs } = require('./data.js')
const { getDMZJSubs } = require('./dmzj')
const { getManhuaguiSubs } = require('./manhuagui')

const SUBS = require('../manga.json') || []

const axiosArr = [getDMZJSubs, getManhuaguiSubs]

async function getAllSubs(subs) {
  console.log(`###### start getting all subs! ######`)
  for (const sub of subs) {
    const mangas = await sub()
    mangas.forEach(manga => {
      updateManga(manga, SUBS)
    })
  }
  console.log(`get all subs finished!`)
}


async function getData() {
  await getAllSubs(axiosArr)  // 获取所有订阅
  coverAllIds(SUBS) // 覆写所有id
  sortAllSubs(SUBS) // 排序更新时间，最新更新 -> 最旧更新

  // finally write in the json file at once
  const file = path.resolve(__dirname, '../manga.json')
  fs.writeFileSync(file, JSON.stringify(SUBS), 'utf8')
}

getData()
// console.log(__dirname)