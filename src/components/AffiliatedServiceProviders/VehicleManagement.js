import { Table, Popconfirm, message, Input, Button, Modal, Form } from 'antd';
import { PAGE_SIZE, carNumArray, carTypeArray } from '../../constants'
import moment from 'moment';
import AddModal from './AddModal'
import EditModal from './EditModal'

function VehicleManagementUI({dispatch, query: {data, loading, pagination, showModal, companyList, carTypeValueLabel, truckLength, changeObject } }) {

  //确认删除按钮
  function confirmFun(index) {
    //data[index].id
    dispatch({
      type: 'vehicleManagement/deleteTruck',
      payload: {
        id: data[index].id,
      }
    });
    dispatch({
      type: 'vehicleManagement/fetchVehicleList',
      payload: {
        current: pagination.current,
      }
    });

  }

  const columns = [
    {
      title: '车牌号',
      dataIndex: 'car_num',
      key: 'car_num',
      width: 100,
      fixed: 'left',
    }, {
      title: '车牌类型',
      dataIndex: 'car_num_type',
      key: 'car_num_type',
      width: 100,
      render: (text) => <div>{ carNumArray[text] }</div>
    }, {
      title: '车型',
      dataIndex: 'car_type',
      key: 'car_type',
      width: 100,
      render: (text) =>  <div>{ carTypeArray[text - 1] }</div>,
    }, {
      title: '车属性',
      dataIndex: 'car_type_value',
      key: 'car_type_value',
      width: 100,
      render: (text, record) => {

        const car_type = record.car_type;
        if (car_type > 0 && car_type < 7 ||  car_type == 8 ) {
          return (
            <div>长度:{ text } </div>
          )
        } else if ( car_type == '7' ) {
          return (
            <div>罐体方量:{ text }</div>
          )
        } else if ( car_type == '9' ) {
          return (
            <div>吨位:{ text } </div>
          )
        }

      }
    }, {
      title: '发动机号',
      dataIndex: 'engine_num',
      key: 'engine_num',
      width: 100,
    }, {
      title: '车架号',
      dataIndex: 'frame_num',
      key: 'frame_num',
      width: 100,
    }, {
      title: '挂靠公司',
      dataIndex: 'company_name',
      key: 'company_name',
      width: 140,
    }, {
      title: '登记日期',
      dataIndex: 'entry_date',
      sorter: true,
      width: 100,
      render: (text) => {
        return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
        )
      }
    }, {
      title: '保险到期日',
      dataIndex: 'insurance_date',
      key: 'insurance_date',
      sorter: true,
      width: 100,
      render: (text) => {
        return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
        )
      }
    }, {
      title: '车主姓名',
      dataIndex: 'c_username',
      key: 'c_username',
      width: 80,
    }, {
      title: '车主身份证号',
      dataIndex: 'c_id_num',
      key: 'c_id_num',
      width: 130,
    }, {
      title: '绑定人姓名',
      dataIndex: 'username',
      key: 'username',
      width: 100,
    }, {
      title: '绑定人手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 100,
    }, {
      title: '绑定时间',
      dataIndex: 'bind_date',
      key: 'bind_date',
      sorter: true,
      width: 100,
      render: (text) => {
        return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
        )
      }
    }, {
      title: '录入时间',
      dataIndex: 'checkin_date',
      key: 'checkin_date',
      sorter: true,
      width: 100,
      render: (text) => {
        return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
        )
      }
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: 100,
      render: (text, record, index) => {
        return (
          data.length > 0 ?  //案例中的写法是.用一个 三元语法,写一个判断是否出现这个按钮
            (
              <div>
              <span>
                <a onClick={ () => editModal(text, record, index) }>编辑</a>
              </span>
                <span className="ant-divider"/>
                <Popconfirm title="确认删除?" onConfirm={ () => confirmFun(index) }>
                  <a href="#">删除</a>
                </Popconfirm>
              </div>

            ) : null
        );
      },
      fixed: 'right',
    }
  ];

  //点击显示 增加的Modal (增加的功能.)
  function handleShowModal() {
    dispatch({
      type: 'vehicleManagement/triggerModal'
    })
  }

  function editModal(text, record, index) {
    dispatch({
      type: 'vehicleManagement/updateChangeObject',
      payload: { record }
    });
    dispatch({
      type: 'vehicleManagement/triggerModal'
    })
  }

  //点击Modal 里面的 取消按钮
  function handleCancel() {
    dispatch({
      type: 'vehicleManagement/triggerModal'
    })
  }

  //处理切换
  function handleOnChange(page,filter, sorter) {

    dispatch({
      type: 'vehicleManagement/fetchVehicleList',
      payload: {
        current:page.current,
        sord:sorter.order,
        sidx: sorter.field,
      }
    });
  }


  //addModal 属性配置
  const addModalOpts = {
    showModal,
    handleCancel,
    dispatch,
    current: pagination.current,
    companyList,
    carTypeValueLabel,
    truckLength,
  };

  const editModalOpts = {
    showModal,
    handleCancel,
    dispatch,
    current: pagination.current,
    companyList,
    carTypeValueLabel,
    truckLength,
    changeObject,
  };

  return (
    <div>
      <Button className="editable-add-btn" onClick={ handleShowModal } style={{marginBottom: '8px'}}>增加</Button>
      <AddModal {...addModalOpts}/>
      <EditModal {...editModalOpts}/>
      <Table
        loading={ loading }
        dataSource={data}
        columns={columns}
        bordered
        rowKey="id"
        pagination={ pagination }
        scroll={{ x: 1800 }}
        onChange={ handleOnChange }
      />
    </div>
  )
}

export default VehicleManagementUI;
