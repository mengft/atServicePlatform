import { Table, Row, Col, Popconfirm, Button } from 'antd'
import { PAGE_SIZE, tenancyArray, settlementArray } from '../../../constants'
import moment from 'moment';
import AddModal from './AddModal'
import EditModal from './EditModal'
import * as Region from '../../../utils/region';

function atContent({ dispatch, data, pagination, showAddModal, showEditModal, currentObject, cascaderOptions }) {
  const filterArray = tenancyArray.map( (val, index) => {
    return {
      text: val,
      value: index + 1,
    }
  });
  const columns = [
    {
      title: '城市',
      dataIndex: 'city_name',
      width: 80,
      render: (text,recorder,index) => {
        let c = Region.cities.find( (value) => {
          return value.id == recorder.city_id;
        });
        return (
          <div>{
            c ?  c.name : null
          }</div>
        )
      }
    },
    {
      title: '用车地点',
      dataIndex: 'address',
      key: 'address',
      width: 80,
    },
    {
      title: '搅拌车数量',
      dataIndex: 'mixer_num',
      key: 'mixer_num',
      width: 80,
    },
    {
      title: '泵车数量',
      dataIndex: 'pump_num',
      key: 'pump_num',
      width: 80,
    },
    {
      title: '方量',
      dataIndex: 'volume',
      key: 'volume',
      width: 80,
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
      sorter: true,
      width: 110,
      render: (text, record, index) => {
        return (
          <div>
            { moment(text).format('YYYY-MM-DD HH:MM') }
          </div>
        )
      }
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      key: 'end_time',
      width: 110,
      sorter: true,
      render: (text, record, index) => {
        return (
          <div>
            { moment(text).format('YYYY-MM-DD HH:MM') }
          </div>
        )
      }
    },
    {
      title: '租期',
      dataIndex: 'zq',
      key: 'zq',
      filters: filterArray,
      width: 80,
      render: (text, record, index) => {
        return (
          <div>
            { tenancyArray[text - 1] }
          </div>
        )
      }
    },
    {
      title: '结算方式',
      dataIndex: 'pay_type',
      key: 'pay_type',
      width: 80,
      render: (text, record, index) => {
        return (
          <div>
            { settlementArray[text - 1] }
          </div>
        )
      }
    },
    {
      title: '联系人数量',
      dataIndex: 'contact_num',
      key: 'contact_num',
      width: 80,
    },
    {
      title: '录入时间',
      dataIndex: 'entry_date',
      key: 'entry_date',
      width: 110,
      sorter: true,
      render: (text, record, index) => {
        return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
        )
      }
    },
    {
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
                <span className="ant-divider"/>
                <Popconfirm title="确认删除?" onConfirm={ () => confirmFun(record) }>
                  <a href="#">删除</a>
                </Popconfirm>
              </div>
            ) : null
        );
      },
    }
  ];
  //点击编辑按钮 进行 编辑
  function edit(record) {
    dispatch({
      type:'concreteDeliver/toggleEditModal'
    });
    dispatch({
      type:'concreteDeliver/updateCurrentObject',
      payload: {
        obj: record,
      }
    })
  }

  function handleEditCancel(record) {
    dispatch({
      type:'concreteDeliver/toggleEditModal'
    });
  }


  //点击删除确认按钮进行删除.
  function onConfirm() {

  }

  //  点击切换 和 点击过滤  和 点击筛选 都是 这个 按钮.
  function handleTableChange(page,filter,sorter) {
    dispatch({
      type:"concreteDeliver/fetch",
      payload: {
        current:page.current,
        sord:sorter.order,
        sidx: sorter.field,
      },
    });
  }


  //删除的确认的按钮.
  function confirmFun(record) {
    dispatch({
      type: 'concreteDeliver/deleteDeliver',
      payload: {
        id: record.id,
      }
    })
  }

  //点击AddModal 里面的 取消按钮
  function handleCancel() {
    dispatch({
      type:'concreteDeliver/triggerModal'
    })
  }


  const addModalOpts = {
    showAddModal,
    handleCancel,
    dispatch,
    current: pagination.current,
    cascaderOptions
  };

  const editModalOpts = {
    showEditModal,
    handleEditCancel,
    dispatch,
    current: pagination.current,
    cascaderOptions,
    currentObject,
  };

  function handleShowModal() {
    dispatch({
      type:'concreteDeliver/triggerModal'
    })
  }

  return (
    <div>
      <Button className="editable-add-btn" onClick={ handleShowModal } style={{marginBottom: '8px'}}>增加</Button>
      <AddModal {...addModalOpts}/>
      <EditModal {...editModalOpts}/>
      <Table
        dataSource={ data }
        columns={ columns }
        rowKey="entry_date"
        bodrderd
        pagination={ pagination }
        onChange={ handleTableChange }
      />
    </div>
  )
}

export default atContent;
