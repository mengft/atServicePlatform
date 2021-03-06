import { Form, Input, Icon, Button, Modal, Select,InputNumber } from 'antd';
import { carTypeArrayBX} from '../../../constants'
import { provinces, cities } from '../../../utils/region.js'
const FormItem = Form.Item;
const Option = Select.Option;
import Cascader from './Cascader'
import {error} from '../../../utils/noticeTips'

function FormModal ({ showModal, form, dispatch, handleCancel, current ,cascaderOptions,provinces,cities}) {
  const { validateFields, getFieldDecorator } = form;
  localStorage.trafficType == "";
  //点击Modal 里面的确认按钮
  function handleOk() {
    validateFields((errors,value) => {
      if (errors) {
        return
      } else {
        if(localStorage.trafficType == undefined || localStorage.trafficType == "undefined" || localStorage.trafficType == ""){
          error('请选择车务类型');
          return ;
        }
        dispatch({
          type: 'trafficProductInformation/handleTrafficProductInformation',
          payload: {
            type: 'add', ...value,
            trafficType: localStorage.trafficType
          }
        });
        dispatch({
          type: 'trafficProductInformation/fetch',
          payload: {
            current: current
          }
        })
        form.resetFields();
      }
    });


  }

  //表单布局用的参数
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  function onChange(value) {
    //选中 目标区域的 回调
    console.warn('AddModal onChang Func' + '*************');
    console.dir(value);
    dispatch({
      type: 'trafficProductInformation/changeCityOptions',
      payload: value ,
    });

  }

   function onChangeTraffic(value, selectedOptions) {
    //选中 目标区域的 回调
    if(value.length == 1){
      localStorage.trafficType = value[0];
    }else{
      localStorage.trafficType = value[1];
    }
    
  }

  const option = {
    options: cascaderOptions,
    placeholder: '请选择车务类型。',
    onChange: onChangeTraffic,
    style: {
      width: '100%'
    },
  };

  const provinceOption = provinces.map((v, index) => <Option key={ String(v.key)} value={ String(v.key) }>{ v.value }</Option>);

  const cityOption = cities.map((v, index) => <Option key={ String(v.key)} value={ String(v.key) }>{ v.value }</Option>);

  //车型
  const carTypeOpionts = carTypeArrayBX.map((v, index) => <Option key={ String(index)}
                                                                value={ String(index) }>{ v }</Option>);


  return (

  <Modal
    title="添加车务产品信息"
    visible={ showModal }
    onOk={ handleOk }
    onCancel={ handleCancel }
  >
    <Form>
      <FormItem
        {...formItemLayout}
        label="产品名称"
        hasFeedback
      >
        {getFieldDecorator('product_name', {
          rules: [{
            required: true, message: '请输入产品名称',
          }],
        })(
          <Input type="text"/>
        )}
      </FormItem>
      <FormItem
          {...formItemLayout}
          label="车务类型"
          hasFeedback
        >
          <Cascader {...option}/>
      </FormItem>
      <FormItem
          label="车型"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('car_type', {
            rules: [{required: true, message: '车型'}],
          })(
            <Select placeholder="请选择车辆类型">
              { carTypeOpionts }
            </Select>
          )}
        </FormItem>
     <FormItem
        {...formItemLayout}
        label="省份"
        hasFeedback
      >
        {getFieldDecorator('province_id', {
          rules: [{
            required: true, message: '省份',
          }],
        })(
           <Select placeholder="请选择省份" onChange={onChange}>
              { provinceOption }
            </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="城市"
        hasFeedback
      >
        {getFieldDecorator('city_id', {
          rules: [{
            required: true, message: '城市',
          }],
        })(
           <Select placeholder="请选择城市">
              { cityOption }
            </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="服务费(元)"
        hasFeedback
      >
        {getFieldDecorator('service_charge', {
          rules: [{
            required: true, message: '服务费',
          }],
        })(
          <InputNumber type="text"/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="服务公司"
        hasFeedback
      >
        {getFieldDecorator('service_company', {
          rules: [{
            required: true, message: '服务公司',
          }],
        })(
          <Input type="text"/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="经纪人"
        hasFeedback
      >
        {getFieldDecorator('contact_name', {
          rules: [{
            required: true, message: '经纪人',
          }],
        })(
          <Input type="text"/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="联系方式"
        hasFeedback
      >
        {getFieldDecorator('contact_tel', {
          rules: [{
            required: true, message: '联系方式',
          }],
        })(
          <Input type="text"/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="备注信息"
        hasFeedback
      >
        {getFieldDecorator('remark', {
          rules: [{
            required: false, message: '备注信息',
          }],
        })(
          <Input type="text"/>
        )}
      </FormItem>
    </Form>
  </Modal>
  )
}


const WrappedAppForm = Form.create()(FormModal);

export default WrappedAppForm;

