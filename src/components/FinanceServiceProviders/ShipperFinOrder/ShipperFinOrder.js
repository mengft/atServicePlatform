import { Table, Popconfirm, message, Input, Button, Modal, Form, Select } from 'antd';
import { PAGE_SIZE , carTypeArrayBX} from '../../../constants'
import { warning } from '../../../utils/noticeTips';

function ProductInformationUI( {dispatch, data, showModal, showEditModal,  changeObject, pagination, cascaderOptions,currentPage,currentCarType,currentProvince,currentCity ,provinces,cities} ) {

  //确认编辑 按钮.
  function confirmFun(index) {
    const value = data[index];
    dispatch({
      type: 'finShipperOrderInformation/handleOrderInformation',
      payload: {
        oprType: 'del', ...value,
      }
    })
  }

  //确认编辑 按钮.
  function confirmCl(index) {
    const value = data[index];
    dispatch({
      type: 'finShipperOrderInformation/handleOrderInformation',
      payload: {
        oprType: 'hd', ...value,
      }
    })
  }

  //切换 表格数据的时候
  function handleTableChange(pagination) {
    let current = pagination.current || currentPage || 1;
    dispatch({
      type: 'finShipperOrderInformation/fetch',
      payload:{
        current: current,
        car_type:currentCarType,
        province_id:currentProvince,
        city_id:currentCity,
        status:localStorage.orderType
      }
    });
    dispatch({
      type: 'finShipperOrderInformation/updateCurrentPage',
      payload: {
        currentCity:pagination.current
      } ,
    });
  }

  //点击  编辑 按钮
  function edit(text, record, index) {
    console.log(text, record, index);

    dispatch({
      type: 'finShipperOrderInformation/handleTrafficEdit',
      payload: record
    })
  }



  //点击显示 增加的Modal (增加的功能.)
  function handleShowModal() {
    dispatch({
      type:'finShipperOrderInformation/triggerModal'
    })
  }

  //点击Modal 里面的 取消按钮
  function handleCancel() {
    dispatch({
      type:'finShipperOrderInformation/triggerModal'
    })
  }


  //点击 编辑Modal 里面的 取消按钮
  function handleEditCancel() {
    dispatch({
      type:'finShipperOrderInformation/handleEditCancel'
    })
  }

  function onChange(value) {
    if(value != ''){
        dispatch({
          type: 'finShipperOrderInformation/changeCityOptions',
          payload: value ,
        });
    }
    dispatch({
      type: 'finShipperOrderInformation/updateCurrentProvince',
      payload: {
        currentProvince:value
      } ,
    });
  }

  function changeCarType(value){
    dispatch({
      type: 'finShipperOrderInformation/updateCurrentCarType',
      payload: {
        currentCarType:value
      } ,
    });
  }

  function changeCity(value){
    dispatch({
      type: 'finShipperOrderInformation/updateCurrentCity',
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
    title: '产品类型',
    dataIndex: 'type',
    width: 120,
    key: 'finance_order_type',
    render: (text) => {
      if(text == 1){
        return (
            <div>经营贷款</div>
          )
      }else if(text == 2){
         return (
            <div>收购贷款</div>
          )
      }else{
        return (
            <div>抵押贷款</div>
          )
      }
    }
  }, {
    title: '省份',
    dataIndex: 'province_name',
    width: 100,
    key: 'finance_order_address',
  }, {
    title: '城市',
    dataIndex: 'city_name',
    width: 100,
    key: 'finance_order_city',
  }, {
    title: '总金额(万元)',
    dataIndex: 'total_money',
    width: 100,
    key: 'finance_order_total_money',
  }, {
    title: '期限(月)',
    dataIndex: 'term',
    width: 100,
    key: 'finance_order_term',
  }, {
    title: '还款方式',
    dataIndex: 'repay_method',
    width: 100,
    key: 'finance_order_repay_method',
  }, {
    title: '抵押物',
    dataIndex: 'mortgage',
    width: 100,
    key: 'finance_order_mortgage',
  },{
    title: '联系人',
    dataIndex: 'contact_name',
    width: 120,
    key: 'finance_order_contact_name'
  },{
    title: '联系方式',
    dataIndex: 'contact_tel',
    width: 120,
    key: 'finance_order_contact_tel'
  },{
    title: '状态',
    dataIndex: 'status',
    width: 80,
    key: 'finance_order_status',
    render: (text) => {
      if(text == 0){
        return (
            <div>未处理</div>
          )
      }else if(text == 1){
        return (
            <div>已处理</div>
          )
      }else{
        return (
            <div>已关闭</div>
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

export default ProductInformationUI;
