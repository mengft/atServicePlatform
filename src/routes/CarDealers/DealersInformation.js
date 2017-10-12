import { connect } from 'dva';
import { Button, Modal, Form, Input, Select} from 'antd'
import Cascader from './component/Cascader'
import { error } from '../../utils/noticeTips'

const FormItem = Form.Item;
const { Option, OptGroup } = Select;


import style from './dealersInfo.css'

function DealersInfoUI( { dispatch, myInfo, showModal, form, truckBrandList, cascaderOptions } ){
  const { validateFields, getFieldDecorator } = form;

  function editInfo() {
    dispatch({
      type: 'dealersInfo/triggerModal',
    })
  }

  function handleOk() {
    validateFields((errors,value) => {
      if (errors) {
        return
      } else {
        console.log(value);
        if (province_id == undefined || city_id == undefined) {
          error('请选择公司所在行政区域');
        }
        dispatch({
          type: '',
          payload: {
            ...value,
            city_id,
            province_id,
            id: myInfo.id,
          }
        })
      }
    });
  }

  const optionGroups = truckBrandList.map((d) => {
    let options = d.data.map( (value) => {
      return (
        <Option key={ value.id } value={ String(value.id) }>{ value.name }</Option>
      )
    });
    return (
      <OptGroup key={d.prefix + '字母开头'}>
        { options }
      </OptGroup>
    );
  });

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };


  let province_id;
  let city_id;
  function onChange(value, selectedOptions) {
    province_id = value[0];
    city_id = value[1];
    console.log(province_id);
    console.log(city_id);
  }

  //  加载数据
  function onLoadData(selectedOptions) {
    dispatch({
      type: 'dealersInfo/changeCascaderOptions',
      payload: selectedOptions ,
    });
  }


  let brand_id;
  function chooseBrand(value) {
    console.log(value);
  }




  const cascaderOpt = {
    options: cascaderOptions,
    placeholder: '请选择公司区域',
    onChange: onChange,
    loadData: onLoadData,
  };

  return (
    <div className={ style.content }>
      <p>经销商公司名称: { myInfo.name } </p>
      <p>区域: { myInfo.province }-{myInfo.city} </p>
      <p>公司地址: { myInfo.address } </p>
      <p>主营品牌: { myInfo.brand } </p>
      <p>移动电话: { myInfo.phone } </p>
      <p>固定电话: { myInfo.gddh } </p>
      <br/>
      <br/>
      <br/>
      <Button type="ghost" size="large" onClick={ editInfo }>修改个人信息</Button>
      <Modal
        title="修改经销商公司信息"
        visible={ showModal }
        onOk={ handleOk }
        onCancel={ editInfo }
        style={{ 'width' : '600px' }}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="公司名称"
            hasFeedback
          >
            {getFieldDecorator('name', {
              initialValue: myInfo.name,
              rules: [{
                required: true, message: '请输入公司名称',
              }],
            })(
              <Input type="text"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="请选择区域"
            hasFeedback
          >
            <Cascader
              { ...cascaderOpt }
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="公司地址"
            hasFeedback
          >
            {getFieldDecorator('address', {
              initialValue: myInfo.address,
              rules: [{
                required: true, message: '请输入公司地址',
              }],
            })(
              <Input type="text"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="请选择品牌"
            hasFeedback
          >
            <Select
              defaultValue={ myInfo.brand }
              onChange={ chooseBrand }>
              { optionGroups }
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="固定电话"
            hasFeedback
          >
            {getFieldDecorator('gddh', {
              initialValue: myInfo.gddh,
              rules: [{
                required: true, message: '请输入固定电话',
              }],
            })(
              <Input type="text"/>
            )}
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return state.dealersInfo;
}


export default connect(mapStateToProps)(Form.create()(DealersInfoUI));
