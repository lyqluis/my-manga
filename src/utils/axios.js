import axios from 'axios'

const $axios = axios.create({
  timeout: 60 * 1000,
  baseURL: 'https://manga.thisisluis.top'
})

export function getMangas() {
  return $axios({
    method: 'get',
    url: '/api'
  }).then(res => res.data.data)
}

export default $axios