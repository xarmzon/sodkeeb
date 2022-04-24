import axios from 'axios'

const api = axios.create()

api.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3000/api/'

api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user')

  if (user) {
    const userObj = JSON.parse(user)
    const token = userObj?.token || ''
    if (token) {
      if (config.headers) config.headers['Authorization'] = `Bearer ${token}`
      else
        config.headers = {
          authorization: `Bearer ${token}`,
        }
    }
  }
  //console.log(config)
  return config
})

api.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default api

export const swrFetcher = async (url: any, init: any) => {
  const res = await api.get(url)
  return res.data
}
