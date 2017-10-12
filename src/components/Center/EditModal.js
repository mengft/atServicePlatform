import { Form, Input, Button, Modal } from 'antd';
const FormItem = Form.Item;

function FormModal ({ showEditModal, form, dispatch, handleEditCancel, changeObject, current }) {
  const { validateFields, getFieldDecorator } = form;

  //点击Modal 里面的确认按钮
  function handleOk() {
    console.dir(changeObject);
    validateFields((errors,value) => {
      if (errors) {

        return
      } else {
        console.log(value);
        dispatch({
          type: 'shippingCompanyInformation/handleCompanyInformation',
          payload: {
            type: 'edit', ...value, id:changeObject.id,
          }
        });
        /*dispatch({
          type: 'shippingCompanyInformation/fetch',
          payload: {
            current: current
          }
        })*/
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
      title="修改本条信息"
      visible={ showEditModal }
      onOk={ handleOk }
      onCancel={ handleEditCancel }
    >
      <Form>
        <FormItem
          {...formItemLayout}
          label="公司名称"
          hasFeedback
        >
          {getFieldDecorator('name', {
            initialValue: changeObject.name,
            rules: [{
              required: true, message: '请输入公司名称',
            }],
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="公司法人"
          hasFeedback
        >
          {getFieldDecorator('boss_name', {
            initialValue: changeObject.boss_name,
            rules: [{
              required: true, message: '请输入公司法人名',
            }],
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="公司地址"
          hasFeedback
        >
          {getFieldDecorator('address', {
            initialValue: changeObject.address,
            rules: [{
              required: true, message: '公司地址',
            }],
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="工商代码"
          hasFeedback
        >
          {getFieldDecorator('business_num', {
            initialValue: changeObject.business_num,
            rules: [{
              required: true, message: '工商代码',
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

