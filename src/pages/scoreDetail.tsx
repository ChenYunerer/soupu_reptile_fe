import React, { Component } from 'react';
import { Descriptions, Image, message } from 'antd';
import axios from 'axios';

class ScoreDetail extends Component {

  state = {
    id: undefined,
    scoreDetailInfo: undefined,
  };

  componentWillMount() {
    const { location } = this.props;
    this.state.id = location.query.id;
    if (this.state.id) {
      this.getScoreDetailInfo(this.state.id);
    }
  }

  getScoreDetailInfo(id) {
    axios.get('/admin/api/getScoreDetail', {
      params: {
        id: id,
      },
    }).then((httpResponse) => {
      this.setState({ scoreDetailInfo: httpResponse.data.data });
    }).catch((error) => {
      message.info(error.string);
    });
  }

  render() {
    const { scoreDetailInfo } = this.state;
    if (!scoreDetailInfo) {
      return null;
    }
    return <div>
      <Descriptions title={scoreDetailInfo.scoreName} style={{ marginTop: 20 }} column={3}>
        <Descriptions.Item label='类目'>{scoreDetailInfo.scoreCategory}</Descriptions.Item>
        <Descriptions.Item label='演唱'>{scoreDetailInfo.scoreSinger}</Descriptions.Item>
        <Descriptions.Item label='词曲'>{scoreDetailInfo.scoreAuthor}</Descriptions.Item>
        <Descriptions.Item label='来源'>{scoreDetailInfo.scoreOrigin}</Descriptions.Item>
        <Descriptions.Item label='上传'>{scoreDetailInfo.scoreUploader}</Descriptions.Item>
        <Descriptions.Item label='上传'>{scoreDetailInfo.scoreUploader}</Descriptions.Item>
        <Descriptions.Item label='上传时间'>{scoreDetailInfo.scoreUploadTime}</Descriptions.Item>
        <Descriptions.Item label='图片数量'>{scoreDetailInfo.scorePictureCount}</Descriptions.Item>
      </Descriptions>
      {scoreDetailInfo.picInfoList ? scoreDetailInfo.picInfoList.map(item => {
        return <Image src={'http://www.qupu123.com/' + item.scorePictureHref} />;
      }) : '没有曲谱图片......'}
    </div>;
  }
}

export default ScoreDetail;
