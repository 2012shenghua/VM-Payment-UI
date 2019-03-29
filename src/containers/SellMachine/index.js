import React from 'react'
import {Breadcrumb, Button, Form, Icon, Input, message, Table, Select} from 'antd'
import {connect} from 'dva';
import {Link} from 'dva/router';
import moment from 'moment'
import style from "./index.css";

const Option = Select.Option;
const Search = Input.Search;

const addBtns = ["添加", "取消"];
const editeBtns = ["修改", "取消"]

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      addShow: "none",
      btnNames: addBtns,
      edit: false
    };

    this._thingID = "";

  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation()
    this.props.form.validateFields((err, values) => {
      if (err) return;
      if (this.state.btnNames == addBtns) {//add
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
              type: 'main/getSellMachineList',
            })
            //清空表单
            this.props.form.resetFields();
          },
        })
      }
      if (this.state.btnNames == editeBtns) {//edit

        // console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'main/editSellMachine',
          payload: {values: values, _thingID: this._thingID},
          callback: () => {
            message.success('修改成功');
            this.setState({
              addShow: "none",
            });

//刷新
            this.props.dispatch({
              type: 'main/getSellMachineList',
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

  add = (e) => {

    this.setState({
      btnNames: addBtns,
      edit: false
    })
    this.toggleAdd();
  }

  edite = (text) => {

    this.props.form.setFieldsValue({_vendorThingID: text.name, _password: "******", _thingType: text._thingType});
    // console.log(text)
    this.setState({
      btnNames: editeBtns,
      edit: true
    });
    this._thingID = text.id;
    this.toggleAdd();

  }
  delConfirm = () => {
    alert("删除")
  }
  search = (value) => {
    this.props.dispatch({
      type: 'main/save',
      payload: {sellmachineSearchText: value}
    })

  }
  searchChang = (e) => {
    const value = e.target.value
    this.props.dispatch({
      type: 'main/save',
      payload: {sellmachineSearchText: value}
    })

  }

  //自定义验证售货机名称
  handleConfirmVendorThingID(rule, value, callback) {

    const reg = /^[a-zA-Z0-9-_\\.]{1,200}$/g;
    const flag = reg.test(value);
    if (!flag && value != "") {
      callback("名称只能输入 数字，英文字符，下划线，中划线或者点'.'")
    } else {
      callback()
    }
  }


  render() {
    // const load = this.props.loading.effects['exp/add'];
    // alert(load)
    const {getFieldDecorator} = this.props.form;
    const {main} = this.props
    const {sellmachineSearchText} = main
    const {sellMachineInfo, machineModelInfo} = main
    const machineModelOptions = machineModelInfo.map(obj => <Option
      key={obj._id}>{obj.name}</Option>);

    // alert(JSON.stringify(sellMachineInfo))
    const {dataInfo} = sellMachineInfo
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
        return a.id.length > b.id.length
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
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record) => <div><Button onClick={(record) => this.edite(text, record)}>编辑</Button>
        {/*<Popconfirm title="确定删除"*/}
        {/*onConfirm={this.delConfirm}*/}
        {/*okText="确定" cancelText="取消">*/}
        {/*<Button>删除</Button>*/}
        {/*</Popconfirm>*/}
      </div>,
    }];

    // dataInfo.reverse();
    const constdataSourceFilter = dataInfo.filter(function (item) {
      return item._vendorThingID.includes(sellmachineSearchText);
    })
    const dataSource = constdataSourceFilter.map((item, index) => {
      const model = Object.keys(machineObj).length > 0 ? machineObj[item._thingType].name : ''
      return {
        key: index,
        id: item._thingID,
        name: item._vendorThingID,
        model,
        time: item._created,
        _thingType: item._thingType
      }
    })

    return (
      <div>
        <Breadcrumb style={{marginBottom: 10}}>
          <Breadcrumb.Item>售货机</Breadcrumb.Item>
        </Breadcrumb>
        <Button style={{marginBottom: 10}} onClick={this.add} icon="plus" type="primary">添加</Button>
        <Search style={{width: 200, float: "right"}}
                placeholder="售货机名称"
                onSearch={this.search}
                onChange={this.searchChang}
                enterButton

        />
        <Table pagination={{pageSize: 5}}
               columns={columns} dataSource={dataSource}/>
        <div id={style.cover} style={{display: this.state.addShow}}>
          <div id={style.addCon}>
            <Form onSubmit={this.handleSubmit} className="login-form">

              <Form.Item>
                {getFieldDecorator('_vendorThingID', {
                  rules: [
                    {required: true, message: '请输入售货机名称'},
                    // {regexp: /[a-zA-Z0-9-_\\.]{1,200}/,message:"名称只能输入 数字，英文字符，下划线，中划线或者点'.'"}
                    {validator: this.handleConfirmVendorThingID}
                  ],
                })(
                  <Input disabled={this.state.edit} name="_vendorThingID" placeholder="请输入售货机名称"
                         className={style.inputs}/>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('_password', {
                  rules: [{required: true, message: '请输入售货机密码'}],
                })(
                  <Input disabled={this.state.edit} name="_password" placeholder="请输入售货机密码" className={style.inputs}/>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('_thingType', {
                  rules: [{required: true, message: '请选择售货机型号'}],
                })(
                  <Select style={{width: 300}} placeholder="请选择售货机型号">
                    {machineModelOptions}
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className={style.inputs}>{this.state.btnNames[0]}</Button>
              </Form.Item>
              <Form.Item>
                <Button onClick={this.add} className={style.inputs}>{this.state.btnNames[1]}</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

    )
  }

}

function mapStateToProps(state) {
  return {main: state.main};
}

const com = Form.create({name: 'normal_login'})(Index);

export default connect(mapStateToProps)(com);
