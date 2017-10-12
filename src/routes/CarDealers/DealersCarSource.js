import { Table, Modal, Form, Input, Select, Button,InputNumber } from 'antd'
import { connect } from 'dva'

const FormItem = Form.Item;

function DealersCarSourceComponent({ dispatch, data, pagination, loading, showStatusModal, currentCar, showPriceModal }) {

  const carStatusArray = ['在售', '下架'];

  const columns = [{
    title: '车源详细信息',
    dataIndex: 'truckname',
    key: 'truckname',
    width: 400,
  }, {
    title: '车辆报价',
    dataIndex: 'price',
    key: 'price',
    width: 300,
    sorter: true,
    render: (text) => {
      return (
        <div>{ text + '万元'}</div>
      )
    },
  }, {
    title: '所在城市',
    dataIndex: 'cityname',
    key: 'cityname',
    width: 200,
  }, {
    title: '车辆状态',
    dataIndex: 'status',
    key: 'status',
    width: 200,
    render: (text) => {
      return (
        <div>{ carStatusArray[text] }</div>
      )
    },
  }, {
    title: '操作',
    dataIndex: 'operation',
    width: 200,
    render: (text,recorder, index) => {
      return (
        <span>
           <a onClick={ () => changeStatus(recorder, index) }>修改状态</a>
          <span className="ant-divider"/>
           <a onClick={ () => changePrice(recorder, index)  }>修改报价</a>
        </span>
      )
    },
  }
  ];

  //处理表格切换
  function handleTableChange() {

  }

  //修改车辆状态
  //展示 修改状态 弹窗

  function changeStatus(recorder) {
   // console.log(recorder);
    dispatch({
      type: 'dealersCarSource/triggerStatusModal',
    });

    dispatch({
      type: 'dealersCarSource/updateCurrentCar',
      payload: {
        currentCar: recorder,
      }
    })
  }

  function handleCancel() {
    dispatch({
      type: 'dealersCarSource/triggerStatusModal',
    });
  }

  let tmpStatus;
  function handleChangeStatus(value) {
    tmpStatus = value;
  }

  function handleStatusOk() {
    dispatch({
      type: 'dealersCarSource/changeCarStatus',
      payload: {
        status: tmpStatus || currentCar.status,
        id: currentCar.id,
      }
    });
    dispatch({
      type: 'dealersCarSource/triggerStatusModal',
    });

  }

  //点击 table 上面的 修改报价按钮
  function changePrice(recorder) {
    dispatch({
      type: 'dealersCarSource/triggerPriceModal',
    });
    dispatch({
      type: 'dealersCarSource/updateCurrentCar',
      payload: {
        currentCar: recorder,
      }
    })
  }


  let tmpPrice;
  //修改报价
  function handlePriceChange(value) {
    tmpPrice = value;
  }

  //价格修改确认
  function handlePriceOk() {
    console.log(tmpPrice);
    dispatch({
      type: 'dealersCarSource/changeCarPrice',
      payload: {
        price: tmpPrice || currentCar.price,
        id: currentCar.id,
      }
    });
    dispatch({
      type: 'dealersCarSource/triggerPriceModal',
    });
  }

  //报价修改弹窗 取消 按钮
  function handlePriceCancel() {
    dispatch({
      type: 'dealersCarSource/triggerPriceModal',
    });

  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
//              defaultValue={ String(currentCar.status) }
  return (
    <div>
      <Table
        dataSource={ data }
        columns={ columns }
        rowKey="id"
        loading={ loading }
        bordered
        pagination={ pagination }
        onChange={ handleTableChange }
      />
      <Modal
        title="修改车辆的状态"
        visible={ showStatusModal }
        onOk={ handleStatusOk }
        onCancel={ handleCancel }
        style={{ 'width' : '600px' }}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="车辆状态"
            hasFeedback
          >
            <Select
              onChange={ handleChangeStatus }
            >
              <Select.Option value="0">
                在售
              </Select.Option>
              <Select.Option value="1">
                下架
              </Select.Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>

      <Modal
        title="修改车辆的报价"
        visible={ showPriceModal }
        onOk={ handlePriceOk }
        onCancel={ handlePriceCancel }
        style={{ 'width' : '600px' }}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="车辆报价(万元)"
            hasFeedback
          >
            <InputNumber
              onChange={ handlePriceChange }
              step='0.1'
            />
          </FormItem>
        </Form>
      </Modal>
    </div>
  )
}

function mapStateToProps(state) {
  return state.dealersCarSource;
}

export default connect(mapStateToProps)(DealersCarSourceComponent);
