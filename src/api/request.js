import axios from 'axios'
const requests = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  timeout: 5000
})
requests.interceptors.request.use((config) => {
  if (localStorage.getItem('bstoken')) {
    config.headers.Authorization = localStorage.getItem('bstoken')
  }
  return config
})
requests.interceptors.response.use((res) => {
  return res.data
}, (err) => {
  return Promise.reject(new Error('失败:' + err.message))
})
export default requests
