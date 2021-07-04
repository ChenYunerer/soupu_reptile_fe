import React from 'react';
import { Descriptions, message } from 'antd';
import axios from 'axios';


class Index extends React.Component {

  state = {
    taskGeneralInfo: null,
    scoreGeneralInfo: null,
  };

  componentWillMount() {
    this.getTaskGeneralInfo();
    this.getScoreGeneralInfo();
  }

  getTaskGeneralInfo() {
    axios.get('/admin/api/getTaskGeneralInfo')
      .then((httpResponse) => {
        this.setState({ taskGeneralInfo: httpResponse.data.data });
      }).catch((error) => {
      message.info(error.string);
    });
  }

  getScoreGeneralInfo() {
    axios.get('/admin/api/getScoreGeneralInfo')
      .then((httpResponse) => {
        this.setState({ scoreGeneralInfo: httpResponse.data.data });
      }).catch((error) => {
      message.info(error.string);
    });
  }

  render() {
    const { taskGeneralInfo, scoreGeneralInfo } = this.state;

    return <div>
      {taskGeneralInfo ? <Descriptions title={'爬虫任务信息'} style={{ marginTop: 20 }} column={3}>
        <Descriptions.Item label='任务总数'>{taskGeneralInfo.taskNum}</Descriptions.Item>
        <Descriptions.Item label='成功'>{taskGeneralInfo.successNum}</Descriptions.Item>
        <Descriptions.Item label='失败'>{taskGeneralInfo.failNum}</Descriptions.Item>
      </Descriptions> : null}
      {scoreGeneralInfo ? <Descriptions title={'曲谱信息'} style={{ marginTop: 20 }} column={3}>
        <Descriptions.Item label='曲谱总数'>{scoreGeneralInfo.scoreNum}</Descriptions.Item>
        <Descriptions.Item label='图片总数'>{scoreGeneralInfo.picNum}</Descriptions.Item>
      </Descriptions> : null}
    </div>;
  }
}

export default Index;
