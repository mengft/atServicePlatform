import { Table, Popconfirm, message, Input, Button, Modal, Form } from 'antd';
import { PAGE_SIZE } from '../../constants'
import { warning } from '../../utils/noticeTips';
import AddModal from './AddModal'
import EditModal from './EditModal'

function ShippingCompanyInformationUI( {dispatch, query: {data, showModal, showEditModal,  changeObject, pagination } } ) {

  //确认编辑 按钮.
  function confirmFun(index) {
    const value = data[index];
    dispatch({
      type: 'shippingCompanyInformation/handleCompanyInformation',
      payload: {
        type: 'del', ...value,
      }
    })
  }

  //切换 表格数据的时候
  function handleTableChange(pagination) {
    dispatch({
      type: 'shippingCompanyInformation/fetch',
      payload:{
        current: pagination.current
      }
    });
  }

  //点击  编辑 按钮
  function edit(text, record, index) {
    console.log(text, record, index);
    dispatch({
      type: 'shippingCompanyInformation/handleEdit',
      payload: {
        companyInfo: record,
        index,
      }
    })
  }



  //点击显示 增加的Modal (增加的功能.)
  function handleShowModal() {
    dispatch({
      type:'shippingCompanyInformation/triggerModal'
    })
  }

  //点击Modal 里面的 取消按钮
  function handleCancel() {
    dispatch({
      type:'shippingCompanyInformation/triggerModal'
    })
  }


  //点击 编辑Modal 里面的 取消按钮
  function handleEditCancel() {
    dispatch({
      type:'shippingCompanyInformation/handleEditCancel'
    })
  }
  const columns = [{
    title: '公司名',
    dataIndex: 'name',
    width: 100,
    key: 'name',
  }, {
    title: '公司法人',
    dataIndex: 'boss_name',
    width: 100,
    key: 'boss_name',
  }, {
    title: '公司地址',
    dataIndex: 'address',
    width: 100,
    key: 'address',
  }, {
    title: '工商代码',
    dataIndex: 'business_num',
    width: 100,
    key: 'business_num',
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
    current: pagination.current,
  };

  const editModalOpts = {
    changeObject,
    showEditModal,
    handleEditCancel,
    handleShowModal,
    dispatch,
    current: pagination.current,
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
        onChange={ handleTableChange }
        pagination={ pagination } />
    </div>
  )
}

export default ShippingCompanyInformationUI;
