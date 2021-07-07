import React, { Component } from 'react';
import { Button, Collapse, Descriptions, message, Select } from 'antd';
import axios from 'axios';
import styles from './taskList.less';
import { history } from 'umi';

const { Panel } = Collapse;
const { Option } = Select;

class TaskList extends Component {

  state = {
    taskType: '',
    topTaskList: [],
  };

  selectInfo = [
    {
      name: '所有',
      value: '',
    },
    {
      name: '中国曲谱网爬虫任务',
      value: '1',
    },
    {
      name: '网易云榜单任务',
      value: '2',
    },
  ];

  taskStatus = new Map([[-1, '失败'], [0, '初始化'], [1, '处理中'], [2, '成功']]);


  componentDidMount() {
    this.getTaskListInfo();
  }

  getTaskListInfo() {
    const { taskType } = this.state;
    axios.get('/admin/api/getTopTaskList', {
      params: {
        taskType: taskType,
      },
    }).then((httpResponse) => {
      this.setState({ topTaskList: httpResponse.data.data });
    }).catch((error) => {
      console.log('error', error);
      message.info(error.string);
    });
  }

  renderCollapse(taskInfoWithSubChildList) {
    if (!taskInfoWithSubChildList || taskInfoWithSubChildList.length === 0) {
      return null;
    }

    const getOnClick = (topTaskInfo) => {
      return (e) => {
        e.stopPropagation();
        if (topTaskInfo.taskType === 1) {
          history.push('/taskScoreList?topTaskId=' + topTaskInfo.topTaskId);
        } else if (topTaskInfo.taskType === 2) {
          history.push('/taskTopListDetailList?topTaskId=' + topTaskInfo.topTaskId);
        }
      };
    };

    return (
      <div>
        <Collapse className={styles.Collapse} ghost={true}>
          {taskInfoWithSubChildList.map((item) => {
            return <Panel header={
              <span className={styles.title}>
                {item.taskName + ' · ' + this.taskStatus.get(item.taskStatus)}
                {item.taskId === item.topTaskId ? <Button style={{ marginLeft: 20 }} size={'small'}
                                                          onClick={getOnClick(item)}>查看数据</Button> : null}
              </span>
            }
                          key={item.taskId} className={styles.Panel}>
              <div>
                <Descriptions column={2}>
                  <Descriptions.Item label='时间消耗'>{item.taskTimeConsume + ' 秒'}</Descriptions.Item>
                  <Descriptions.Item label='开始时间'>{item.taskStartTime}</Descriptions.Item>
                  <Descriptions.Item label='数据量'>{item.taskProcessDataNum}</Descriptions.Item>
                  <Descriptions.Item label='结束时间'>{item.taskEndTime}</Descriptions.Item>
                </Descriptions>
                {item.subTaskList ? this.renderCollapse(item.subTaskList) : null}
              </div>
            </Panel>;
          })}
        </Collapse>
        <div>

        </div>
      </div>
    );
  }


  render() {
    const handleChange = (value) => {
      this.state.taskType = value;
      this.getTaskListInfo();
    };

    const { topTaskList } = this.state;
    return <>
      <div>
        <span>任务类型: </span>
        <Select defaultValue={this.selectInfo[0].name} style={{ width: 300 }} onChange={handleChange}>
          {this.selectInfo.map(item => {
            return <Option value={item.value}>{item.name}</Option>;
          })}
        </Select>
      </div>
      <div style={{ marginTop: 20 }} />
      {this.renderCollapse(topTaskList)}
    </>
      ;
  }
}

export default TaskList;
