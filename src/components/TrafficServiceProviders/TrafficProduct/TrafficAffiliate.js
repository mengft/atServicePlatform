import { Table, Popconfirm, message, Input, Button, Modal, Form, Select } from 'antd';
import { PAGE_SIZE , carTypeArrayBX} from '../../../constants'
import { warning } from '../../../utils/noticeTips';
import AddModal from './AddModal'
import EditModal from './EditModal'

function TrafficProductInformationUI( {dispatch, data, showModal, showEditModal,  changeObject, pagination, cascaderOptions,currentPage,currentCarType,currentProvince,currentCity ,provinces,cities,currentCompany} ) {

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
        city_id:currentCity,
        service_company:currentCompany,
        isTraffic:0

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

  function changeCompany(event){
    dispatch({
        type: 'trafficProductInformation/updateCurrentCompany',
        payload: {
          currentCompany:event.target.value
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
         服务公司名称：<Input style={{ width: '120px' }} onChange={changeCompany}/>
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
