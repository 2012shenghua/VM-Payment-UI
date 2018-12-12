
import { login } from '../services/request'

const login1 = async (params) => {
  return await new Promise((resolve,reject) => {
    setTimeout(()=> {
      reject(params)
    },2000)
  })
}

const login2 = async () => {
  const result1 = await login1('login1')
  console.log(result1)
  const result2 = await login1('login2')
  console.log(result2)
  return (result1+result2)
}

export default {
  namespace: 'main',
  state: {
  	num: 3
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(location => {
        if (location.pathname === '/productInfo') {
          dispatch({
            type: 'login'
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
      const result = yield call (login)
      console.log(result)
    }

    // *add({ payload }, { call, put, select }) {  // eslint-disable-line
    // 	const num = yield select(state => state.exp.num)
    // 	const num1 = yield call(()=>hehe(num))
    // 	yield put({
    // 		type: 'save',
    // 		payload: {
    // 			num: num1
    // 		}
    // 	})
    // },
  },
};
