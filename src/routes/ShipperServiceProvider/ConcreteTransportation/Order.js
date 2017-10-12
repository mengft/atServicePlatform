import { Table, Modal, Popconfirm, Input, Select, Button,InputNumber } from 'antd'
import { connect } from 'dva'
import moment from 'moment'

import MainLayout from '../../../components/MainLayout/MainLayout';
//import ConcreteOrder from '../../../components/ShipperServiceProvider/ConcreteTransportation/Order'

function ConcreteOrderComponent({ dispatch,data, pagination }){
  const columns = [{
    title: '运输信息',
    dataIndex: 'msg',
    key: 'msg',
    width: 500,
  }, {
    title: '联系人',
    dataIndex: 'username',
    key: 'username',
    width: 100,
  }, {
    title: '联系电话',
    dataIndex: 'mobile',
    key: 'mobile',
    width: 100,
  }, {
    title: '时间',
    key: 'entry_date',
    width: 100,
    sorter: true,
    render: (text) => {
      return (
        <div>
          { moment(text).format('YYYY-MM-DD') }
        </div>
      )
    },
  }];

  function handleTableChange(page,x2,sorter) {
    dispatch({
      type: 'concreteOrder/fetchOrderList',
      payload: {
        current: page.current,
        sord: sorter.order,
      }
    });
  }

  return(
    <div>
      <Table
        dataSource={ data }
        columns={ columns }
        rowKey="id"
        bordered
        pagination={ pagination }
        onChange={ handleTableChange }
      />
    </div>
  )
}




function mapStateToProps(state) {
  return state.concreteOrder;
}

export default connect(mapStateToProps)(ConcreteOrderComponent);
