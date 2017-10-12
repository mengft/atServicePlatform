import { Form, Input, Icon, Button, Modal, Select,InputNumber } from 'antd';
import { carTypeArrayBX} from '../../../constants'
import { provinces, cities } from '../../../utils/region.js'
const FormItem = Form.Item;
const Option = Select.Option;
import {error} from '../../../utils/noticeTips'

function FormModal ({ showEditModal, form, dispatch, handleEditCancel, current ,cascaderOptions,provinces,cities,changeObject}) {
  const { validateFields, getFieldDecorator } = form;

  //点击Modal 里面的确认按钮
  function handleOk() {
    validateFields((errors,value) => {
      if (errors) {
        return
      } else {
        dispatch({
          type: 'shipperFinProductInformation/handleProductInformation',
          payload: {
            oprType: 'edit', ...value,id:changeObject.id
          }
        });
        dispatch({
          type: 'shipperFinProductInformation/fetch',
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
      type: 'shipperFinProductInformation/changeCityOptions',
      payload: value ,
    });

  } 

  const provinceOption = provinces.map((v, index) => <Option key={ String(v.key)} value={ String(v.key) }>{ v.value }</Option>);

  const cityOption = cities.map((v, index) => <Option key={ String(v.key)} value={ String(v.key) }>{ v.value }</Option>);

  //车型
  const carTypeOpionts = carTypeArrayBX.map((v, index) => <Option key={ String(index)} value={ String(index) }>{ v }</Option>);


  return (

  <Modal
    title="编辑司机金融产品信息"
    visible={ showEditModal }
    onOk={ handleOk }
    onCancel={ handleEditCancel }
  >
    <Form>
      <FormItem
        {...formItemLayout}
        label="产品名称"
        hasFeedback
      >
        {getFieldDecorator('title', {
          initialValue: changeObject.title,
          rules: [{
            required: true, message: '请输入产品名称',
          }],
        })(
          <Input type="text"/>
        )}
      </FormItem>
       <FormItem
          label="产品类型"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('type', {
            initialValue: changeObject.type+'',
            rules: [{required: true, message: '产品类型'}],
          })(
            <Select placeholder="请选择产品类型">
              <Option value="1">经营贷款</Option>
              <Option value="2">收购贷款</Option>
              <Option value="3">抵押贷款</Option>
            </Select>
          )}
      </FormItem>
     <FormItem
        {...formItemLayout}
        label="省份"
        hasFeedback
      >
        {getFieldDecorator('province_id', {
          initialValue: changeObject.province_id+'',
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
          initialValue: changeObject.city_id+'',
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
        label="金融公司"
        hasFeedback
      >
        {getFieldDecorator('fin_company', {
          initialValue: changeObject.fin_company,
          rules: [{
            required: true, message: '金融公司',
          }],
        })(
          <Input type="text"/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="期限（月）"
        hasFeedback
      >
        {getFieldDecorator('term', {
          initialValue: changeObject.term+'',
          rules: [{
            required: true, message: '期限（月）',
          }],
        })(
          <Select placeholder="请选择还款期限">
              <Option value="6">六个月</Option>
              <Option value="12">十二个月</Option>
              <Option value="18">十八个月</Option>
              <Option value="24">二十四个月</Option>
            </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="还款方式"
        hasFeedback
      >
        {getFieldDecorator('repay_method', {
          initialValue: changeObject.repay_method,
          rules: [{
            required: true, message: '还款方式',
          }],
        })(
          <Select placeholder="请选择还款方式">
              <Option value="等额本息">等额本息</Option>
              <Option value="先息后本">先息后本</Option>
            </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="抵押物"
        hasFeedback
      >
        {getFieldDecorator('mortgage', {
          initialValue: changeObject.mortgage,
          rules: [{
            required: false, message: '抵押物',
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
          initialValue: changeObject.agent,
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
          initialValue: changeObject.contact_tel,
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
          initialValue: changeObject.remark,
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

