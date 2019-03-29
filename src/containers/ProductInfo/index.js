import React from 'react'
import {Breadcrumb, Icon, Table, Button, Input, Form, Popconfirm, message} from 'antd'
import {connect} from 'dva';
import style from "./index.css";
const Search = Input.Search;
const addBtns = ["添加", "取消"];
const editeBtns = ["修改", "取消"]

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      addShow: "none",
      btnNames: addBtns
    };

    this.productId = "";
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(err) return;

      values.currency = "CNY";
      for(let key in values){
          if(key == "price" || key == "cost"){
            values[key] = Number(values[key])
          }
      }

      if (this.state.btnNames == addBtns) {//add
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
      if (this.state.btnNames == editeBtns) {//edit

        // console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'main/editProduct',
          payload: {values:values,productId:this.productId},
          callback: () => {
            message.success('修改成功');
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

  toggleAdd = () => {
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
  add = () => {
    this.setState({
      btnNames: addBtns
    })
    this.toggleAdd();
  }
  edite = (text) => {
    this.props.form.setFieldsValue({name:text.name,cost:text.cost,price:text.price});

    // console.log(text)
    this.setState({
      btnNames: editeBtns,

    });
   this.productId = text.id
    this.toggleAdd();
    // this.props.dispatch({
    //     type: 'main/editProduct'
    //   }
    // )

  }
  delConfirm = () => {
    alert("删除")
  }
  search = (value)=>{
   this.props.dispatch({
      type: 'main/save',
      payload:{productSearchText:value}
    })

  }
  searchChang = (e)=>{
    const value =  e.target.value
    this.props.dispatch({
      type: 'main/save',
      payload:{productSearchText:value}
    })

  }


  render() {

    const {getFieldDecorator} = this.props.form;
    const {main} = this.props
    const {productInfo} = main
    const {productSearchText} = main
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
      render: (text, record) => <div><Button onClick={(record) => this.edite(text, record)}>编辑</Button>
        {/*<Popconfirm title="确定删除"*/}
        {/*onConfirm={this.delConfirm}*/}
        {/*okText="确定" cancelText="取消">*/}
        {/*<Button>删除</Button>*/}
        {/*</Popconfirm>*/}
      </div>,
    },];

    const constdataSourceFilter = dataInfo.filter(function (item) {
      return item.name.includes(productSearchText);
    })
    let dataSource = constdataSourceFilter.map((item, index) => {
      return {
        key: index,
        id: item._id,
        name: item.name,
        price: item.price,
        cost: item.cost,
      }
    })
    //
    // dataSource = []


    return (
      <div>
        <Breadcrumb style={{marginBottom: 10}}>
          <Breadcrumb.Item>产品信息</Breadcrumb.Item>
        </Breadcrumb>
        <Button style={{marginBottom:10}} onClick={this.toggleAdd} icon="plus" type="primary">添加</Button>
        <Search style={{width:200,float:"right"}}
          placeholder="产品名称"
          onSearch={this.search}
                onChange={this.searchChang}
          enterButton

        />
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
                  rules: [{required: true, type:'number', message: '请输入产品售价',transform(value){
                      if(value){
                        return Number(value)
                      }
                    }}],
                })(
                  <Input type="number" name="price" placeholder="请输入产品售价" className={style.inputs}/>
                )}
              </Form.Item><Form.Item>
              {getFieldDecorator('cost', {
                rules: [{required: true, type:'number', message: '请输入产品成本',transform(value){
                  if(value){
                    return Number(value)
                  }
                  }}],
              })(
                <Input  type="number" name="cost"  placeholder="请输入产品成本" className={style.inputs}/>
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
