import React from 'react'
import { Input, Icon, Button } from 'antd';
import APP from '../../app.css'
class Index extends React.Component {

  render() {
    return (
      <div className={APP.login} style={{ background: '#f0f2f5' }}>
        <Input
          style={{ width: '200px' }}
          placeholder="用户名"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
        <Input
          style={{ width: '200px' }}
          placeholder="密码"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
        <Button type="primary">登录</Button>
      </div>
    )
  }
}
export default Index