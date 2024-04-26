import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config"

class HYRequest {
  constructor(baseURL, timeout) {
    this.instance = axios.create({
      // baseURL,
      timeout,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    })

    this.instance.interceptors.request.use((config) => {
      if (localStorage.getItem("token")) {
        // token
        config.headers['token'] = localStorage.getItem("token")
      }
      return config
    }, err => {
      return err
    })

    this.instance.interceptors.response.use((res) => {
      return res.data
    }, err => {
      return err
    })
  }

  request(config) {
    return this.instance.request(config)
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}


export default new HYRequest(BASE_URL, TIMEOUT)

