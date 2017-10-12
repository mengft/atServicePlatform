import { Form, Input, Icon, Button, Modal, DatePicker, InputNumber, Select } from 'antd';
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

import Cascader from './Cascader'


function FormModal ({ showAddModal, form, dispatch, handleCancel, current, cascaderOptions }) {
  const { validateFields, getFieldDecorator, setFieldsValue } = form;

  //点击Modal 里面的确认按钮
  function handleOk() {
    validateFields((errors,value) => {
      if (errors) {
        return
      } else {
        dispatch({
          type: 'shippingCompanyInformation/handleCompanyInformation',
          payload: {
            type: 'add', ...value,
          }
        });
        dispatch({
          type: 'shippingCompanyInformation/fetch',
          payload: {
            current: current
          }
        })
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

  function onChange(value, selectedOptions) {
    //选中 目标区域的 回调

    console.warn('AddModal onChang Func' + '*************');
    console.dir(value);
    console.dir(selectedOptions);



  }

  function onLoadData(selectedOptions) {
    console.warn('AddModal onLoadData Func' + '*************');
    console.dir(selectedOptions);
    dispatch({
      type: 'concreteDeliver/changeCascaderOptions',
      payload: selectedOptions ,
    });
  }


  const option = {
    options: cascaderOptions,
    placeholder: '请选择所在市/区。',
    onChange: onChange,
    loadData: onLoadData,
    style: {
      width: '100%'
    },
  };

  //选择 时间 范围的 配置
  const rangeConfig = {
    rules: [{ type: 'array', required: true, message: '请选择起止时间。' }],
  };

  return (
    <Modal
      title="添加一条混凝土发货路线信息"
      visible={ showAddModal }
      onOk={ handleOk }
      onCancel={ handleCancel }
      style={{ top: '46px' }}
    >
      <Form>
        <FormItem
          {...formItemLayout}
          label="区域:"
          hasFeedback
        >
          <Cascader {...option}/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="地址详情:"
          hasFeedback
        >
          {getFieldDecorator('address', {
            rules: [{
              required: true, message: '请输入地址详情',
            }],
          })(
            <Input type="text" placeholder="请输入地址详情"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="开始/结束时间"
        >
          {getFieldDecorator('start_end_time', rangeConfig)(
            <RangePicker showTime format="YYYY/MM/DD HH:mm" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系人(不为自己):"
          hasFeedback
        >
          {getFieldDecorator('v_username', {
            rules: [{
              required: true, message: '联系人(不填为自己)',
            }],
          })(
            <Input type="text" placeholder="联系人(不填为自己)"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系电话(不为自己):"
          hasFeedback
        >
          {getFieldDecorator('v_mobile', {
            rules: [{
              required: true, message: '联系人电话(不填为自己)',
            }],
          })(
            <Input type="text" placeholder="联系人电话(不填为自己)"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="搅拌车数量:"
          hasFeedback
        >
          <InputNumber />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="泵车数量:"
          hasFeedback
        >
          <InputNumber />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="方量:"
          hasFeedback
        >
          <InputNumber />
        </FormItem>
        <FormItem
          label="租期:"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('zq', {
            rules: [{ required: true, message: '请选择租期!' }],
          })(
            <Select
              placeholder="请选择租期"
            >
              <Option value="1">长租</Option>
              <Option value="2">临租</Option>
              <Option value="3">一个月</Option>
              <Option value="4">三个月</Option>
              <Option value="5">六个月</Option>
              <Option value="6">一年</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="结算方式:"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('pay_type', {
            rules: [{ required: true, message: '请选择租期!' }],
          })(
            <Select
              placeholder="请选择结算方式"
            >
              <Option value="1">天</Option>
              <Option value="2">周</Option>
              <Option value="3">月</Option>
              <Option value="4">季度</Option>
              <Option value="5">半年</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}


const WrappedAppForm = Form.create()(FormModal);

export default WrappedAppForm;

