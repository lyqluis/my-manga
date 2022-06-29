const URL_REG = /http/

export function shortenDomain(domain) {
  if (URL_REG.test(domain)) {
    domain = domain.match(/\.(\w*)\.com/)[1]
  }
  return domain
}

// todo 区分打开pc版 / 移动版网页
export function openPage(source) {
  const { domain, url } = source
  let res
  if (URL_REG.test(source.url)) {
    res = source.url
  } else {
    res = domain.replace(/\/$/, '') + url.replace(/^[\/]|/, '/')
  }
  window.open(res)
}
