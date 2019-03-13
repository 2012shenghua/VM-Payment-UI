import React from 'react'
import {Breadcrumb, Button, Form, Icon, Input, message, Table} from 'antd'
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment'
import style from "./index.css";
class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      addShow: "none"
    };

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'main/addSellMachine',
          payload: values,
          callback: () => {
            message.success('添加成功');
            this.setState({
              addShow: "none",
            });

//刷新
            this.props.dispatch({
              type: 'main/getProductList',
            })
            //清空表单
            this.props.form.resetFields();
          },
        })
      }

    });
  }

  toggleAdd = (e) => {
    if (this.state.addShow === "block") {
      this.setState({
        addShow: "none"
      })
      //清空表单
      this.props.form.resetFields();
    } else {
      this.setState({
        addShow: "block"
      })
    }
  }

  edite = () => {


  }
  delConfirm=()=>{
    alert("删除")
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const { main } = this.props
    const { sellMachineInfo, machineModelInfo } = main
    // alert(JSON.stringify(sellMachineInfo))
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
        <Button onClick={this.toggleAdd} icon="plus" type="primary">添加</Button>
        <Table pagination={{pageSize:5}}
               columns={columns} dataSource={dataSource} />
        <div id={style.cover} style={{display: this.state.addShow}}>
          <div id={style.addCon}>
            <Form onSubmit={this.handleSubmit} className="login-form">

              <Form.Item>
                {getFieldDecorator('name', {
                  rules: [{required: true, message: '请输入售货机名称'}],
                })(
                  <Input name="name" placeholder="请输入售货机名称" className={style.inputs}/>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('price', {
                  rules: [{required: true, message: '请输入售货机型号'}],
                })(
                  <Input name="price" placeholder="请输入售货机型号" className={style.inputs}/>
                )}
              </Form.Item>
              {/*<Form.Item>*/}
              {/*{getFieldDecorator('cost', {*/}
                {/*rules: [{required: true, message: '请输入产品成本'}],*/}
              {/*})(*/}
                {/*<Input name="cost" placeholder="请输入产品成本" className={style.inputs}/>*/}
              {/*)}*/}
            {/*</Form.Item>*/}
              <Form.Item>
                <Button type="primary" htmlType="submit" className={style.inputs}>添加</Button>
              </Form.Item>
              <Form.Item>
                <Button onClick={this.toggleAdd} className={style.inputs}>取消</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

    )
  }

}
function mapStateToProps(state) {
  return { main: state.main };
}
const com = Form.create({name: 'normal_login'})(Index);

export default connect(mapStateToProps)(com);
