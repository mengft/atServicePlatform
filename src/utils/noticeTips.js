import { message } from 'antd';

const success = (msg) => {
  message.success(msg, 2);
};

const error = (msg) => {
  message.error(msg, 2);
};

const warning = (msg) => {
  message.warning(msg, 2);
};

export default {
  success,
  error,
  warning,
}



