
import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router';

const menuList = [{
  type: 'home',
  title: '产品信息',
  link: '/productInfo'
}, {
  type: 'hdd',
  title: '售货机',
  link: '/sellMachine'
}, {
  type: 'pay-circle',
  title: '支付信息',
  link: '/payInfo'
}, {
  type: 'line-chart',
  title: '月度报表',
  link: '/monthDiagram'
}]

class MenuComponent extends React.Component {
  menuListFunc = () => {
    return menuList.map((m, index) => {
      return (<Menu.Item key={index}>
        <Link to={m.link}>
          <Icon type={m.type} />
          <span>{m.title}</span>
        </Link>
      </Menu.Item>)
    })
  }
  render() {
    return (
      <div>
        <Menu theme="dark" mode="inline" >
          {this.menuListFunc()}
        </Menu>
      </div>
    )
  }

}
export default MenuComponent
