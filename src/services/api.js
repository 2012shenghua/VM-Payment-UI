import {REQUEST_URL} from '../common/config'

const API = {
  login: REQUEST_URL+'oauth2/token',// 登录
  groups:  REQUEST_URL+'groups',
  REQUEST_URL: REQUEST_URL
}

export default API