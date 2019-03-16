import API from './api'
import {getRequest, postRequestPre, postRequest, sendPost,sendPatch} from './index'

export const login = async (params) => {
  return postRequestPre(API.login, params)
    .then(res => res.data).catch(err => {console.log(err)})
}

export const getGroup = async (params, header) => {
  return getRequest(API.groups, params, header)
    .then(res => res.data)
}

export const getProductList = async (api, params, header) => {
  return sendPost(API.groups + api, params, header)
    .then(res => res.data.results)
}

export const addProduct = async (api, params, header) => {
  return sendPost(API.groups + api, params, header)
    .then(res => res.data)
}
export const delProduct = async (api, params, header) => {
  return sendPost(API.groups + api, params, header)
    .then(res => res.data)
}
export const editProduct = async (api, params, header) => {
  return sendPost(API.groups + api, params, header)
    .then(res => res.data)
}
export const addSellMachine = async (api, params, header) => {
  return sendPost(API.REQUEST_URL + api, params, header)
    .then(res => res.data)
}

export const editSellMachine = async (api, params, header) => {
  return sendPatch(API.REQUEST_URL + api, params, header)
    .then(res => res.data)
}
export const getSellMachineList = async (api, params, header) => {
  return sendPost(API.REQUEST_URL + api, params, header)
    .then(res => res.data.results)
}

export const getMachineModelList = async (api, params, header) => {
  return sendPost(API.groups + api, params, header)
    .then(res => res.data.results)
}
// 支付信息
export const getPayInfoList = async (api, params, header) => {
  return sendPost(API.groups + api, params, header)
    .then(res => res.data.results)
}
