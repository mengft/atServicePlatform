import { Form, Input, Icon, Button, Modal, Select } from 'antd';
import { carTypeArrayBX} from '../../../constants'
import { provinces, cities } from '../../../utils/region.js'
const FormItem = Form.Item;
const Option = Select.Option;

function FormModal ({ showModal, form, dispatch, handleCancel, current }) {
  const { validateFields, getFieldDecorator } = form;

  //点击Modal 里面的确认按钮
  function handleOk() {
    validateFields((errors,value) => {
      if (errors) {
        return
      } else {
        dispatch({
          type: 'driverFinCustomerInformation/handleCustomerInformation',
          payload: {
            type: 'add', ...value,
          }
        });
        dispatch({
          type: 'driverFinCustomerInformation/fetch',
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


  return (

  <Modal
    title="添加司机金融客户信息"
    visible={ showModal }
    onOk={ handleOk }
    onCancel={ handleCancel }
  >
    <Form>
      <FormItem
        {...formItemLayout}
        label="客户名称"
        hasFeedback
      >
        {getFieldDecorator('company', {
          rules: [{
            required: true, message: '请输入客户名称',
          }],
        })(
          <Input type="text"/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="联系人"
        hasFeedback
      >
        {getFieldDecorator('contact_name', {
          rules: [{
            required: true, message: '请输入联系人姓名',
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
        label="车辆数量"
        hasFeedback
      >
        {getFieldDecorator('car_num', {
          rules: [{
            required: true, message: '车辆数量',
          }],
        })(
          <Input type="text"/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="备注"
        hasFeedback
      >
        {getFieldDecorator('remark', {
          rules: [{
            required: false, message: '备注',
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

