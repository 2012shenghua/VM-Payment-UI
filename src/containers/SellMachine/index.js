import React from 'react'
import { Breadcrumb, Icon, Table } from 'antd'
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment' 
class Index extends React.Component {

  render() {
    const { main } = this.props
    const { sellMachineInfo, machineModelInfo } = main
    const { dataInfo } = sellMachineInfo
    const machineObj = {}
    machineModelInfo.forEach(e => {
      dataInfo.forEach(_ => {
        if (_._thingType === e._id) {
          machineObj[_._thingType] = {
            ...e
          }
        }
      })
    });
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
      title: '售货机型号',
      dataIndex: 'model',
      key: 'model'
    }, {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => a.time - b.time,
      render(value, rowData) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
      },
    }];
    const dataSource = dataInfo.map((item, index) => {
      const model = Object.keys(machineObj).length > 0 ? machineObj[item._thingType].name : ''
      return {
        key: index,
        id: item._thingID,
        name: item._vendorThingID,
        model,
        time: item._created,
      }
    })

    return (
      <div>
        <Breadcrumb style={{marginBottom: 10}}>
          <Breadcrumb.Item>售货机</Breadcrumb.Item>
        </Breadcrumb>
        <Table pagination={{pageSize:1}}
               columns={columns} dataSource={dataSource} />
      </div>

    )
  }

}
function mapStateToProps(state) {
  return { main: state.main };
}
export default connect(mapStateToProps)(Index);
