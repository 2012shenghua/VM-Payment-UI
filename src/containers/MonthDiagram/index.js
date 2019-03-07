import React from 'react'
import {Menu, Icon, DatePicker, Tabs, Table, Input} from 'antd'
import moment from 'moment'
import style from "./index.css"
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';

const TabPane = Tabs.TabPane;

class Index extends React.Component {
  state = {
    sliderTime: 1547386800587,
    endTime: 1547539714838,
    startTime: 1547280680352
  }

  disabledDate = (current) => {
    const {endTime, startTime} = this.state
    return current < moment(startTime) || current > moment(endTime);
  }
  setChartTop(){
    var myChart = echarts.init(document.getElementById('chartTop'));
    myChart.setOption({
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
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
          data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
          }
        ]
      }
    );
  }
  setChartBottom(){
    var myChart = echarts.init(document.getElementById('chartBottom'));
    myChart.setOption({
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
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
          data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
          }
        ]
      }
    );
  }
  componentDidMount() {

    this.setChartTop();
    this.setChartBottom();
  }

  render() {
    const {sliderTime} = this.state
    const columns = [{
      title: '产品',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '数量',
      className: 'column-money',
      dataIndex: 'number',
    }, {
      title: '销售额',
      dataIndex: 'money',
    }, {
      title: '利润',
      dataIndex: 'profit',
    }];

    const data = [{
      key: '1',
      name: 'John Brown',
      money: '￥300,000.00',
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      money: '￥1,256,000.00',
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    }];
    const columns2 = [{
      title: '售货机',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '出货量',
      className: 'column-money',
      dataIndex: 'number',
    }, {
      title: '销售额',
      dataIndex: 'money',
    }, {
      title: '利润',
      dataIndex: 'profit',
    }];

    const data2 = [{
      key: '1',
      name: 'John Brown',
      money: '￥300,000.00',
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      money: '￥1,256,000.00',
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    }];

    return (
      <div>

        <section id={style.topcon}>
        <DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          // onChange={this.dataPickerChange}
          // value={moment(sliderTime)}
          showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
          disabledDate={(value) => this.disabledDate(value)}
          // disabledTime={(value) => this.disabledDateTime(value)}
        />
          <Input  style={{width:120}} addonBefore={<Icon type="search" />} defaultValue="mysite" />
        <div>
          <span>销售总额 : </span>
          <span>500.0</span>
        </div>
        <div>
          <span>利润 : </span>
          <span>500.0</span>
        </div>
        </section>
        <Tabs className={style.tabs} size="large" type="card" style={{width: "100%"}}>
          <TabPane   tab="Tab Title 1" key="1">
            <div id="chartTop" style={{height:200}}></div>
            <div id="chartBottom" style={{height:200}}></div>
          </TabPane>
          <TabPane  tab="Tab Title 2" key="2">
            <Table
              columns={columns}
              dataSource={data}
              bordered
            />
          </TabPane>
          <TabPane tab="Tab Title 3" key="3">
            <Table
              columns={columns2}
              dataSource={data2}
              bordered
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Index
