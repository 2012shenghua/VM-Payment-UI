import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import MenuComponent from './components/Menu'
import style from './app.css'
const { Header, Sider, Content, Footer } = Layout;
class Main extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
          <Layout style={{ height: '100%' }}>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div className={style.logo} />
              <MenuComponent />
            </Sider>
            <Layout style={{ height: '100%' }}>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className={style.trigger}
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Header>
              <Content style={{
                margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
              }}
              >
                {this.props.children}
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
          </Footer>
            </Layout>
          </Layout>
      </div>)
  }
}

export default Main