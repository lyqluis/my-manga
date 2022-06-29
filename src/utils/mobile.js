const MOBILE_REG = /mobile/

const pageInfo = {
  isMobile: false,
  cols: 5,
  rows: 2,
  paginationSize: 20
}

function handleUserAgent(page) {
  const userAgent = navigator.userAgent.toLowerCase()
  MOBILE_REG.test(userAgent) && (page.isMobile = true)
}

function handlePageSize(page) {
  const screenWidth = window.innerWidth
  console.log(screenWidth)
  if (screenWidth <= 500) {
    page.cols = 2
    page.paginationSize = 5
  } else if (screenWidth < 800) {
    page.cols = 3
    page.paginationSize = 10
  } else if (screenWidth < 1024) {
    page.cols = 4
    page.paginationSize = 10
  }
}

export function handlePageInfo(page = pageInfo) {
  handleUserAgent(page)
  handlePageSize(page)
  return page
}



