const URL_REG = /http/

export function shortenDomain(domain) {
  if (URL_REG.test(domain)) {
    domain = domain.match(/\.(\w*)\.com/)[1]
  }
  return domain
}

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
