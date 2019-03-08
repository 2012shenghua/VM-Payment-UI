import React from 'react'
import {Input, Icon, Button, Row, Col, Checkbox} from 'antd';
import APP from '../../app.css'
import style from "./index.css"
import log from "./log.jpg"
class Index extends React.Component {
  handleClick(){
    alert("登陆")

  }
  registerClick(){
      alert("注册")
  }
  render() {
    return (
      <div className={APP.login} style={{background: '#f0f2f5'}}>
        <div className={style.con}>
          <div className={style.logCon}>
            <img src={log} className={style.log} alt="log"/>
            <h2 className={style.title}>这是一个标题</h2>
          </div>
          <Row>
            <Col>
              <Input

                className={[style.input,style.userName]}
                placeholder="用户名"
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                className={style.input}
                placeholder="密码"
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
              />
            </Col>
          </Row>
          <div className={style.bottomCon}>
          <Checkbox>记住密码</Checkbox>
            <span onClick={this.registerClick} className={style.register}>注册账户</span>
          </div>
          <Button
            onClick = {this.handleClick}
            className={style.input}
            type="primary">登录</Button>
        </div>
      </div>
    )
  }
}

export default Index
