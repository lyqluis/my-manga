import axios from 'axios'

const $axios = axios.create({
  timeout: 60 * 1000,
  baseURL: '/api'
})

export function getMangas() {
  return $axios({
    method: 'get',
    url: 'https://my-manga-server.vercel.app/api'
  }).then(res => res.data.data)
}

export default $axios