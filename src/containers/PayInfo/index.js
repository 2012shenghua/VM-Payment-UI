import React from 'react'
import {DatePicker, Select, Input, Icon, Table, Button} from 'antd';
import style from "./index.css";
import {connect} from 'dva';
import moment from "moment";

const {RangePicker} = DatePicker;
const Option = Select.Option;
const Search = Input.Search;

let inputData = {};
class Index extends React.Component {
  dateChange(date, dateString) {


  }
  productChange(value){

    inputData.product = value;

  }

  machinChange(value){

    inputData.machin = value;


  }

  search = ()=> {
    let issearch = inputData.product || inputData.machin;
    let param = {
      "bucketQuery": {
        "clause": {
          "type": issearch ? "and" : "all",
        },
        "orderBy": "name", "descending": false
      },
      "bestEffortLimit": 100
    };
    let clause = param.bucketQuery.clause;
    if(inputData.machin){
      let clause1 = {
        "type": "eq", "field": "vendor_thing_id",
        "value": inputData.machin
      }
      clause.clauses =clause.clauses ? clause.clauses: [];
      clause.clauses.push(clause1);

    }
    if (inputData.product){
      let clause1 = {
        "type": "eq", "field": "product",
        "value": inputData.product
      }
      clause.clauses =clause.clauses ?clause.clauses: [];
      clause.clauses.push(clause1);

    }

    // alert(JSON.stringify(param))


    this.props.dispatch({
      type: 'main/getPayInfoList',
      payload:{param:param}
    })


  }

  render() {
    const {main} = this.props
    const {payInfo, productInfo, sellMachineInfo} = main
    const {dataInfo} = payInfo
    console.log("产品信息" + JSON.stringify(productInfo), "售货机信息" + JSON.stringify(sellMachineInfo))

    const productOptions = productInfo.dataInfo.map(obj => <Option key={obj.name}>{obj.name}</Option>);
    const machineOptions = sellMachineInfo.dataInfo.map(obj => <Option
      key={obj._vendorThingID}>{obj._vendorThingID}</Option>);

    const dataSource = dataInfo.map((item, index) => {
      return {
        key: index,
        // id: item._id,
        // name: item.name,
        // cost: item.cost,
        _created: moment(item._created).format('YYYY-MM-DD HH:mm:ss'),
        price: item.price,
        product: item.product,
        canister_id: item.canister_id,
        machine: item.machine,
        payment_channel: item.payment_channel,
        out_trade_no: item.out_trade_no
      }
    })
// alert(JSON.stringify(dataSource))
    const dataSourceStatus = [{
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
      dataIndex: '_created',
      key: '_created',
    }, {
      title: '金额',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '产品',
      dataIndex: 'product',
      key: 'product',
    }
      , {
        title: '货道',
        dataIndex: 'canister_id',
        key: 'canister_id',
      }
      , {
        title: '售货机',
        dataIndex: 'machine',
        key: 'machine',
      }
      , {
        title: '支付渠道',
        dataIndex: 'payment_channel',
        key: 'payment_channel',
      }
      , {
        title: '订单号',
        dataIndex: 'out_trade_no',
        key: 'out_trade_no',
      }];

    return (
      <div>
        <div id={style.con}>
          <div className={style.topCon}>
            <div className={style.title}>日期范围</div>
            <RangePicker onChange={this.dateChange} id={style.dateRange}/>
          </div>

          <div className={style.topCon}>
            <div className={style.title}>售货机</div>
            <Select onChange={this.machinChange}  className={style.select} defaultValue="">
              {machineOptions}
            </Select>
          </div>
          <div className={style.topCon}>
            <div className={style.title}>产品</div>
            <div>
              <Select onChange={this.productChange} className={style.select}>
                {productOptions}
              </Select>
              <div style={{height: 10}}></div>
              <Button onClick={this.search} className={style.select} type="primary" icon="search">Search</Button>
              {/*<Input  className={style.select} addonBefore={<Icon type="search" />} defaultValue="mysite" />*/}
              <div style={{height: 10}}></div>
            </div>
          </div>
        </div>

        <Table columns={columns} dataSource={dataSource}/>


      </div>
    )
  }

}

function mapStateToProps(state) {
  return {main: state.main};
}

export default connect(mapStateToProps)(Index);
