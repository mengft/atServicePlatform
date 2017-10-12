import { Cascader } from 'antd';

function LazyOptions(option) {

  return (
    <Cascader
      expandTrigger="hover"
      {...option}
    />
  )
}

export default LazyOptions;
