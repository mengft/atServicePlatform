import { Form, Input, Icon, Button, Modal, Select, InputNumber, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import moment from 'moment';


function FormModal({ showModal, form, dispatch, handleCancel, companyList, current, carTypeValueLabel, truckLength, changeObject}) {
  const { validateFields, getFieldDecorator, setFieldsValue} = form;

  //点击Modal 里面的确认按钮
  function handleOk() {
    validateFields((errors, value) => {
      if (errors) {
        return
      } else {

        console.log(value);
        dispatch({
          type: 'vehicleManagement/editTruck',
          payload: {
            ...value,
            checkin_date: moment(value['checkin_date']).format('YYYY-MM-DD'),
            insurance_date: moment(value['insurance_date']).format('YYYY-MM-DD'),
            id: changeObject.id,
          }
        });
        dispatch({type:'vehicleManagement/triggerModal'});
        dispatch({
          type: 'vehicleManagement/fetchVehicleList',
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
      xs: {span: 24},
      sm: {span: 6},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 14},
    },
  };

  const carTypeArray = ['平板', '高栏', '厢式', '危险品', '冷藏', '高低板', '搅拌车', '泵车', '自卸车', '其它'];

  const options = companyList.map(d => <Option key={ String(d.id) } value={ String(d.id) }>{d.name}</Option>);
  const carTypeOpionts = carTypeArray.map((v, index) => <Option key={ String(index) - 1 }
                                                                value={ String(index + 1) }>{ v }</Option>);
  const truckLengthOptions = truckLength.map((v, index) => <Option key={ String(index) + 1 }
                                                                   value={ v.name }>{ v.name }</Option>);
  //              value={ changeObject.company_id }



  function handleChangeCarType(value) {
    console.log(value);
    if (value == '7') {
      dispatch({
        type: 'vehicleManagement/changeCarTypeLabel',
        payload: {
          value: '罐体方量'
        }
      });
    } else if (value == '9') {
      dispatch({
        type: 'vehicleManagement/changeCarTypeLabel',
        payload: {
          value: '吨位'
        }
      });
    } else {
      dispatch({
        type: 'vehicleManagement/changeCarTypeLabel',
        payload: {
          value: '车辆长度'
        }
      });
    }
  }

  const config = {
    rules: [{ type: 'object', required: true, message: '请选择登记日期' }],
  };

  return (
    <Modal
      title="添加一条车辆信息"
      visible={ showModal }
      onOk={ handleOk }
      onCancel={ handleCancel }
      style={{ top: '30px' }}
    >
      <Form>
        <FormItem
          {...formItemLayout}
          label="车牌号"
          hasFeedback
        >
          {getFieldDecorator('car_num', {
            initialValue: changeObject.car_num,
            rules: [
              {required: true, message: '请输入车牌号',},
              {pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/, message:'请输入正确格式车牌号码'}
            ],
          })(
            <Input type="text" placeholder="请输入车牌号"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="车主姓名"
          hasFeedback
        >
          {getFieldDecorator('c_username', {
            initialValue: changeObject.c_username,
            rules: [{
              required: true, message: '请输入车主姓名',
            }],
          })(
            <Input type="text" placeholder="请输入车主姓名"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="车主身份证"
          hasFeedback
        >
          {getFieldDecorator('c_id_num', {
            initialValue: changeObject.c_id_num,
            rules: [{
              required: true, message: '请输入车主身份证号',
            }, {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确格式的身份证号'}
            ],
          })(
            <Input type="text" placeholder="请输入车主身份证号"/>
          )}
        </FormItem>
        <FormItem
          label="挂靠公司"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('company_id', {
            rules: [{required: true, message: '请选择挂靠公司'}],
          })(
            <Select
              placeholder="请选择挂靠公司"
            >
              { options }
            </Select>
          )}
        </FormItem>
        <FormItem
          label="车牌类型"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('car_num_type', {
            rules: [{required: true, message: '请选择车牌类型'}],
          })(
            <Select
              placeholder="请选择车牌类型"
            >
              <Option value="0">小型</Option>
              <Option value="1">大型</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="车辆类型"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('car_type', {
            rules: [{required: true, message: '请选择车辆类型'}],
          })(
            <Select
              placeholder="请选择车辆类型"
              onChange={ handleChangeCarType }
            >
              { carTypeOpionts }
            </Select>
          )}
        </FormItem>
        { carTypeValueLabel == '车辆长度' ?
          <FormItem
            {...formItemLayout}
            label={ carTypeValueLabel }
            hasFeedback
          >
            {getFieldDecorator('car_type_value', {
              rules: [{
                required: true, message: '请输入值',
              }],
            })(
              <Select
                placeholder="请选择车辆长度"
                onChange={ handleChangeCarType }
              >
                { truckLengthOptions }
              </Select>
            )}
          </FormItem> : null }
        { carTypeValueLabel == '罐体方量' ?
          <FormItem
            {...formItemLayout}
            label={ carTypeValueLabel }
            hasFeedback
          >
            <InputNumber  placeholder='单位m³'/>
          </FormItem> : null }

        { carTypeValueLabel == '吨位' ?
          <FormItem
            {...formItemLayout}
            label={ carTypeValueLabel }
            hasFeedback
          >
            <InputNumber  placeholder='单位吨'/>
          </FormItem> : null }
        <FormItem
          {...formItemLayout}
          label="发动机号"
          hasFeedback
        >
          {getFieldDecorator('engine_num', {
            initialValue: changeObject.engine_num,
            rules: [{
              required: true, message: '请输入发动机号',
            }],
          })(
            <Input type="text" placeholder="请输入发动机号"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="车架号"
          hasFeedback
        >
          {getFieldDecorator('frame_num', {
            initialValue: changeObject.frame_num,
            rules: [{
              required: true, message: '请输入车架号',
            }],
          })(
            <Input type="text" placeholder="请输入车架号"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="登记日期"
        >
          {getFieldDecorator('checkin_date', {
            initialValue: moment(changeObject.checkin_date),
            rules: [{ type: 'object', required: true, message: '请选择登记日期' }],
          })(
            <DatePicker />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="保险到期日期"
        >
          {getFieldDecorator('insurance_date', {
            initialValue: moment(changeObject.insurance_date),
            rules: [{ type: 'object', required: true, message: '请选择保险到期日期' }],
          })(
            <DatePicker/>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}


const WrappedAppForm = Form.create()(FormModal);

export default WrappedAppForm;

