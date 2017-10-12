import { Table, Popconfirm, message, Input, Button, Modal, Form, Select } from 'antd';
import { PAGE_SIZE , carTypeArrayBX} from '../../../constants'
import { warning } from '../../../utils/noticeTips';
import AddModal from './AddModal'
import EditModal from './EditModal'

function InsuranceProductInformationUI( {dispatch, data, showModal, showEditModal,  changeObject, pagination, cascaderOptions,currentPage,currentCarType,currentProvince,currentCity,currentCompany ,provinces,cities} ) {

  //确认编辑 按钮.
  function confirmFun(index) {
    const value = data[index];
    dispatch({
      type: 'insuranceProductInformation/handleInsuranceProductInformation',
      payload: {
        type: 'del', ...value,
      }
    })
  }

  //确认编辑 按钮.
  function confirmFb(index) {
    const value = data[index];
    dispatch({
      type: 'insuranceProductInformation/handleInsuranceProductInformation',
      payload: {
        type: 'fb', ...value,
      }
    })
  }

  //切换 表格数据的时候
  function handleTableChange(pagination) {
    let current = pagination.current || currentPage || 1;
    dispatch({
      type: 'insuranceProductInformation/fetch',
      payload:{
        current: current,
        car_type:currentCarType,
        province_id:currentProvince,
        city_id:currentCity,
        insurance_company:currentCompany,
        isInsurance:0
      }
    });
    dispatch({
      type: 'insuranceProductInformation/updateCurrentPage',
      payload: {
        currentCity:pagination.current
      } ,
    });
  }

  //点击  编辑 按钮
  function edit(text, record, index) {
    console.log(text, record, index);

    dispatch({
      type: 'insuranceProductInformation/handleInsuranceEdit',
      payload: record
    })
  }



  //点击显示 增加的Modal (增加的功能.)
  function handleShowModal() {
    dispatch({
      type:'insuranceProductInformation/triggerModal'
    })
  }

  //点击Modal 里面的 取消按钮
  function handleCancel() {
    dispatch({
      type:'insuranceProductInformation/triggerModal'
    })
  }


  //点击 编辑Modal 里面的 取消按钮
  function handleEditCancel() {
    dispatch({
      type:'insuranceProductInformation/handleEditCancel'
    })
  }

  function onChange(value) {
    if(value != ''){
        dispatch({
          type: 'insuranceProductInformation/changeCityOptions',
          payload: value ,
        });
    }
    dispatch({
      type: 'insuranceProductInformation/updateCurrentProvince',
      payload: {
        currentProvince:value
      } ,
    });
  }

  function changeCarType(value){
    dispatch({
      type: 'insuranceProductInformation/updateCurrentCarType',
      payload: {
        currentCarType:value
      } ,
    });
  }

  function changeCity(value){
    dispatch({
      type: 'insuranceProductInformation/updateCurrentCity',
      payload: {
        currentCity:value
      } ,
    });
  }

  function changeCompany(event){
    dispatch({
        type: 'insuranceProductInformation/updateCurrentCompany',
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
    title: '保险公司',
    dataIndex: 'insurance_company',
    width: 120,
    key: 'insurance_company',
  },{
    title: '经纪人',
    dataIndex: 'agent',
    width: 100,
    key: 'insurance_agent',
  },{
    title: '联系方式',
    dataIndex: 'contact_tel',
    width: 140,
    key: 'insurance_contact_tel',
  },{
    title: '车型',
    dataIndex: 'car_type',
    width: 100,
    key: 'insurance_name',
    render: (text) =>  <div>{ carTypeArrayBX[text] }</div>,
  }, {
    title: '吨位',
    dataIndex: 'onnage',
    width: 100,
    key: 'insurance_boss_name',
  }, {
    title: '省份',
    dataIndex: 'province_name',
    width: 100,
    key: 'insurance_address',
  }, {
    title: '城市',
    dataIndex: 'city_name',
    width: 100,
    key: 'insurance_city',
  },{
    title: '返点',
    dataIndex: 'rebate',
    width: 60,
    key: 'insurance_rebate',
    render: (text) => {
      return (
          <div>{text+'%'}</div>
        )
    }
  },{
    title: '备注(%)',
    dataIndex: 'remark',
    width: 80,
    key: 'insurance_remark',
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
          保险公司名称：<Input style={{ width: '120px' }} onChange={changeCompany}/>
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

export default InsuranceProductInformationUI;
