import React from 'react'
import {Card, Menu, Icon, DatePicker, Tabs, Table, Input, Button} from 'antd'
import moment from 'moment'
import style from "./index.css"
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import {connect} from "dva";

const {MonthPicker} = DatePicker;
const TabPane = Tabs.TabPane;

let inputData = {};
let g_dateDics = {};//一个与所有天数为key的dic
let g_productNameArr = [];//所有商品名称
let g_machineNameArr = [];//所有售货机
class Index extends React.Component {
  state = {
    sliderTime: 1547386800587,
    endTime: 1547539714838,
    startTime: 1547280680352
  }

  getDefaultGrange() {

    // inputData = {};
    // g_dateDics = {};//一个与所有天数为key的dic
    // g_productNameArr = [];//所有商品名称
    // g_machineNameArr = [];//所有售货机

    g_dateDics = {}
    //初始化为当月
    let today = moment().get('date');
    //test
    today = 31;
    for (let i = 1; i <= today; i++) {
      g_dateDics[i] = {};
    }

  }

  constructor() {
    super();
    this.getDefaultGrange()
    this.getDefaultRange()
  }
  getDefaultRange(){
      const start = moment().startOf('month').valueOf();
      const end = moment().valueOf();
      inputData.range = {start: start, end: end};

  }

