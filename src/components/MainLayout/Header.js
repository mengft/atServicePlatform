import { Layout, Row, Col } from 'antd';
import { Link } from 'dva/router'
import Avatar from './Avatar'

const { Header } = Layout;


function atHeader( { exit } ) {
  return (
    <Header className="header">
      <Row>
        <Col span={20}><Link to="/index">壹卡车服务商平台</Link></Col>
        <Col span={4}>
          <Row type="flex" justify="end" align="middle">
            <Col>
              <Avatar exit={ exit } />
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  )
}

export default atHeader;
