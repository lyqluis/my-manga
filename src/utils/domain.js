const DOMAIN_MOBILE_PAGES = {
  dmzj: {
    originPc: 'http://manhua.dmzj.com/',
    pc: 'https://www.dmzj.com/info/',
    mobile: 'https://m.dmzj.com/info/'
  },
  manhuagui: {
    pc: 'https://www.manhuagui.com/comic/31550/',
    mobile: 'https://m.manhuagui.com/comic/31550/'
  }
}

const URL_REG = /http/
// safari 不支持正则断言
// https://blog.csdn.net/wts563540/article/details/123225559
// const DMZJ_REG = /(?<=\/)([\w\s]+)$/
const DMZJ_REG = /\/([\w\s]+)$/

import { isMobile } from './device'

export function openPage(source) {
  const { domain, url } = source
  let res
  if (URL_REG.test(url)) {  // dmzj
    const html = url.match(DMZJ_REG)[1].trim()
    console.log(url.match(DMZJ_REG))
    res = isMobile() ? DOMAIN_MOBILE_PAGES[domain].mobile + html + '.html' : url
  } else {  // manhuagui
    res = domain.replace(/\/$/, '') + url.replace(/^[\/]|/, '/')
    isMobile() && (res = res.replace(/www/, 'm'))
  }
  window.open(res)
}

export function shortenDomain(domain) {
  if (URL_REG.test(domain)) {
    domain = domain.match(/\.(\w*)\.com/)[1]
  }
  return domain
}