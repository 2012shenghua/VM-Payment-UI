import API from './api'
import {getRequest} from './index'

export const login = async (params) => {
  return getRequest(API.login)
    .then(res => res)
}