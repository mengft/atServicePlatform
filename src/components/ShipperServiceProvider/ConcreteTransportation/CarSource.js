import { Table, Row, Col } from 'antd'
import Cascader from './Cascader'
import { carTypeArray } from '../../../constants'

function ConcreteCarSourceComponent({ dispatch, data, pagination, loading, cascaderOptions }) {
  const columns = [{
    title: '始发城市',
    dataIndex: 'origin_address',
    key: 'origin_address',
    width: 300,
  }, {
    title: '目的城市',
    dataIndex: 'dest_address',
    key: 'dest_address',
    width: 300,
  }, {
    title: '属性',
    dataIndex: 'truck_length',
    key: 'truck_length',
    width: 200,
  }, {
    title: '车型',
    dataIndex: 'car_type',
    width: 200,
    render: (text, record, index) => {
      return (
        <div>{ carTypeArray[text] }</div>
      )
    }
  },{
    title: '联系人',
    dataIndex: 'username',
    key: 'username',
    width: 200,
  },{
    title: '电话',
    dataIndex: 'mobile',
    key: 'mobile',
    width: 200,
  }
  ];

  function handleTableChange(pagination) {
    const { current } = pagination;
    const originChange = localStorage.originChange;
    const detinationChange = localStorage.detinationChange;
    if ((originChange == undefined || originChange == '') && (detinationChange == undefined || detinationChange == '') )  {
      dispatch({
        type: 'concrete/fetch',
        payload:{
          current
        }
      });
    } else if (detinationChange == undefined || detinationChange == '') {
      dispatch({
        type: 'concrete/searchOrigin',
        payload:{
          current,
          value: JSON.parse(originChange),

        }
      });
    } else if (originChange == undefined || originChange == '') {
      dispatch({
        type: 'concrete/searchDestination',
        payload:{
          current,
          value: JSON.parse(originChange),
        }
      });
    }

  }

  function onOriginChange(value, selectedOptions) {
    localStorage.detinationChange = '';
    if (value.length > 0) {
      localStorage.originChange = JSON.stringify(value);
      dispatch({
        type:'concrete/searchOrigin',
        payload: {value ,current:1,},
      })
    } else {
      localStorage.originChange = '';
      dispatch({
        type: 'concrete/fetch',
        payload: {
          current: 1
        }
      });
    }
  }

  function onOriginLoadData(selectedOptions) {
    dispatch({
      type: 'concrete/changeCascaderOptions',
      payload: selectedOptions ,
    });
  }

  function onDestChange(value, selectedOptions) {
    localStorage.originChange = '';
    if (value.length > 0) {
      localStorage.detinationChange = JSON.stringify(value);
      dispatch({
        type:'concrete/searchDestination',
        payload: {value ,current:1,},
      })
    } else {
      localStorage.detinationChange = '';
      dispatch({
        type: 'concrete/fetch',
        payload: {
          current: 1
        }
      });
    }
  }


  const originOption = {
    options: cascaderOptions,
    placeholder: '请选择始发城市进行筛选',
    onChange: onOriginChange,
    loadData: onOriginLoadData,
    style: {
      width: '210px'
    },
  };

  const destOption = {
    options: cascaderOptions,
    placeholder: '请选择终点城市进行筛选',
    onChange: onDestChange,
    loadData: onOriginLoadData,
    style: {
      width: '210px'
    },
  };
  return (
    <div>
      <Row style={{ marginBottom: '20px' }}>
        <Col span={2}>
          <div>搜索:</div>
        </Col>
        <Col span={8}>
          始发地:<Cascader {...originOption}/>
        </Col>
        <Col span={8}>
          目的地:<Cascader {...destOption}/>
        </Col>
      </Row>
      <Table
        dataSource={data}
        columns={ columns }
        rowKey="timekey"
        loading= { loading }
        bordered
        pagination={pagination}
        onChange={ handleTableChange }
      />
    </div>
  )
}

export default ConcreteCarSourceComponent;
