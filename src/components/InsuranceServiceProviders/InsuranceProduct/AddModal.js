import { Form, Input, Icon, Button, Modal, Select,InputNumber } from 'antd';
import { carTypeArrayBX} from '../../../constants'
import { provinces, cities } from '../../../utils/region.js'
const FormItem = Form.Item;
const Option = Select.Option;
import Cascader from './Cascader'

function FormModal ({ showModal, form, dispatch, handleCancel, current ,cascaderOptions,provinces,cities}) {
  const { validateFields, getFieldDecorator } = form;

  //点击Modal 里面的确认按钮
  function handleOk() {
    validateFields((errors,value) => {
      if (errors) {
        return
      } else {
        dispatch({
          type: 'insuranceProductInformation/handleInsuranceProductInformation',
          payload: {
            type: 'add', ...value,
          }
        });
        dispatch({
          type: 'insuranceProductInformation/fetch',
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
      type: 'insuranceProductInformation/changeCityOptions',
      payload: value ,
    });

  }

  // function onLoadData(selectedOptions) {
  //   console.warn('AddModal onLoadData Func' + '*************');
  //   console.dir(selectedOptions);
  //   dispatch({
  //     type: 'insuranceProductInformation/changeCascaderOptions',
  //     payload: selectedOptions ,
  //   });
  // }


  // const option = {
  //   options: cascaderOptions,
  //   placeholder: '请选择省/市。',
  //   onChange: onChange,
  //   loadData: onLoadData,
  //   style: {
  //     width: '100%'
  //   },
  // };

  const provinceOption = provinces.map((v, index) => <Option key={ String(v.key)} value={ String(v.key) }>{ v.value }</Option>);

  const cityOption = cities.map((v, index) => <Option key={ String(v.key)} value={ String(v.key) }>{ v.value }</Option>);

  //车型
  const carTypeOpionts = carTypeArrayBX.map((v, index) => <Option key={ String(index)}
                                                                value={ String(index) }>{ v }</Option>);


  return (

  <Modal
    title="添加保险产品信息"
    visible={ showModal }
    onOk={ handleOk }
    onCancel={ handleCancel }
  >
    <Form>
      <FormItem
        {...formItemLayout}
        label="保险公司"
        hasFeedback
      >
        {getFieldDecorator('insurance_company', {
          rules: [{
            required: true, message: '请输入保险公司名称',
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
        {getFieldDecorator('agent', {
          rules: [{
            required: true, message: '请输入经纪人名称',
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
        label="吨位"
        hasFeedback
      >
        {getFieldDecorator('onnage', {
          rules: [{
            required: true, message: '吨位',
          }],
        })(
          <Input type="text"/>
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
        label="返点(%)"
        hasFeedback
      >
        {getFieldDecorator('rebate', {
          rules: [{
            required: true, message: '返点',
          }],
        })(
          <InputNumber type="text"/>
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

