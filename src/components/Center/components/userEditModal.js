import { Form, Input, Icon, Button, Modal, Cascader, Select } from 'antd';
import { error } from '../../../utils/noticeTips'

const FormItem = Form.Item;

function FormModal({ addModal, form, dispatch, editInfo, changeObject }) {
  const { validateFields, getFieldDecorator } = form;
  //点击Modal 里面的确认按钮
  function handleOk() {
    validateFields((errors, value) => {
      if (errors) {
        return
      } else {
        dispatch({
          type: 'basicInformation/updateUserInfo',
          payload: {
            ...value,
            userid: changeObject.userid,
            province_id:changeObject.province_id,
            city_id:changeObject.city_id,
            zone_id:changeObject.zone_id,
            id: changeObject.id,
          }
        });
      }
    });
  }

  //表单布局用的参数
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 6},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 14},
    },
  };


  function onLoadData(selectedOptions) {
    dispatch({
      type: 'basicInformation/changeCascaderOptions',
      payload: selectedOptions,
    });
  }


  function onChange(value, selectedOptions) {
    changeObject.province_id = value[0];
    changeObject.city_id = value[1];
    changeObject.zone_id = value[2];
  }

  const Option = {
    options: changeObject.cascaderOptions,
    placeholder: '请选择区域',
    onChange: onChange,
    loadData: onLoadData,
    style: {
      width: '210px'
    },
  };


  return (
    <Modal
      title="修改基本信息"
      visible={ addModal }
      onOk={ handleOk }
      onCancel={ editInfo }
    >
      <Form>
        <FormItem
          {...formItemLayout}
          label="姓名"
          hasFeedback
        >
          {getFieldDecorator('username', {
            initialValue: changeObject.username,
            rules: [{
              required: true, message: '请输入姓名',
            }],
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
          hasFeedback
        >
          {getFieldDecorator('email', {
            initialValue: changeObject.email,
            rules: [{
              required: true, message: '请输入邮箱',
            }],
          })(
            <Input type="email"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号"
          hasFeedback
        >
          {getFieldDecorator('mobile', {
            initialValue: changeObject.mobile,
            rules: [{
              required: true, message: '请输入手机号',
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
          {getFieldDecorator('shipper_company_name', {
            initialValue: changeObject.shipper_company_name,
            rules: [{
              required: true, message: '请输入公司地址',
            }],
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="公司详细地址"
          hasFeedback
        >
          {getFieldDecorator('shipper_company_address', {
            initialValue: changeObject.shipper_company_address,
            rules: [{
              required: true, message: '请输入公司详细地址',
            }],
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="所在地区"
          hasFeedback
        >
          <Cascader {...Option}/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="年龄"
          hasFeedback
        >
          {getFieldDecorator('age', {
            initialValue: changeObject.age,
            rules: [{
              required: true, message: '请输入年龄',
            }],
          })(
            <Input type="number"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="性别"
          hasFeedback
        >
          {getFieldDecorator('gender', {
            initialValue: "男",
            rules: [{
              required: true, message: '请选择性别',
            }],
          })(
            <Select>
              <Select.Option value="男">男</Select.Option>
              <Select.Option value="女">女</Select.Option>
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}


const WrappedAppForm = Form.create()(FormModal);

export default WrappedAppForm;

