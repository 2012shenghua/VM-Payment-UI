import React from 'react'
import {Layout, Menu, Icon, Form, Dropdown, Button, Card} from 'antd'
import MenuComponent from './components/Menu'
import {connect} from 'dva'
import style from './app.css'
import {footerText} from "./mainUti"
import {logPath} from "./mainUti";
import logo from "./assets/yay.jpg"
const {Header, Sider, Content, Footer} = Layout;
const logoStyle = {
  'height': '32px',
  'backgroundColor': 'rgba(255, 255, 255, .2)',
  'backgroundSize': 'cover',
  'margin': '16px',
  'backgroundImage':'url(' + logo + ')'
}
class Main extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  logout() {
    localStorage.removeItem("groupMsg");
    localStorage.removeItem("loginInfo");
    window.location.href = "/user/login";
  }
  changePW(){
    window.location.href = "/user/changePassword";
  }

  constructor() {
    super();
    const grounMsg = JSON.parse(localStorage.getItem("groupMsg"));
    this.username = grounMsg.userInfo.username;
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={this.logout}>退出登陆</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.changePW}>修改密码</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div style={{height: '100%'}}>
        <Layout style={{height: '100%'}}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div style={logoStyle}></div>
            <MenuComponent/>
          </Sider>
          <Layout style={{height: '100%'}}>
            <Header style={{background: '#fff', padding: 0}}>
              <Icon
                className={style.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div style={{float: "right", marginRight: "20px"}}>
                <Dropdown overlay={menu} placement="bottomCenter">
                  <a>
                    <Button>{this.username}<Icon type="down"/></Button>
                  </a>
                </Dropdown>
              </div>
              {/*<a onClick={this.logout} style={{float:"right",paddingRight:20}} >注销</a>*/}
            </Header>
            <Card style={{background: "transparent", border: "none"}}>
              <Content style={{
                // margin: '24px 16px',
                padding: 24, background: '#fff', minHeight: 380,
              }}
              >
                {this.props.children}
              </Content></Card>
            <Footer style={{textAlign: 'center'}}>
              {footerText}
            </Footer>
          </Layout>
        </Layout>
      </div>)
  }
}

export default connect(({Main}) => ({
  Main,
}))(Main);
