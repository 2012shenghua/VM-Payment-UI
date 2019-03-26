import {
  login, getGroup, getProductList,
  getMachineModelList,
  getSellMachineList, getPayInfoList, addProduct, addSellMachine, editProduct, delProduct
  , editSellMachine
} from '../services/request'
import {Modal,message} from 'antd'
import base64 from 'base-64'
import moment from "moment"

const login1 = async (params) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(params)
    }, 2000)
  })
}

const login2 = async () => {
  const result1 = await login1('login1')
  const result2 = await login1('login2')
  return (result1 + result2)
}

const header_params = (loginInfo) => {
  return {
    Authorization: `${loginInfo.token_type} ${loginInfo.access_token}`,
    'Content-Type': 'application/vnd.kii.QueryRequest+json'
  }
}

const addmachin_header_params = (loginInfo) => {
  // console.log(base64.encode(`3xr2fxuy9lpn:1122`))
  return {
    Authorization: base64.encode(`${loginInfo.token_type}:${loginInfo.access_token}`),
    'Content-Type': 'application/vnd.kii.ThingRegistrationAndAuthorizationRequest+json'
  }
}

const ediitProduct_header_params = (loginInfo) => {
  return {
    Authorization: `${loginInfo.token_type} ${loginInfo.access_token}`,
    // 'Content-Type': 'application/vnd.kii.QueryRequest+json',
    "X-HTTP-Method-Override": "PATCH"
  }
}
const delProduct_header_params = (loginInfo) => {
  return {
    Authorization: `${loginInfo.token_type} ${loginInfo.access_token}`
    // ,"If-Match": 1

  }
}
const headerSell = (loginInfo) => {
  return {
    Authorization: `${loginInfo.token_type} ${loginInfo.access_token}`,
    'Content-Type': 'application/vnd.kii.ThingQueryRequest+json'
  }
}

function loginSuccess({loginInfo, groupMsg}) {
  localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
  localStorage.setItem("groupMsg", JSON.stringify(groupMsg));
  window.location.href = "/productInfo"
}

function getLoginInfo() {
  let loginInfo = JSON.parse(localStorage.getItem("loginInfo"))
  let groupMsg = JSON.parse(localStorage.getItem("groupMsg"))
  if (loginInfo && groupMsg) {
    return {loginInfo, groupMsg};
  } else {

    return null;
  }
}

