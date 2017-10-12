import { Table, Popconfirm, message, Input, Button, Modal, Form, Select } from 'antd';
import { PAGE_SIZE , carTypeArrayBX} from '../../../constants'
import { warning } from '../../../utils/noticeTips';

function TrafficProductInformationUI( {dispatch, data, showModal, showEditModal,  changeObject, pagination, cascaderOptions,currentPage,currentCarType,currentProvince,currentCity ,provinces,cities} ) {

  //确认编辑 按钮.
  function confirmFun(index) {
    const value = data[index];
    dispatch({
      type: 'trafficOrderInformation/handleTrafficOrderInformation',
      payload: {
        type: 'del', ...value,
      }
    })
  }

  //确认编辑 按钮.
  function confirmCl(index) {
    const value = data[index];
    dispatch({
      type: 'trafficOrderInformation/handleTrafficOrderInformation',
      payload: {
        type: 'hd', ...value,
      }
    })
  }

  //切换 表格数据的时候
  function handleTableChange(pagination) {
    let current = pagination.current || currentPage || 1;
    dispatch({
      type: 'trafficOrderInformation/fetch',
      payload:{
        current: current,
        car_type:currentCarType,
        province_id:currentProvince,
        city_id:currentCity,
        status:localStorage.orderType
      }
    });
    dispatch({
      type: 'trafficOrderInformation/updateCurrentPage',
      payload: {
        currentCity:pagination.current
      } ,
    });
  }

  //点击  编辑 按钮
  function edit(text, record, index) {
    console.log(text, record, index);

    dispatch({
      type: 'trafficOrderInformation/handleTrafficEdit',
      payload: record
    })
  }



  //点击显示 增加的Modal (增加的功能.)
  function handleShowModal() {
    dispatch({
      type:'trafficOrderInformation/triggerModal'
    })
  }

  //点击Modal 里面的 取消按钮
  function handleCancel() {
    dispatch({
      type:'trafficOrderInformation/triggerModal'
    })
  }


  //点击 编辑Modal 里面的 取消按钮
  function handleEditCancel() {
    dispatch({
      type:'trafficOrderInformation/handleEditCancel'
    })
  }

  function onChange(value) {
    if(value != ''){
        dispatch({
          type: 'trafficOrderInformation/changeCityOptions',
          payload: value ,
        });
    }
    dispatch({
      type: 'trafficOrderInformation/updateCurrentProvince',
      payload: {
        currentProvince:value
      } ,
    });
  }

  function changeCarType(value){
    dispatch({
      type: 'trafficOrderInformation/updateCurrentCarType',
      payload: {
        currentCarType:value
      } ,
    });
  }

  function changeCity(value){
    dispatch({
      type: 'trafficOrderInformation/updateCurrentCity',
      payload: {
        currentCity:value
      } ,
    });
  }

  function changeOrderType(value){
    localStorage.orderType = value;
  }

   //车型
  const carTypeOpionts = carTypeArrayBX.map((v, index) => <Select.Option key={ String(index)} value={ String(index) }>{ v }</Select.Option>);

  const provinceOption = provinces.map((v, index) => <Select.Option key={ String(v.key)} value={ String(v.key) }>{ v.value }</Select.Option>);

  const cityOption = cities.map((v, index) => <Select.Option key={ String(v.key)} value={ String(v.key) }>{ v.value }</Select.Option>);

  const columns = [{
    title: '业务类型',
    dataIndex: 'traffic_type',
    width: 120,
    key: 'traffic_type',
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
    title: '车牌',
    dataIndex: 'plateId',
    width: 100,
    key: 'plateId',
  },{
    title: '联系人',
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
    dataIndex: 'status',
    width: 80,
    key: 'traffic_status',
    render: (text) => {
      if(text == 0){
        return (
            <div>未处理</div>
          )
      }else{
        return (
            <div>已处理</div>
          )
      }
    }
  }, {
    title: '操作',
    dataIndex: 'operation',
    width: 150,
    render: (text, record, index) => {
      if(record.status == 0){
          return (
            data.length > 0 ?  //案例中的写法是.用一个 三元语法,写一个判断是否出现这个按钮
              (
                <div>            
                  <span>
                    <Popconfirm title="确认处理?" onConfirm={ () => confirmCl(index) }>
                    <a href="#">处理</a>
                  </Popconfirm>
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

  return (
    <div>
      
      <div>
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
        订单状态：
        <Select style={{ width: '120px' }} defaultValue='0' onChange={changeOrderType}>
          <Select.Option key='0' value='0'>请选择订单状态</Select.Option>
          <Select.Option key='1' value='1'>未处理</Select.Option>
          <Select.Option key='2' value='2'>已处理</Select.Option>
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
