import {  Form, Input, Tooltip, Icon, Steps, Cascader, Select, Button, AutoComplete,Row, Col, Card, Checkbox, Spin, message } from 'antd';
import { Link } from 'dva/router'
import { connect } from 'dva';
import style from './Account.css'
const Step = Steps.Step;

const FormItem = Form.Item;

function Retrieve( { dispatch, current, phoneNum, verCode, passWord } ) {

  function next() {
    if(current == 0){
      dispatch({
        type:'account/getVerCode',
        payload:{
          mobile:phoneNum
        }

      })
    }
    dispatch({
      type:'account/nextStep'
    })
  }

  function prev() {
    dispatch({
      type:'account/prevStep'
    })
  }

  function changePhoneNum(event){
    dispatch({
        type:'account/changePhoneNum',
        payload:{
          phoneNum:event.target.value
        }

    })
  }

  function changeVerCode(event){
    dispatch({
        type:'account/changeVerCode',
        payload:{
          verCode:event.target.value
        }

    })
  }

  function changePassWord(event){
    dispatch({
        type:'account/changePassWord',
        payload:{
          passWord:event.target.value
        }

    })
  }

  function complete(){
    alert("phoneNum:"+phoneNum+";verCode:"+verCode+";passWord:"+passWord);
      dispatch({
          type:'account/resetPass',
          payload:{
            mobile:phoneNum,
            verCode:verCode,
            passWord:passWord
          }
     })
    message.success('Processing complete!');
  }

  const steps = [{
    title: '第一步',
    content: '请输入手机号码：',
  }, {
    title: '第二步',
    content: '请输入短信验证码：',
  }, {
    title: '第三步',
    content: '请设置新的密码：',
  }];

  const height = document.body.clientHeight;
  return (
    <Row type="flex" justify="space-around" align="middle" style={{ height: height}} className={ style.row }>
      <Col style={{ width: 450 }}>
        <Card bordered={false}>
          <h4 className={ style.title }>找回密码</h4>
          <div>
            <Steps current={current}>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <div className={ style.stepsContent }>
              {steps[current].content}
              {
                current === 0 
                &&
                <Input style={{ width: '120px' }} onChange={changePhoneNum} defaultValue={phoneNum}/> 
              }
              {
                current === 1 
                &&
                <Input style={{ width: '120px' }} onChange={changeVerCode} defaultValue={verCode}/> 
              }
              {
                current === 2 
                &&
                <Input style={{ width: '120px' }} onChange={changePassWord} defaultValue={passWord}/>
              }
            </div>
            <div className={ style.stepsAction } >
              {
                current === 0
                &&
                <Link className={ style.goLogin } to="">&lt;返回登录界面</Link>
              }
              {
                current > 0
                &&
                <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                  上一步
                </Button>
              }
              {
                current === 0
                &&
                <Button type="primary" onClick={() => next()}>下一步</Button>
              }
              {
                current === 1
                &&
                <Button type="primary" onClick={() => next()}>下一步</Button>
              }
              {
                current === steps.length - 1
                &&
                <Button type="primary" onClick={() => complete()}>完成</Button>
              }
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {
  return state['account'];
}

export default connect(mapStateToProps)(Form.create()(Retrieve));

