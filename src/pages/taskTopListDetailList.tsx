import React, { Component } from 'react';
import { Button, Descriptions, Input, List, message } from 'antd';
import axios from 'axios';
import { Link } from 'umi';

class TaskTopListDetailList extends Component {

  state = {
    topTaskId: '',
    topListDetailInfoList: [],
  };

  componentWillMount() {
    const { location } = this.props;
    this.state.topTaskId = location.query.topTaskId;
  }

  render() {
    const { topListDetailInfoList, topTaskId } = this.state;

    const onChange = (e) => {
      this.setState({ topTaskId: e.target.value });
    };

    const onClick = () => {
      const { topTaskId } = this.state;

      if (topTaskId === '') {
        return;
      }
      axios.get('/admin/api/getTaskTopListDetailList', {
        params: {
          topTaskId: topTaskId,
        },
      }).then((httpResponse) => {
        if (!httpResponse.data.data) {
          this.setState({ topListDetailInfoList: [] });
        } else {
          this.setState({ topListDetailInfoList: httpResponse.data.data });
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
        dataSource={topListDetailInfoList}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<Link to={'/scoreSearch?searchValue=' + item.songName}>{item.songName}</Link>}
              description={
                <Descriptions style={{ marginTop: 20 }} column={3}>
                  <Descriptions.Item label='排名'>{item.sort}</Descriptions.Item>
                  <Descriptions.Item label='榜单名称'>{item.topListName}</Descriptions.Item>
                  <Descriptions.Item label='更新时间'>{item.topListUpdateTime}</Descriptions.Item>
                </Descriptions>
              }
            />
          </List.Item>
        )}
      />
    </div>;
  }
}

export default TaskTopListDetailList;
