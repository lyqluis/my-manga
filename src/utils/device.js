const MOBILE_REG = /mobile/

export const isMobile = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  const res = MOBILE_REG.test(userAgent)
  console.log('is mobile: ', res);
  return res
}

const pageInfo = {
  cols: 5,
  rows: 2,
  paginationSize: 20
}

function handlePageSize(page) {
  const screenWidth = window.innerWidth
  console.log('screen width: ', screenWidth)
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
  handlePageSize(page)
  return page
}