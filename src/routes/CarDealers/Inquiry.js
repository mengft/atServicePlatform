import { Table, Modal, Popconfirm, Input, Select, Button,InputNumber } from 'antd'
import { connect } from 'dva'

function DealersCarSourceComponent({ dispatch, data, pagination }) {

  const buyTimeArray = ['一周', '一个月', '三个月'];
  const columns = [{
    title: '询价目标车辆',
    dataIndex: 'truckname',
    key: 'truckname',
    width: 400,
  }, {
    title: '询问人姓名',
    dataIndex: 'username',
    key: 'username',
    width: 100,
  }, {
    title: '手机号码',
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
  }, {
    title: '询价时间',
    dataIndex: 'entry_date',
    key: 'entry_date',
    width: 200,
  },{
    title: '上牌城市',
    dataIndex: 'scity',
    key: 'scity',
    width: 100,
  },{
    title: '提车城市',
    dataIndex: 'tcity',
    key: 'tcity',
    width: 100,
  }, {
    title: '提车时间',
    key: 'buy_time',
    width: 150,
    render: (text, recorder, index) => {
      return (
        <div>
          { buyTimeArray[recorder.buy_time] }
        </div>
      )
    }
  }, {
    title: '买车数量(辆)',
    dataIndex: 'buy_nums',
    key: 'buy_nums',
    width: 100,
  },  {
    title: '操作',
    dataIndex: 'operation',
    width: 100,
    render: (text,recorder, index) => {
      return (
        <span>
           <Popconfirm title="确认删除?" onConfirm={ () => confirmFun(recorder, index) }>
             <a href="#">删除</a>
           </Popconfirm>
        </span>
      )
    },
  }
  ];

  //确认编辑 按钮.
  function confirmFun(recorder, index ) {
    dispatch({
      type: 'dealersInquiry/deleteInquiry',
      payload: {
        id: recorder.id
      }
    });
    dispatch({
      type: 'dealersInquiry/fetchInquiryList',
      payload: {
        current: pagination.current - 1,
      }
    })
  }

  function handleTableChange(pagination) {
    console.log(pagination.current);
    dispatch({
      type: 'dealersInquiry/fetchInquiryList',
      payload: {
        current:pagination.current,
      }
    });
    dispatch({
      type: 'dealersInquiry/updatePaginationCurrent',
      payload: {
        current:pagination.current,
      }
    });
  }

  return (
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
  return state.dealersInquiry;
}

export default connect(mapStateToProps)(DealersCarSourceComponent);
