import React from 'react'
import {DatePicker, Select, Input,Icon,Table} from 'antd';
import style from "./index.css";
import { connect } from 'dva';

const {RangePicker} = DatePicker;
const Option = Select.Option;
const Search = Input.Search;



class Index extends React.Component {


  render() {
    const { main } = this.props
    const { payInfo } = main
    const { dataInfo } = payInfo
    const dataSource = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }];


    const columns = [{
      title: '日期',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '金额',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '产品',
      dataIndex: 'address',
      key: 'address1',
    }
      , {
        title: '货道',
        dataIndex: 'address',
        key: 'address2',
      }
      , {
        title: '售货机',
        dataIndex: 'address',
        key: 'address3',
      }
      , {
        title: '支付渠道',
        dataIndex: 'address',
        key: 'address4',
      }
      , {
        title: '订单号',
        dataIndex: 'address',
        key: 'address5',
      }];
    return (
      <div>
        <div id={style.con} >
          <div className={style.topCon} >
            <div className={style.title}>日期范围</div>
            <RangePicker id={style.dateRange}/>
          </div>

          <div className={style.topCon}>
            <div className={style.title}>售货机</div>
            <Select className={style.select} defaultValue="lucy" >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </div>
          <div className={style.topCon}>
            <div className={style.title}>产品</div>
            <div >
            <Select className={style.select} defaultValue="lucy" >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
              <div style={{height:10}}></div>
            <Input  className={style.select} addonBefore={<Icon type="search" />} defaultValue="mysite" />
              <div style={{height:10}}></div>
            </div>
          </div>
        </div>

        <Table columns={columns} dataSource={dataSource} />


      </div>
    )
  }

}

function mapStateToProps(state) {
  return { main: state.main };
}
export default connect(mapStateToProps)(Index);