export default {
  namespace: 'main',
  state: {
    num: 3,
    USER_ID: '966300e36100-336a-8e11-538f-0db9ba07',
    groupMsg: {},
    isLog: false,
    productInfo: {
      dataInfo: []
    },
    addProductInfo: {
      dataInfo: [],
      success: false
    },
    sellMachineInfo: {
      dataInfo: []
    },
    payInfo: {
      dataInfo: []
    },
    machineModelInfo: [],
    productSearchText: "",
    sellmachineSearchText: ""
  },
  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      history.listen(location => {

        let info = getLoginInfo();
        if (info) {
          dispatch({
            type: 'getStorage',
            payload: info
          });
        } else if (window.location.pathname != "/user/login") {
          window.location.href = "/user/login"
          return;
        }
        if (location.pathname === '/productInfo') {
          dispatch({
            type: 'getProductList',
          })
        }
        if (location.pathname === '/sellMachine') {
          dispatch({
            type: 'getSellMachineList'
          })
        }
        if (location.pathname === '/payInfo') {
          const param = {//支付信息默认当天
            "bucketQuery": {
              "clause": {
                "type": "and",
                "clauses": [{"type": "eq", "field": "status", "value": "success"},
                  {
                    "type": "range",
                    "field": "_created",
                    "upperLimit": moment().endOf("day").valueOf(),
                    "upperIncluded": true,
                    "lowerLimit": moment().startOf("day").valueOf(),
                    "lowerIncluded": true
                  }
                ]
              },
              "descending": true, "orderBy": "_created"
            },
            "bestEffortLimit": 200
          };
          dispatch({
            type: 'getPayInfoList',
            payload: {param: param}
          })
          dispatch({
            type: 'getProductList',
          })
          dispatch({
            type: 'getSellMachineList'
          })
        }

      });
    },
  },
  reducers: {
    getStorage(state, action) {
      // alert(JSON.stringify({ ...state, ...action.payload }))
      return {...state, ...action.payload};
    },
    save(state, action) {
      // console.log(state)
      return {...state, ...action.payload};
    },
    login(state, action) {
      // alert(JSON.stringify(state)+"分割"+JSON.stringify(action))
      return {...state, ...action.payload};
    }

  },

  effects: {
    // *login({ payload }, { call, put, select }) {  // eslint-disable-line
    //   const params = {
    //     "grant_type": "password",
    //     "username": "juice_member1",
    //     "password": "123123"
    //   }
    //   const result = yield call(login, params)
    //   yield put({
    //     type: 'save',
    //     payload: {
    //       USER_ID: result.id,
    //       isLog: true
    //     }
    //   })
    // },
    * getGroup({payload, after}, {call, put, select}) {  // eslint-disable-line

      const params = payload.param;//输入的参数
      let loginInfo = yield call(login, params)
      loginInfo = loginInfo
      if (!loginInfo) {
        Modal.error({content: '用户名或密码输入有误'});
        return
      }
      const params1 = {
        is_member: loginInfo.id
      }
      const Authorization = 'Bearer ' + loginInfo.access_token
      const groupMsg = yield call(getGroup, params1, {Authorization, 'Content-Type': 'application/json'})
      yield put({
        type: 'save',
        payload: {
          loginInfo,
          groupMsg: groupMsg.groups[0]
        }
      })
      groupMsg.groups[0].userInfo = params;
      loginSuccess({loginInfo, groupMsg: groupMsg.groups[0]})

      // yield put({
      //   type: 'getProductList',
      // })
      // yield put({
      //   type: 'getSellMachineList',
      // })
      // yield put({
      //   type: 'getPayInfoList',
      // })
    },
    // 产品信息列表
    * getProductList({payload}, {call, put, select}) {
      const loginInfo = yield select(state => state.main.loginInfo)
      const groupMsg = yield select(state => state.main.groupMsg)
      const productInfo = yield select(state => state.main.productInfo)
      const Authorization = 'Bearer ' + loginInfo.access_token
      const api_params = '/' + groupMsg.groupID + '/buckets/product/query'

      const params = {
        "bucketQuery": {
          "clause": {
            "type": "all"
          },
          "orderBy": "name",
          "descending": false
        },
        "bestEffortLimit": 200
      }

      const result = yield call(getProductList, api_params, params, header_params(loginInfo))
      productInfo.dataInfo = result
      yield put({
        type: 'save',
        payload: {
          productInfo
        }
      })
    },
    // 创建产品
    * addProduct({payload, callback}, {call, put, select}) {
      const loginInfo = yield select(state => state.main.loginInfo)
      const groupMsg = yield select(state => state.main.groupMsg)
      const addProductInfo = yield select(state => state.main.addProductInfo)
      const Authorization = 'Bearer ' + loginInfo.access_token
      const api_params = '/' + groupMsg.groupID + '/buckets/product/objects'
      const params = payload;
      const data = yield call(addProduct, api_params, params, header_params(loginInfo))
      if(!data){
        message.error("添加失败")
      }
      if (!data || !data.objectID) return;

      callback();//回调影藏控件
    },
    // 删除产品
    * delProduct({payload, callback}, {call, put, select}) {
      const loginInfo = yield select(state => state.main.loginInfo)
      const groupMsg = yield select(state => state.main.groupMsg)
      const addProductInfo = yield select(state => state.main.addProductInfo)
      const Authorization = 'Bearer ' + loginInfo.access_token
      const api_params = '/' + groupMsg.groupID + '/buckets/product/objects'
      const params = payload;
      const data = yield call(delProduct, api_params, params, header_params(loginInfo))
      if (!data || !data.objectID) return;

      callback();//回调影藏控件
    },
    // 编辑产品
    * editProduct({payload, callback}, {call, put, select}) {
      const loginInfo = yield select(state => state.main.loginInfo)
      const groupMsg = yield select(state => state.main.groupMsg)
      const addProductInfo = yield select(state => state.main.addProductInfo)
      const Authorization = 'Bearer ' + loginInfo.access_token
      const api_params = '/' + groupMsg.groupID + '/buckets/product/objects/' + payload.productId
      const params = payload.values;
      const data = yield call(editProduct, api_params, params, ediitProduct_header_params(loginInfo))
      if(!data){
        message.error("编辑失败")
      }
      if (!data || !data._version) return;
      callback();//回调影藏控件
    },
    * getSellMachineList({payload}, {call, put, select}) {


      const loginInfo = yield select(state => state.main.loginInfo)
      addmachin_header_params(loginInfo)
      const groupMsg = yield select(state => state.main.groupMsg)
      const sellMachineInfo = yield select(state => state.main.sellMachineInfo)
      const api_params = 'things/query'
      const params = {
        "thingQuery": {
          "clause": {
            "type": "contains",
            "field": "groupOwners",
            "value": groupMsg.groupID
          }
        }
      }
      const result = yield call(getSellMachineList, api_params, params, headerSell(loginInfo))
      sellMachineInfo.dataInfo = result.reverse();

      const paramsM = {
        "bucketQuery": {
          "clause": {
            "type": "all"
          },
          "orderBy": "name",
          "descending": false
        },
        "bestEffortLimit": 200
      }
      const apiM = '/' + groupMsg.groupID + '/buckets/machine_model/query'
      const machineModelInfo = yield call(getMachineModelList, apiM, paramsM, header_params(loginInfo))
      yield put({
        type: 'save',
        payload: {
          sellMachineInfo,
          machineModelInfo
        }
      })
    },
    // 创建售货机
    * addSellMachine({payload, callback}, {call, put, select}) {
      const loginInfo = yield select(state => state.main.loginInfo)
      const groupMsg = yield select(state => state.main.groupMsg)
      const addProductInfo = yield select(state => state.main.addProductInfo)
      const Authorization = 'Bearer ' + loginInfo.access_token
      const api_params = 'things'
      // const params = payload;
      const params = payload;
      const data = yield call(addSellMachine, api_params, params, {
        "Content-Type": "application/vnd.kii.ThingRegistrationAndAuthorizationRequest+json",
        "Authorization": Authorization
      });
      if(!data){
        message.error("添加失败")
      }
      if (data) {

        //添加售货机到group
        const api_params2 = "things/" + data._thingID + "/ownership";
        const params2 = {
          "groupID": groupMsg.groupID,
          "thingPassword": params._password
        }
        // https://api-cn3.kii.com/api/apps/3xr2fxuy9lpn/things/th.222300e36100-7de9-9e11-1f74-36af8ae8/ownership
        const data2 = yield call(addSellMachine, api_params2, params2, {
          "Content-Type": "application/vnd.kii.ThingOwnershipRequest+json",
          "Authorization": Authorization
        });
        callback();
      }//if data

    },
    // 修改创建售货机
    * editSellMachine({payload, callback}, {call, put, select}) {
      const loginInfo = yield select(state => state.main.loginInfo)
      const groupMsg = yield select(state => state.main.groupMsg)
      const addProductInfo = yield select(state => state.main.addProductInfo)
      const Authorization = 'Bearer ' + loginInfo.access_token
      const api_params = 'things/' + payload._thingID;
      // const params = payload;
      const params = {_thingType: payload.values._thingType};
      const data = yield call(editSellMachine, api_params, params, {
        "Content-Type": "application/vnd.kii.ThingUpdateRequest+json",
        "Authorization": Authorization
      });
      callback();
    },
    // 支付信息
    * getPayInfoList({payload}, {call, put, select}) {
      // console.log(JSON.stringify(payload))
      const loginInfo = yield select(state => state.main.loginInfo)
      const groupMsg = yield select(state => state.main.groupMsg)
      const payInfo = yield select(state => state.main.payInfo)
      const Authorization = 'Bearer ' + loginInfo.access_token
      const api_params = '/' + groupMsg.groupID + "/buckets/payment_order/query";
      let params = {
        "bucketQuery": {
          "clause": {
            "type": "eq", "field": "status", "value": "success"
          },
          "descending": true, "orderBy": "_created"
        }
      }
      if (payload && payload.param) {
        params = payload.param;
      }

      const result = yield call(getPayInfoList, api_params, params, header_params(loginInfo))
      // console.log(JSON.stringify(result));
      payInfo.dataInfo = result
      yield put({
        type: 'save',
        payload: {
          payInfo
        }
      })
    }//end
  }
};
