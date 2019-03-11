
import React from 'react'
import { Breadcrumb, Icon, Table } from 'antd'
import { connect } from 'dva';

class Index extends React.Component {

  render() {
    const { main } = this.props
    const { productInfo } = main
    const { dataInfo } = productInfo
    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 500,
      sorter(a, b) {
        return a.id.length - b.id.length
      }
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '售价',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price
    }, {
      title: '成本',
      dataIndex: 'cost',
      key: 'cost',
      sorter: (a, b) => a.cost - b.cost
    }];
    const dataSource = dataInfo.map((item, index) => {
      return {
        key: index,
        id: item._id,
        name: item.name,
        price: item.price,
        cost: item.cost,
      }
    })

    return (
      <div>
        <Breadcrumb style={{marginBottom: 10}}>
          <Breadcrumb.Item>产品信息</Breadcrumb.Item>
        </Breadcrumb>
        <Table pagination={{pageSize:5}} columns={columns} dataSource={dataSource} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { main: state.main };
}
export default connect(mapStateToProps)(Index);
