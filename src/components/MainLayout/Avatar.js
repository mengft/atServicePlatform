import { Link } from 'dva/router'
import { Menu, Dropdown, Icon ,Avatar} from 'antd';


function AvatarComponent({exit}){
  const userInfo = JSON.parse(localStorage.userInfo);
  const name = userInfo.realname.slice(0, 1);
  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={ exit }>退出</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Avatar size="large" style={{ marginTop: '10px', fontSize: '20px'}}>
        { name }
      </Avatar>
    </Dropdown>
  )
};

export default AvatarComponent;
