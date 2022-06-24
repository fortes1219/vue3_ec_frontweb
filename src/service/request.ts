import axios from 'axios'

export function request(config) {
  config.headers.token = !localStorage.getItem('userInfo')
    ? ''
    : JSON.parse(localStorage.getItem('userInfo') as string).token
  const service = axios.create({
    headers: config.headers,
    baseURL: import.meta.env.MODE === 'production' ? 'https://nocodenolife.net/fortes/' : '/api',
    timeout: 30000,
    // transformRequest: [
    //   (data: any) => {
    //     let ret = ''
    //     const tempData = getJwtData(data)
    //     for (const it in tempData) {
    //       ret += encodeURIComponent(it) + '=' + encodeURIComponent(tempData[it]) + '&'
    //     }
    //     return ret
    //   }
    // ]
    transformRequest: [
      (data = config.params) => {
        const tempData = getJwtData(JSON.stringify(data))
        return tempData.data
      }
    ]
  })
  const getJwtData = (data: any) => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const val = data[key]
        if (val === '' || val === undefined) {
          delete data[key]
        }
      }
    }
    const jwt = encodeURIComponent(btoa(encodeURIComponent(data)))
    return { data: jwt }
  }

  // request攔截
  service.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      console.log(error)
      Promise.reject(error)
    }
  )

  // response攔截
  service.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log('error', error)
      return Promise.reject(error)
    }
  )
  return service(config)
}
