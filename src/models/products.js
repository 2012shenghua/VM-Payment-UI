export default {
  namespace: 'products',
  state: {
      data: [{ name: 'dva', id: 1 },
      { name: 'antd', id: 2 },
      { name: 'antd1', id: 3 }
    ]},
  reducers: {
    delete(state, { payload: id }) {
    	console.log(state)
      return state.filter(item => item.id !== id);
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
  	*fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ 
	      	type: 'save',
	      	payload: {

	      	}
       });
    },
  }
};