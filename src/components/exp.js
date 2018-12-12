
import React from 'react'
import {connect} from 'dva'
import { Table, Popconfirm, Button } from 'antd';
class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  click = () => {
  	this.props.dispatch({type: 'exp/add',payload:{haha:1}})
  }
  render() {
  	const load = this.props.loading.effects['exp/add']
  	console.log(load)

  	return (
  		<div>
  			<Button onClick={()=>this.click()} type={'primary'}>点击加</Button>
  			<p >{this.props.num}</p>
  		</div>
  	)
  }
 }


const wapIndex = connect((state )=>({
	num: state.exp.num,
	exp: state.exp,
	loading: state.loading
}))(Index)

 export default wapIndex 