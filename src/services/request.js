import API from './api'
import {getRequest, postRequestPre, postRequest, sendPost} from './index'

export const login = async (params) => {
  return postRequestPre(API.login, params)
    .then(res => res.data)
}

export const getGroup = async (params, header) => {
  return getRequest(API.groups, params, header)
    .then(res => res.data)
}

export const getProductList = async (api, params, header) => {
  return sendPost(API.groups + api, params, header)
    .then(res => res.data.results)
}
export const getSellMachineList = async (api, params, header) => {
  return sendPost(API.REQUEST_URL + api, params, header)
    .then(res => res.data.results)
}

export const getMachineModelList = async (api, params, header) => {
  return sendPost(API.groups + api, params, header)
    .then(res => res.data.results)
}