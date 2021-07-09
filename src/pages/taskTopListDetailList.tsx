import React, { Component } from 'react';
import { Button, Descriptions, Input, List, message, Select } from 'antd';
import axios from 'axios';
import { Link } from 'umi';

const { Option } = Select;

class TaskTopListDetailList extends Component {

  state = {
    topTaskId: '',
    topListDetailInfoList: [],
    topListUpdateTime: '',
    topListDateList: ['全部'],
  };

  componentWillMount() {
    const { location } = this.props;
    this.state.topTaskId = location.query.topTaskId;
    this.getTopListDateList();
  }

  getTopListDateList() {
    const { topListDateList } = this.state;
    axios.get('/admin/api/getTopListAllDate').then((httpResponse) => {

      topListDateList.push(httpResponse.data.data);
      this.setState({ topListDateList: topListDateList });

    }).catch((error) => {
      message.info(error.string);
    });
  }

  render() {
    const { topListDetailInfoList, topTaskId, topListDateList } = this.state;

    const onChange = (e) => {
      this.setState({ topTaskId: e.target.value });
    };

    const onClick = () => {
      const { topTaskId, topListUpdateTime } = this.state;

      axios.get('/admin/api/getTaskTopListDetailList', {
        params: {
          topTaskId: topTaskId,
          topListUpdateTime: topListUpdateTime,
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

    const handleChange = (value) => {
      this.state.topListUpdateTime = value;
    };

    return <div>

      <Input prefix={<span>TopTaskId：</span>} defaultValue={topTaskId} placeholder={'TopTaskId'} onChange={onChange} />
      <div style={{ marginTop: 20 }}>
        <span>更新时间: </span>
        <Select defaultValue={topListDateList[0] ? topListDateList[0] : ''} style={{ width: 300 }}
                onChange={handleChange}>
          {topListDateList.map(item => {
            return <Option value={item}>{item}</Option>;
          })}
        </Select>
      </div>
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