  monthChange(date, dateString) {

    if (date) {
      const start = moment(date).startOf('month').valueOf();
      const end = moment(date).endOf('month').valueOf();
      inputData.range = {start: start, end: end};
    } else {
      delete inputData.range
    }

    let daysInMonth = moment(date).daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      g_dateDics[i] = {};
    }

  }

  search = () => {
    let issearch = inputData.range;
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

    if (inputData.range) {
      let clause1 = {
        "type": "range",
        "field": "_created",
        "upperLimit": inputData.range.end,
        "upperIncluded": true,
        "lowerLimit": inputData.range.start,
        "lowerIncluded": true
      }
      clause.clauses = clause.clauses ? clause.clauses : [];
      clause.clauses.push(clause1);


    }

    //清空数据
    this.getDefaultGrange();

    this.props.dispatch({
      type: 'main/getPayInfoList',
      payload: {param: param}
    });


  }

  disabledDate = (current) => {
    const {endTime, startTime} = this.state
    return current < moment(startTime) || current > moment(endTime);
  }

  setChartTop() {
    window.myChart = echarts.init(document.getElementById('chartTop'));

    // const endDay = new Date(inputData.range.end).getDate();


   window.myChart.setOption({
        title: {
          text: '销售额',
          right: 50,
          textStyle: {
            color: "black",
            fontSize: 16,

          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: g_productNameArr
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          name: "日期",
          type: 'category',
          boundaryGap: false,
          data: Object.keys(g_dateDics)
        },
        yAxis: {
          name: "销售额(元)",
          type: 'value'
        },
        series: (function () {

          let tempArr = [];
          g_productNameArr.forEach(function (value, i) {
            let arr = [];
            for (let key2 in g_dateDics) {
              if (g_dateDics[key2][value]) {
                arr.push(g_dateDics[key2][value]["price"])
              } else {
                arr.push(0)
              }
            }
            tempArr.push({
              data: arr,
              name: value,
              type: 'line',
              stack: '总量',
            });
          });
          // alert(JSON.stringify(tempArr))
          return tempArr;

        })()
      }
    );
  }

  setChartBottom() {
    window.myChart2 = echarts.init(document.getElementById('chartBottom'));
    window.myChart2.setOption({
        title: {
          text: '利润',
          right: 50,
          textStyle: {
            color: "black",
            fontSize: 16,

          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: g_machineNameArr
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: Object.keys(g_dateDics)
        },
        yAxis: {
          type: 'value',
          name: "利润(元)"
        },
        series: (function () {

          let tempArr = [];
          g_productNameArr.forEach(function (value, i) {
            let arr = [];
            for (let key2 in g_dateDics) {
              if (g_dateDics[key2][value]) {
                arr.push(g_dateDics[key2][value]["price"] - g_dateDics[key2][value]["cost"])
              } else {
                arr.push(0)
              }
            }
            tempArr.push({
              data: arr,
              name: value,
              type: 'line',
              stack: '总量',
            });
          });
          // alert(JSON.stringify(tempArr))
          return tempArr;

        })()
      }
    );
  }

  componentDidMount() {
    this.setChartTop();
    this.setChartBottom();
    this.search();

    window.onresize = function (){
      window.myChart.resize();
      window.myChart2.resize();
    }

  }

  componentDidUpdate() {

    this.setChartTop();
    this.setChartBottom();
  }

  render() {
    this.getDefaultGrange();
    const {main} = this.props
    const {payInfo} = main
    const {dataInfo} = payInfo

    // console.log("月度报表"+JSON.stringify(dataInfo))
    let price = 0;
    let cost = 0;

    dataInfo.forEach(function (value, i) {

      price += value.price;
      cost += value.cost;

      // 获取商品的种类
      if (!g_productNameArr.includes(value.product)) {
        g_productNameArr.push(value.product);
      }
      // 获取售货机名称
      if (!g_machineNameArr.includes(value.vendor_thing_id)) {
        g_machineNameArr.push(value.vendor_thing_id);
      }


      //根据时间筛选 成本 产品为key
      if (g_dateDics[moment(value._created).date()][value.product] != null) {
        g_dateDics[moment(value._created).date()][value.product].price += value.price
        g_dateDics[moment(value._created).date()][value.product].cost += value.cost
        g_dateDics[moment(value._created).date()][value.product].num += value.quantity

      } else {
        g_dateDics[moment(value._created).date()][value.product] = {
          price: value.price,
          cost: value.cost,
          num: value.quantity
        }

      }

      //根据时间筛选 成本 售货机key
      if (g_dateDics[moment(value._created).date()][value.vendor_thing_id] != null) {
        g_dateDics[moment(value._created).date()][value.vendor_thing_id].price += value.price
        g_dateDics[moment(value._created).date()][value.vendor_thing_id].cost += value.cost
        g_dateDics[moment(value._created).date()][value.vendor_thing_id].num += value.quantity

      } else {
        g_dateDics[moment(value._created).date()][value.vendor_thing_id] = {
          price: value.price,
          cost: value.cost,
          num: value.quantity
        }

      }


    });

    // alert(JSON.stringify(productNameArr))
    // alert(JSON.stringify(g_dateDics))

    const columns = [{
      title: '产品',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '数量',
      className: 'number',
      dataIndex: 'number',
    }, {
      title: '销售额',
      dataIndex: 'price',
    }, {
      title: '利润',
      dataIndex: 'profit',
    }];

    let data = [];
    g_productNameArr.forEach(function (value, index, array) {

      let price = 0;
      let profit = 0;
      let num = 0;
      for (let key in g_dateDics) {
        if (g_dateDics[key][value]) {
          price += g_dateDics[key][value]["price"]
          profit += g_dateDics[key][value]["price"] - g_dateDics[key][value]["cost"]
          num += g_dateDics[key][value]["num"]
        }

      }

      let dic = {
        key: index,
        name: value,
        price: price,
        profit: profit,
        number: num
      }

      data.push(dic);

    });


    const columns2 = [{
      title: '售货机',
      dataIndex: 'vendor_thing_id',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '出货量',
      className: 'column-money',
      dataIndex: 'number',
    }, {
      title: '销售额',
      dataIndex: 'price',
    }, {
      title: '利润',
      dataIndex: 'profit',
    }];

    let data2 = [];
    g_machineNameArr.forEach(function (value, index, array) {

      let price = 0;
      let profit = 0;
      let num = 0;
      for (let key in g_dateDics) {
        if (g_dateDics[key][value]) {
          price += g_dateDics[key][value]["price"]
          profit += g_dateDics[key][value]["price"] - g_dateDics[key][value]["cost"]
          num += g_dateDics[key][value]["num"]
        }

      }

      let dic = {
        key: index,
        vendor_thing_id: value,
        price: price,
        profit: profit,
        number: num
      }

      data2.push(dic);

    });
    return (
      <div>
        <section id={style.topcon}>
          <div>
            <MonthPicker defaultValue={moment()} onChange={this.monthChange} placeholder="选择月份"/>
            <Button style={{marginLeft: 20}} onClick={this.search} type="primary" icon="search">搜索</Button>
          </div>
          <div>
            <span>销售总额 : </span>
            <span>{price.toFixed(2)}</span>
          </div>
          <div>
            <span>利润 : </span>
            <span>{(price - cost).toFixed(2)}</span>
          </div>
        </section>
        <Tabs size="large" type="card" style={{width: "100%"}}>
          <TabPane tab="销售及利润曲线" key="1">
            <div id="chartTop" style={{height: 200}}></div>
            <div id="chartBottom" style={{height: 200}}></div>
          </TabPane>
          <TabPane tab="产品报表" key="2">
            <Table
              columns={columns}
              dataSource={data}
              bordered
              pagination={{pageSize: 5}}
            />
          </TabPane>
          <TabPane tab="售货机报表" key="3">
            <Table
              columns={columns2}
              dataSource={data2}
              bordered
              pagination={{pageSize: 5}}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {main: state.main};
}

export default connect(mapStateToProps)(Index);
