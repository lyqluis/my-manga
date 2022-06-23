const DAY_REG = /天/
const HOUR_REG = /小时/
const MIN_REG = /分钟/


// todo 有 bug
// "update_time": "2天前",
// "update_time_UTC": 1655914830676
// "update_time": "4小时前",
// "update_time_UTC": 1655914113687

const nowTime = Date.now()

/**
 * @func: formate time
 * @param {String} time x天前 / xx小时前 / xx分钟前 / xxxx-xx-xx
 * @return {String|Number} UTC经过的毫秒数
 */
function formateDate(time, now = nowTime) {
  // console.log(time)
  let res
  if (DAY_REG.test(time)) { // x天前
    const day = time.replace(/\D/g, '')
    // console.log(day + 'day')
    res = now - 100 * 60 * 60 * 24 * day
  } else if (HOUR_REG.test(time)) {  // xx小时前
    const hour = time.replace(/\D/g, '')
    // console.log(hour + 'hour')
    res = now - 100 * 60 * 60 * hour
  } else if (MIN_REG.test(time)) {  // xx分钟前
    const min = time.replace(/\D/g, '')
    // console.log(min + 'min')
    res = now - 100 * 60 * min
  }
  else {  // xxxx-xx-xx
    // console.log('xxxx-xx-xx')
    res = new Date(time).valueOf()
  }
  // console.log(res)
  return res
}

module.exports = {
  formateDate,
}