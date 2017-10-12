import { Row, Col, Card, Form, Icon, Input, Button, Checkbox, Spin, message } from 'antd';
import { Link } from 'dva/router'
import { connect } from 'dva';
import style from './Account.css'
import { success, error } from '../../utils/noticeTips'

const FormItem = Form.Item;


function Login({ form, dispatch, loading }) {
  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, {userName ,password}) => {
      if (!err) {
        dispatch({
          type: 'account/login',
          payload: {
            success,
            error,
            username: userName,
            password: password,
          },
        });
      } else {
        message.error(err);
      }
    });
  }
  const { getFieldDecorator } = form;
  const height = document.body.clientHeight;
  return (
    <Row type="flex" justify="space-around" align="middle" style={{ height: height}} className={ style.row }>
      <Col style={{ width: 350 }}>
        <Card bordered={false} className={ style.card } >
          <Spin spinning={loading} tip="登录中">
            <h4 className={ style.title }>壹卡车服务商平台</h4>
            <Form onSubmit={ handleSubmit } className={ style.loginF }>
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入用户名' }],
                })(
                  <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                )}
              </FormItem>
              <FormItem>
                <Link to="/register">我要注册</Link><span className="ant-divider" /><Link to="/retrieve">忘记密码</Link>
                <Button type="primary" htmlType="submit" className={ style.loginFB }>
                  登录
                </Button>
              </FormItem>
            </Form>
          </Spin>
        </Card>
      </Col>
    </Row>
  );
}

function mapStateToProps(state) {
  return state['account'];
}

export default connect(mapStateToProps)(Form.create()(Login));
