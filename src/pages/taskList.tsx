import React, { Component } from 'react';
import { Button, Collapse, Descriptions, message } from 'antd';
import axios from 'axios';
import styles from './taskList.less';
import { history } from 'umi';

const { Panel } = Collapse;

class TaskList extends Component {

  state = {
    topTaskList: [],
  };

  taskStatus = new Map([[-1, '失败'], [0, '初始化'], [1, '处理中'], [2, '成功']]);


  componentDidMount() {
    axios.get('/admin/api/getTopTaskList').then((httpResponse) => {
      this.setState({ topTaskList: httpResponse.data.data });
    }).catch((error) => {
      console.log('error', error);
      message.info(error.string);
    });
  }

  renderCollapse(taskInfoWithSubChildList) {
    if (taskInfoWithSubChildList && taskInfoWithSubChildList.length === 0) {
      return null;
    }

    const getOnClick = (topTaskId) => {
      return (e) => {
        e.stopPropagation();
        console.log('e', e);
        history.push('/taskScoreList?topTaskId=' + topTaskId);
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
                                                          onClick={getOnClick(item.topTaskId)}>查看数据</Button> : null}
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
    const { topTaskList } = this.state;
    return this.renderCollapse(topTaskList);
  }
}

export default TaskList;
