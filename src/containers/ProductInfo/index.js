import React from 'react'
import {Breadcrumb, Icon, Table, Button, Input, Form, Popconfirm, message} from 'antd'
import {connect} from 'dva';
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
          type: 'main/addProduct',
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
    const {main} = this.props
    const {productInfo} = main
    const {dataInfo} = productInfo
    const addProductInfo = main.addProductInfo
    const addSuccess = addProductInfo.success;

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
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <div><Button onClick={this.edite}>编辑</Button>
        {/*<Popconfirm title="确定删除"*/}
                    {/*onConfirm={this.delConfirm}*/}
                    {/*okText="确定" cancelText="取消">*/}
          {/*<Button>删除</Button>*/}
      {/*</Popconfirm>*/}
      </div>,
    },];
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
        <Button onClick={this.toggleAdd} icon="plus" type="primary">添加</Button>
        <Table pagination={{pageSize: 5}} columns={columns} dataSource={dataSource}/>
        <div id={style.cover} style={{display: this.state.addShow}}>
          <div id={style.addCon}>
            <Form onSubmit={this.handleSubmit} className="login-form">

              <Form.Item>
                {getFieldDecorator('name', {
                  rules: [{required: true, message: '请输入产品名称'}],
                })(
                  <Input name="name" placeholder="请输入产品名称" className={style.inputs}/>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('price', {
                  rules: [{required: true, message: '请输入产品售价'}],
                })(
                  <Input name="price" placeholder="请输入产品售价" className={style.inputs}/>
                )}
              </Form.Item><Form.Item>
              {getFieldDecorator('cost', {
                rules: [{required: true, message: '请输入产品成本'}],
              })(
                <Input name="cost" placeholder="请输入产品成本" className={style.inputs}/>
              )}
            </Form.Item>
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
  return {main: state.main};
}

const com = Form.create({name: 'normal_login'})(Index);

export default connect(mapStateToProps)(com);
