import React from 'react'
import {
  Form, Icon, Input, Button, Checkbox,message,Modal
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
    const athis = this;
    this.props.form.validateFields((err, values) => {
      // alert(JSON.stringify(values));return;
      delete values.confirmPassword;
      if (!err) {
        this.props.dispatch({
          type: 'main/changePassworld',
          payload:{param:values},
          callback:function (res) {
            // alert(JSON.stringify(res))
            if(res && res.status) {
           const moda =  Modal.success({onOk:function () {
               //登录成功移除token修改登录密码
              let rememberTemp = JSON.parse(localStorage.getItem("remember"))
              if (rememberTemp) {
                  rememberTemp.password = values.newPassword;
              }
              localStorage.setItem("remember",JSON.stringify(rememberTemp));
              localStorage.removeItem("groupMsg");
              localStorage.removeItem("loginInfo");
               athis.props.dispatch({
                 type: 'main/redirectLogin'
               });


             },okText:"确认",content:"修改成功，请重新登录"});


            }else{
              message.error("修改密码失败")
            }
          }
        });
      }else{

      }
    });
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

 //比较两个密码
   validateToNextPassword = (e) => {
   const value = e.target.value;
     if (!value) {
      this.props.form.setFieldsValue({["confirmPassword"]:""})
     }


   }
   compareToFirstPassword = (rule, value, callback) => {
     const form = this.props.form;
     // console.log("confi",value, form.getFieldValue('newPassword'))
     if (value && value !== form.getFieldValue('newPassword')) {
       callback('两次密码输入不一致');
     } else {
       callback();
     }
   }

  render() {

    const {getFieldDecorator} = this.props.form;
    return (
      <div className={APP.login} >
        <div className={style.con}>
        <div className={style.logCon}>
          {/* <img src={require('./log.jpg')} className={style.log} alt="log"/> */}
          <h2 className={style.title}>修改密码</h2>
        </div>
      <Form onSubmit={this.handleSubmit} className="login-form">
        {/*<Form.Item>*/}
          {/*{getFieldDecorator('username', {*/}
            {/*initialValue:remember.username,*/}
            {/*rules: [{required: true, message: '请输入用户名!'}],*/}
          {/*})(*/}
            {/*<Input disabled="true" onChange={(e)=>this.handleUsername(e)} prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>*/}
          {/*)}*/}
        {/*</Form.Item>*/}
        <Form.Item>
          {getFieldDecorator('oldPassword',

            {
            rules: [{required: true, message: '请输入旧密码'}],
          })(
            <Input   prefix={<Icon type="unlock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                   placeholder="请输入旧密码"/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('newPassword',

            {
              rules: [{required: true, message: '请输入新密码'}],
            })(
            <Input onChange={this.validateToNextPassword}  prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                    placeholder="请输入新密码"/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirmPassword',

            {
              rules: [{required: true, message: '请再次输入新密码'},{
                validator: this.compareToFirstPassword
              }],
            })(
            <Input   prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                     placeholder="请再次输入新密码"/>
          )}
        </Form.Item>
        <Form.Item>
          {/* <a className={style.register} href="">忘记密码</a> */}
          <Button type="primary" htmlType="submit" className={style.input}>
            修改
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
