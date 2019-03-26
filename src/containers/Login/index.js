import React from 'react'
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import APP from '../../app.css'
import style from "./index.css"
import { connect } from 'dva';


let param = {"grant_type": "password",username:"",password:""};
let remember = {username:"",password:"",check:false};


 class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {

    if(remember.check == true){
      localStorage.setItem("remember",JSON.stringify(remember));
    }else{
      localStorage.removeItem("remember");
    }

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'main/getGroup',
          payload:{param:param}
        });
      }else{

      }
    });
  }

  handleUsername(e){
    // console.log(e.target.value)
    param.username = e.target.value;
    remember.username = e.target.value;
  }
   handlePassworld(e){
     param.password = e.target.value;
     remember.password = e.target.value;
   }
   handleCheck(e){
       remember.check = e.target.checked;
   }

   constructor(){
     super();
     let rememberTemp = JSON.parse(localStorage.getItem("remember"));
     if(rememberTemp){
       remember.check = rememberTemp.check
        if( remember.check){
          remember.username = rememberTemp.username;
          remember.password = rememberTemp.password;
          param.username = rememberTemp.username;
          param.password = rememberTemp.password;
        }
     }
 }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className={APP.login} >
        <div className={style.con}>
        <div className={style.logCon}>
          {/* <img src={require('./log.jpg')} className={style.log} alt="log"/> */}
          <h2 className={style.title}>VM Payment UI</h2>
        </div>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue:remember.username,
            rules: [{required: true, message: '请输入用户名!'}],
          })(
            <Input onChange={(e)=>this.handleUsername(e)} prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password',

            {
              initialValue:remember.password,
            rules: [{required: true, message: '请输入密码'}],
          })(
            <Input  onChange={(e)=>this.handlePassworld(e)} prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                   placeholder="密码"/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: remember.check,
          })(
            <Checkbox onChange={this.handleCheck}>记住密码</Checkbox>
          )}
          {/* <a className={style.register} href="">忘记密码</a> */}
          <Button type="primary" htmlType="submit" className={style.input}>
            登录
          </Button>
        {/* <a href="">现在注册!</a> */}
        </Form.Item>
      </Form>
        </div>
      </div>
    );
  }
}

const Index = Form.create({name: 'normal_login'})(NormalLoginForm);
// const Index = Form.create({name: 'normal_login'})(<NormalLoginForm dispatch={dispatch} />);
export default connect(({ Index }) => ({
  Index,
}))(Index);
