import { Table, Popconfirm, message, Input, Button, Modal, Form } from 'antd';
import { PAGE_SIZE , carTypeArrayBX} from '../../../constants'
import { warning } from '../../../utils/noticeTips';
import AddModal from './AddModal'
import EditModal from './EditModal'

function CustomerInformationUI( {dispatch, data, showModal, showEditModal,  changeObject, pagination,} ) {

  //确认编辑 按钮.
  function confirmFun(index) {
    const value = data[index];
    dispatch({
      type: 'driverFinCustomerInformation/handleCustomerInformation',
      payload: {
        type: 'del', ...value,
      }
    })
  }

  //确认编辑 按钮.
  function confirmFb(index) {
    const value = data[index];
    dispatch({
      type: 'driverFinCustomerInformation/handleCustomerInformation',
      payload: {
        type: 'fb', ...value,
      }
    })
  }

  //切换 表格数据的时候
  function handleTableChange(pagination) {
    dispatch({
      type: 'driverFinCustomerInformation/fetch',
      payload:{
        current: pagination.current
      }
    });
  }

  //点击  编辑 按钮
  function edit(text, record, index) {
    console.log(text, record, index);

    dispatch({
      type: 'driverFinCustomerInformation/handleEdit',
      payload: {
        insuranceCustomer: record,
        index,
      }
    })
  }



  //点击显示 增加的Modal (增加的功能.)
  function handleShowModal() {
    dispatch({
      type:'driverFinCustomerInformation/triggerModal'
    })
  }

  //点击Modal 里面的 取消按钮
  function handleCancel() {
    dispatch({
      type:'driverFinCustomerInformation/triggerModal'
    })
  }


  //点击 编辑Modal 里面的 取消按钮
  function handleEditCancel() {
    dispatch({
      type:'driverFinCustomerInformation/handleEditCancel'
    })
  }
  const columns = [{
    title: '客户名称',
    dataIndex: 'company',
    width: 120,
    key: 'insurance_company',
  },{
    title: '联系人',
    dataIndex: 'contact_name',
    width: 100,
    key: 'insurance_contact_name',
  },{
    title: '联系方式',
    dataIndex: 'contact_tel',
    width: 100,
    key: 'insurance_contact_tel',
  }, {
    title: '车辆数量',
    dataIndex: 'car_num',
    width: 40,
    key: 'insurance_car_num',
  },{
    title: '备注',
    dataIndex: 'remark',
    width: 100,
    key: 'insurance_remark',
  }, {
    title: '操作',
    dataIndex: 'operation',
    width: 150,
    render: (text, record, index) => {
      return (
            data.length > 0 ?  //案例中的写法是.用一个 三元语法,写一个判断是否出现这个按钮
              (
                <div>            
                  <span>
                    <a onClick={ () => edit(text, record, index) }>编辑</a>
                  </span>
                  <span className="ant-divider" />
                  <Popconfirm title="确认删除?" onConfirm={ () => confirmFun(index) }>
                    <a href="#">删除</a>
                  </Popconfirm>
                </div>
              ): null
          );
      
    },
  }];

  const addModalOpts = {
    showModal,
    handleCancel,
    dispatch,
    current: pagination.current
  };

  const editModalOpts = {
    showEditModal,
    handleEditCancel,
    dispatch,
    current: pagination.current,
    changeObject
  };

  return (
    <div>
      <Button className="editable-add-btn" onClick={ handleShowModal } style={{marginBottom: '8px'}}>增加</Button>
      <AddModal {...addModalOpts}/>
      <EditModal {...editModalOpts}/>
      <Table
        dataSource={data}
        columns={columns}
        bordered
        rowKey="id"
        onChange={ handleTableChange }
        pagination={ pagination } />
    </div>
  )
}

export default CustomerInformationUI;
