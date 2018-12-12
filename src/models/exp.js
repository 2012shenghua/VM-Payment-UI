
const hehe = async (num) => {
	// setTimeout(()=>{
	// },1000)
	num++
	return num
};

export default {

  namespace: 'exp',

  state: {
  	num: 3
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  effects: {
    *add({ payload }, { call, put, select }) {  // eslint-disable-line
    	const num = yield select(state => state.exp.num)
    	const num1 = yield call(()=>hehe(num))
    	yield put({
    		type: 'save',
    		payload: {
    			num: num1
    		}
    	})
    },
  },
};
