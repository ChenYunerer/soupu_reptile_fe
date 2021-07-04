import React, { Component } from 'react';
import { Button, Descriptions, Input, List, message } from 'antd';
import axios from 'axios';
import { Link } from 'umi';

class TaskScoreList extends Component {

  state = {
    topTaskId: '',
    scoreList: [],
  };

  componentWillMount() {
    const { location } = this.props;
    this.state.topTaskId = location.query.topTaskId;
  }

  render() {
    const { scoreList, topTaskId } = this.state;

    const onChange = (e) => {
      console.log('e', this);
      this.setState({ topTaskId: e.target.value });
    };

    const onClick = () => {
      const { topTaskId } = this.state;

      if (topTaskId === '') {
        return;
      }
      axios.get('/admin/api/getTaskScoreList', {
        params: {
          topTaskId: topTaskId,
        },
      }).then((httpResponse) => {
        if (!httpResponse.data.data) {
          this.setState({ scoreList: [] });
        } else {
          this.setState({ scoreList: httpResponse.data.data });
        }

      }).catch((error) => {
        message.info(error.string);
      });
    };
    return <div>

      <Input prefix={<span>TopTaskId：</span>} defaultValue={topTaskId} placeholder={'TopTaskId'} onChange={onChange} />
      <Button style={{ marginTop: 20 }} type={'primary'} onClick={onClick}>搜索</Button>
      <List
        style={{ marginTop: 20 }}
        itemLayout='horizontal'
        dataSource={scoreList}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<Link to={'/scoreDetail?id=' + item.id}>{item.scoreName}</Link>}
              description={
                <Descriptions style={{ marginTop: 20 }} column={3}>
                  <Descriptions.Item label='类目'>{item.scoreCategory}</Descriptions.Item>
                  <Descriptions.Item label='演唱'>{item.scoreSinger}</Descriptions.Item>
                  <Descriptions.Item label='词曲'>{item.scoreAuthor}</Descriptions.Item>
                  <Descriptions.Item label='来源'>{item.scoreOrigin}</Descriptions.Item>
                  <Descriptions.Item label='上传'>{item.scoreUploader}</Descriptions.Item>
                  <Descriptions.Item label='上传'>{item.scoreUploader}</Descriptions.Item>
                  <Descriptions.Item label='上传时间'>{item.scoreUploadTime}</Descriptions.Item>
                  <Descriptions.Item label='图片数量'>{item.scorePictureCount}</Descriptions.Item>
                </Descriptions>
              }
            />
          </List.Item>
        )}
      />
    </div>;
  }
}

export default TaskScoreList;
