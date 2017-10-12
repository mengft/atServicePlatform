import {  Form, Input, Icon, Select, Button,Row, Col, Card, Spin, message } from 'antd';
import { Link } from 'dva/router'
import { connect } from 'dva';
import style from './Account.css'

const FormItem = Form.Item;

const success = (msg) => {
  message.success(msg, 2.5);
};

const error = (msg) => {
  message.error(msg, 2.5);
};

function Register( { form, dispatch, loading, selectData } ) {

  const Option = Select.Option;

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
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 6,
      },
    },
  };

  function getCaptcha() {
    form.validateFields(['mobile'],(err,{ mobile}) => {
      if (!err) {
        console.log('Received values of form: ', mobile);
        dispatch({
          type:'account/getCaptcha',
          payload: {
            mobile,
            success,
            error,
          }
        });
      }
    })
  }

  function handleSubmit() {
    form.validateFields((err,{ mobile, password, code, roleid }) => {
      console.log('Received values of form: ', mobile + password + code + 'roleid' +roleid);
      if (!err) {
        dispatch({
          type:'account/register',
          payload: {
            mobile,
            password,
            code,
            roleid,
            success,
            error,
          }
        });
      }
    })
  }

  function checkConfirm(rule, value, callback) {
    dispatch({
      type:'account/setConfirmDirty',
      payload: { value,callback }
    })
  }

  function checkPassword(rule, value, callback) {
    dispatch({
      type:'account/checkPassword',
      payload: { value,callback }
    })
  }

  const { getFieldDecorator } = form;

  const selectOptions = [];

  for (let item of selectData) {
    selectOptions.push(<Option key={item.id}>{item.name}</Option>);
  }


  const height = document.body.clientHeight;
  return (
    <Row type="flex" justify="space-around" align="middle" style={{ height: height}} className={ style.row }>
      <Col style={{ width: 350 }}>
        <Card bordered={false} >
          <Spin spinning={ loading } tip="申请注册中">
            <h4 className={ style.title }>欢迎使用壹卡车服务商平台</h4>
            <Form onSubmit={ handleSubmit } className={ style.loginF }>
              <FormItem
                {...formItemLayout}
                label="手机:"
              >
                {getFieldDecorator('mobile', {
                  rules: [
                    { required: true, message: '请输入您的手机号码' },
                    { pattern: /^1[34578]\d{9}$/, message:'请输入正确手机号码'}
                  ],
                })(
                  <Input  prefix={<Icon type="mobile" style={{ fontSize: 13 }} />} type="tel" placeholder="请输入您的手机号码" style={{ width: '100%' }} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="验证码:"
              >
                <Row gutter={8}>
                  <Col span={10}>
                    {getFieldDecorator('code', {
                      rules: [
                        { required: true, message: '请输入验证码.' },
                        { len: 6, message: '请输入6位验证码.' }
                      ],
                    })(
                      <Input/>
                    )}
                  </Col>
                  <Col span={14}>
                    <Button onClick={ getCaptcha }>获取验证码</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="角色:"
              >
                {getFieldDecorator('roleid', {
                  rules: [
                    { required: true, message: '请选择角色!' },
                  ],
                })(
                  <Select>
                    { selectOptions }
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="输入密码:"
                hasFeedback
              >
                {getFieldDecorator('password', {
                  rules: [
                    {required: true, message: '请输入您的密码!',},
                    {validator: checkConfirm,}
                  ],
                })(
                  <Input type="password" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="确认密码:"
                hasFeedback
              >
                {getFieldDecorator('confirm', {
                  rules: [
                    {required: true, message: '请确认您的密码!',},
                    {validator: checkPassword,}],
                })(
                  <Input type="password"/>
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className={ style.loginFB }>注册</Button>
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button className={ style.loginFBack }><Link to="/login">&lt; 返回登录</Link></Button>
              </FormItem>
            </Form>
          </Spin>
        </Card>
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {
  return state['account'];
}

export default connect(mapStateToProps)(Form.create()(Register));

