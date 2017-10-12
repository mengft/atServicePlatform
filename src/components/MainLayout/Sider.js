import { Menu, Icon } from 'antd';
import { Link } from 'dva/router'

const { SubMenu, ItemGroup  }= Menu;

const height = (document.body.clientHeight - 130) + 'px' ;

class Sider extends React.Component {
  state = {
    current: 'users',
    openKeys: [],
  };
  handleClick = (e) => {
    this.setState({ current: e.key });
  };
  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  };
  getAncestorKeys = (key) => {
    const map = {
      servicesProduct:['affiliatedServiceProviders'],
      concreteTransportation: ['shipperServiceProvider'],
      specialLineTransportation: ['shipperServiceProvider'],
      driverFinancialManage: ['financialServiceProvider'],
      shipperFinancialManage: ['financialServiceProvider'],
    };
    return map[key] || [];
  };
  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        style={{
          width: 200,
          maxHeight: height,
          overflowY: 'auto',
         }}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
        theme="dark"
        style={{ 'maxHeight': '673px'}}
      >
        <Menu.Item key="index">
          <Link to="/index">
            <Icon type="home"/>首页
          </Link>
        </Menu.Item>
        <SubMenu key="center" title={<span><Icon type="mail" /><span>服务商中心</span></span>}>
          <Menu.Item key="basicInfo">
            <Link to="/basicInfo">
              基本信息
            </Link>
          </Menu.Item>
          <Menu.Item key="services">
            <Link to="/index">
              服务订单管理()
            </Link>
          </Menu.Item>
          <Menu.Item key="myNews">
            <Link to="/index">
              我的消息()
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="shipperServiceProvider" title={<span><Icon type="appstore" /><span>货主服务商</span></span>}>
          <SubMenu key="concreteTransportation"  title="混凝土运输">
            <Menu.Item key="concrete_deliver">
              <Link to="/concrete_deliver">
                发货管理
              </Link>
            </Menu.Item>
            <Menu.Item key="concrete_car_source">
              <Link to="/concrete_car_source">
                车源管理
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu  key="specialLineTransportation"  title="专线运输">
            <Menu.Item key="sl_deliver">
              <Link to="/special_line_deliver">
                发货管理
              </Link>
            </Menu.Item>
            <Menu.Item key="sl_car_source">
              <Link to="/special_line_car_source">
                车源管理
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="sl_order">
            <Link to="/concrete_order">
              订单列表
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="affiliatedServiceProviders" title={<span><Icon type="team" /><span>挂靠服务商</span></span>}>
          <Menu.Item key="shipInfo">
            <Link to="/shipInfo">
              公司管理
              {/* 原来服务商中心 模块的 运输公司信息 所以关键字 为 shipInfo  找内容要到相关的 路径去找.*/}
            </Link>
          </Menu.Item>
          <SubMenu key="servicesProduct"  title="服务产品">
            <Menu.Item key="payViolation">
              <Link to="/traffic_affiliate">
                车务产品
              </Link>
            </Menu.Item>
            <Menu.Item key="vehicleInsurance">
              <Link to="/insurance_affiliate">
                汽车保险
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="vehicleMg">
            <Link to="/vehicleMg">
              车辆管理
            </Link>
          </Menu.Item>
          <Menu.Item key="annual">
            <Link to="/index">
              年审管理()
            </Link>
          </Menu.Item>
          <Menu.Item key="insuranceManage">
            <Link to="/index">
              保险管理()
            </Link>
          </Menu.Item>
          <Menu.Item key="gps">
            <Link to="/index">
              定位管理()
            </Link>
          </Menu.Item>
          <Menu.Item key="pushNotification">
            <Link to="/index">
              推送消息()
            </Link>
          </Menu.Item>
          
        </SubMenu>
        <SubMenu key="carDealers" title={<span><Icon type="pay-circle" /><span>卖车经销商</span></span>}>
          <Menu.Item key="dealersInformation">
            <Link to="/dealersInfo">
              经销商信息
            </Link>
          </Menu.Item>
          <Menu.Item key="newCarSource">
            <Link to="/dealersCarSource">
              新车车源
            </Link>
          </Menu.Item>
          <Menu.Item key="inquiryManagement">
            <Link to="/inquiry">
              询价管理
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="financialServiceProvider" title={<span><Icon type="area-chart" /><span>金融服务商</span></span>}>
          <SubMenu  key="driverFinancialManage"  title="司机金融">
            <Menu.Item key="order">
              <Link to="/driverFinPro">
                产品设置
              </Link>
            </Menu.Item>
            <Menu.Item key="ordersManagement">
              <Link to="/driverFinOrder">
                订单管理
              </Link>
            </Menu.Item>
            <Menu.Item key="customerManagement">
              <Link to="/driverFinCustomer">
                客户管理
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu  key="shipperFinancialManage"  title="货主金融">
            <Menu.Item key="shipperOrder">
              <Link to="/shipperFinPro">
                产品设置
              </Link>
            </Menu.Item>
            <Menu.Item key="shipperOrders">
              <Link to="/shipperFinOrder">
                订单管理
              </Link>
            </Menu.Item>
            <Menu.Item key="shipperCustomer">
              <Link to="/shipperFinCustomer">
                客户管理
              </Link>
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="trafficService" title={<span><Icon type="car" /><span>车务服务商</span></span>}>
          <Menu.Item key="trafficOrder">
            <Link to="/traffic_product">
              产品设置
            </Link>
          </Menu.Item>
          <Menu.Item key="trafficOrders">
            <Link to="/traffic_order">
              订单管理
            </Link>
          </Menu.Item>
          <Menu.Item key="trafficCustomer">
            <Link to="/traffic_customer">
              客户管理
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="commercialService" title={<span><Icon type="bank" /><span>商事服务商</span></span>}>
          <Menu.Item key="commercialOrder">
            <Link to="/index">
              产品设置()
            </Link>
          </Menu.Item>
          <Menu.Item key="commercialOrders">
            <Link to="/index">
              订单管理()
            </Link>
          </Menu.Item>
          <Menu.Item key="commercialCustomer">
            <Link to="/index">
              客户管理()
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="insuranceService" title={<span><Icon type="safety" /><span>保险经销商</span></span>}>
          <Menu.Item key="insuranceOrder">
            <Link to="/insurance_product">
              产品设置
            </Link>
          </Menu.Item>
          <Menu.Item key="insuranceCustomer">
            <Link to="/insurance_customer">
              客户管理
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="set" title={<span><Icon type="setting" /><span>设置</span></span>}>

        </SubMenu>
      </Menu>

    );
  }
}

export default Sider;
