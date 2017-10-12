import { Table, Popconfirm, message, Input, Button, Modal, Form, Select } from 'antd';
import { PAGE_SIZE , carTypeArrayBX} from '../../../constants'
import { warning } from '../../../utils/noticeTips';
import AddModal from './AddModal'
import EditModal from './EditModal'

function TrafficProductInformationUI( {dispatch, data, showModal, showEditModal,  changeObject, pagination, cascaderOptions,currentPage,currentCarType,currentProvince,currentCity ,provinces,cities} ) {

  //确认编辑 按钮.
  function confirmFun(index) {
    const value = data[index];
    dispatch({
      type: 'trafficProductInformation/handleTrafficProductInformation',
      payload: {
        type: 'del', ...value,
      }
    })
  }

  //确认编辑 按钮.
  function confirmFb(index) {
    const value = data[index];
    dispatch({
      type: 'trafficProductInformation/handleTrafficProductInformation',
      payload: {
        type: 'fb', ...value,
      }
    })
  }

  //切换 表格数据的时候
  function handleTableChange(pagination) {
    let current = pagination.current || currentPage || 1;
    dispatch({
      type: 'trafficProductInformation/fetch',
      payload:{
        current: current,
        car_type:currentCarType,
        province_id:currentProvince,
        city_id:currentCity
      }
    });
    dispatch({
      type: 'trafficProductInformation/updateCurrentPage',
      payload: {
        currentCity:pagination.current
      } ,
    });
  }

  //点击  编辑 按钮
  function edit(text, record, index) {
    console.log(text, record, index);

    dispatch({
      type: 'trafficProductInformation/handleTrafficEdit',
      payload: record
    })
  }



  //点击显示 增加的Modal (增加的功能.)
  function handleShowModal() {
    dispatch({
      type:'trafficProductInformation/triggerModal'
    })
  }

  //点击Modal 里面的 取消按钮
  function handleCancel() {
    dispatch({
      type:'trafficProductInformation/triggerModal'
    })
  }


  //点击 编辑Modal 里面的 取消按钮
  function handleEditCancel() {
    dispatch({
      type:'trafficProductInformation/handleEditCancel'
    })
  }

  function onChange(value) {
    if(value != ''){
        dispatch({
          type: 'trafficProductInformation/changeCityOptions',
          payload: value ,
        });
    }
    dispatch({
      type: 'trafficProductInformation/updateCurrentProvince',
      payload: {
        currentProvince:value
      } ,
    });
  }

  function changeCarType(value){
    dispatch({
      type: 'trafficProductInformation/updateCurrentCarType',
      payload: {
        currentCarType:value
      } ,
    });
  }

  function changeCity(value){
    dispatch({
      type: 'trafficProductInformation/updateCurrentCity',
      payload: {
        currentCity:value
      } ,
    });
  }

   //车型
  const carTypeOpionts = carTypeArrayBX.map((v, index) => <Select.Option key={ String(index)} value={ String(index) }>{ v }</Select.Option>);

  const provinceOption = provinces.map((v, index) => <Select.Option key={ String(v.key)} value={ String(v.key) }>{ v.value }</Select.Option>);

  const cityOption = cities.map((v, index) => <Select.Option key={ String(v.key)} value={ String(v.key) }>{ v.value }</Select.Option>);

  const columns = [{
    title: '产品名称',
    dataIndex: 'product_name',
    width: 120,
    key: 'traffic_company',
  },{
    title: '产品类型',
    dataIndex: 'typeName',
    width: 100,
    key: 'traffic_agent',
  },{
    title: '车型',
    dataIndex: 'car_type',
    width: 100,
    key: 'traffic_name',
    render: (text) =>  <div>{ carTypeArrayBX[text] }</div>,
  }, {
    title: '省份',
    dataIndex: 'province_name',
    width: 100,
    key: 'traffic_address',
  }, {
    title: '城市',
    dataIndex: 'city_name',
    width: 100,
    key: 'traffic_city',
  }, {
    title: '服务费(元)',
    dataIndex: 'service_charge',
    width: 100,
    key: 'traffic_service_charge',
  },{
    title: '服务公司',
    dataIndex: 'service_company',
    width: 120,
    key: 'traffic_service_company'
  },{
    title: '经纪人',
    dataIndex: 'contact_name',
    width: 120,
    key: 'traffic_contact_name'
  },{
    title: '联系方式',
    dataIndex: 'contact_tel',
    width: 120,
    key: 'traffic_contact_tel'
  },{
    title: '备注',
    dataIndex: 'remark',
    width: 100,
    key: 'traffic_remark',
  },{
    title: '状态',
    dataIndex: 'fb_status',
    width: 80,
    key: 'traffic_fb_status',
    render: (text) => {
      if(text == 0){
        return (
            <div>未发布</div>
          )
      }else{
        return (
            <div>已发布</div>
          )
      }
    }
  },{
    title: '销售状态',
    dataIndex: 'sale_status',
    width: 100,
    key: 'traffic_sale_status',
    render: (text) => {
      if(text == 0){
        return (
            <div>正常</div>
          )
      }else{
        return (
            <div>已下架</div>
          )
      }
    }
  }, {
    title: '操作',
    dataIndex: 'operation',
    width: 150,
    render: (text, record, index) => {
      if(record.fb_status == 0 && record.sale_status == 0){
          return (
            data.length > 0 ?  //案例中的写法是.用一个 三元语法,写一个判断是否出现这个按钮
              (
                <div>            
                  <span>
                    <Popconfirm title="确认发布?" onConfirm={ () => confirmFb(index) }>
                    <a href="#">发布</a>
                  </Popconfirm>
                  </span>
                  <span className="ant-divider" />
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
      }else if(record.sale_status == 0){
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
      }else{
        return (
            data.length > 0 ?  //案例中的写法是.用一个 三元语法,写一个判断是否出现这个按钮
              (
                <div>
                  <Popconfirm title="确认删除?" onConfirm={ () => confirmFun(index) }>
                    <a href="#">删除</a>
                  </Popconfirm>
                </div>
              ): null
          );
      }
      
    },
  }];

  const addModalOpts = {
    showModal,
    handleCancel,
    dispatch,
    current: pagination.current,
    cascaderOptions,
    provinces,
    cities
  };

  const editModalOpts = {
    showEditModal,
    handleEditCancel,
    dispatch,
    current: pagination.current,
    cascaderOptions,
    provinces,
    cities,
    changeObject
  };

  return (
    <div>
      
      <AddModal {...addModalOpts}/>
      <EditModal {...editModalOpts}/>
      <div>
        <Button className="editable-add-btn" onClick={ handleShowModal } style={{marginBottom: '8px'}}>增加</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        车辆类型：
        <Select style={{ width: '120px' }} defaultValue='0' onChange={changeCarType}>
          {carTypeOpionts}
        </Select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         省  份：
        <Select style={{ width: '120px' }} onChange={onChange} defaultValue='0'>
          <Select.Option key='0' value='0'>请选择省份</Select.Option>
          {provinceOption}
        </Select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         城  市：
        <Select style={{ width: '120px' }} defaultValue='0' onChange={changeCity}>
          <Select.Option key='0' value='0'>请选择城市</Select.Option>
          {cityOption}
        </Select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button className="editable-add-btn" onClick={ handleTableChange } style={{marginBottom: '8px'}}>搜索</Button>
      </div>
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

export default TrafficProductInformationUI;
