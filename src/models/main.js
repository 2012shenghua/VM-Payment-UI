
import { login, getGroup, getProductList, 
  getMachineModelList,
  getSellMachineList } from '../services/request'

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
const headerSell = (loginInfo) => {
  return {
    Authorization: `${loginInfo.token_type} ${loginInfo.access_token}`,
    'Content-Type': 'application/vnd.kii.ThingQueryRequest+json'
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
    sellMachineInfo: {
      dataInfo: []
    },
    machineModelInfo: []
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(location => {
        if (location.pathname === '/productInfo') {
          dispatch({
            type: 'getGroup',
          })
        }
        if (location.pathname === '/sellMachine') {
          dispatch({
            type: 'getGroup'
          })
        }
      });
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  effects: {
    *login({ payload }, { call, put, select }) {  // eslint-disable-line
      const params = {
        "grant_type": "password",
        "username": "juice_member1",
        "password": "123123"
      }
      const result = yield call(login, params)
      yield put({
        type: 'save',
        payload: {
          USER_ID: result.id,
          isLog: true
        }
      })
    },
    *getGroup({ payload, after }, { call, put, select }) {  // eslint-disable-line
      const params = {
        "grant_type": "password",
        "username": "juice_member1",
        "password": "123123"
      }
      const loginInfo = yield call(login, params)
      const params1 = {
        is_member: loginInfo.id
      }

      const Authorization = 'Bearer ' + loginInfo.access_token
      const groupMsg = yield call(getGroup, params1, { Authorization, 'Content-Type': 'application/json' })
      yield put({
        type: 'save',
        payload: {
          loginInfo,
          groupMsg: groupMsg.groups[0]
        }
      })
      yield put({
        type: 'getProductList',
      })
      yield put({
        type: 'getSellMachineList',
      })
    },
    // 产品信息列表
    *getProductList({ payload }, { call, put, select }) {
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
    *getSellMachineList({ payload }, { call, put, select }) {
      const loginInfo = yield select(state => state.main.loginInfo)
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
      sellMachineInfo.dataInfo = result

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
  },
};
