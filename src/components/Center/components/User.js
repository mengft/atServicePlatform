import React from 'react'
import { Button } from 'antd'
import styles from './user.less'

import EditModal from './userEditModal'

import * as Region from '../../../utils/region';


function User({ dispatch, addModal ,avatar,province_id, city_id, zone_id, email, username, mobile, shipper_company_name, shipper_company_address, age,  gender, changeObject, region  }) {
  function editInfo() {
    dispatch({
      type: 'basicInformation/triggerModal',
    })
  }

  const p = Region.provinces.find((value) => {
    return value.id = province_id;
  });
  const c = Region.cities.find((value) => {
    return value.id = city_id;
  });
  const z = Region.zones.find((value) => {
    return value.id = zone_id;
  });

  const editModalOpts = {
    dispatch,
    addModal,
    editInfo,
    changeObject,
  };

  return (<div className={styles.user}>
    <div className={styles.header}>
      <div className={styles.headerinner}>
        <div className={styles.avatar} style={{ backgroundImage: `url(${avatar})` }}/>
        <h5 className={styles.name}>{name}</h5>
        <p>{ email }</p>
      </div>
    </div>
    <div className={styles.number}>
      <div className={styles.left}>
        <p>姓名:</p>
        <p>手机号:</p>
        <p>公司名:</p>
        <p>公司地址:</p>
        <p>所在地区:</p>
        <p>年龄:</p>
        <p>性别:</p>
      </div>
      <div className={styles.right}>
        <p>{ username }</p>
        <p>{ mobile }</p>
        <p>{ shipper_company_name }</p>
        <p>{ shipper_company_address }</p>
        <p>{ p ? p.name : null }-{ c ? c.name : null  }-{z ? z.name : null }</p>
        <p>{ age }</p>
        <p>{ gender }</p>
      </div>
    </div>
    <div className={styles.footer}>
      <Button type="ghost" size="large" onClick={ editInfo }>修改个人信息</Button>
    </div>
    <EditModal {...editModalOpts} />
  </div>)
}


export default User

