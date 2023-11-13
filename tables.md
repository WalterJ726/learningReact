```javascript

import React, { useState } from 'react';
import { Table, Input, Button, TimePicker } from 'antd';
import moment from 'moment';

const MyComponent = () => {
  const [data, setData] = useState([]); // 存储表格数据
  const [selectedRows, setSelectedRows] = useState([]); // 存储选中的行
  const [selectedTime, setSelectedTime] = useState(null); // 存储选择的时间
  const [token, setToken] = useState(''); // 存储用户输入的token

  // 处理搜索
  const handleSearch = value => {
    // 发送请求获取数据
    fetch(`/api/branches?targetBranch=${value}`)
      .then(response => response.json())
      .then(data => setData(data));
  };

  // 处理行选择
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
  };

  // 处理时间选择
  const handleTimeChange = time => {
    setSelectedTime(time);
  };

  // 处理 token 输入
  const handleTokenChange = e => {
    setToken(e.target.value);
  };

  // 处理确认操作
  const handleSubmit = () => {
    const postData = {
      targetBranch: '用户输入的targetBranch',
      branches: selectedRows,
      time: selectedTime ? selectedTime.format('HH:mm') : '',
      token: token, // 添加 token 数据
    };

    // 发送POST请求
    fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
  };

  return (
    <div>
      <Input.Search placeholder="搜索 target branch" onSearch={handleSearch} />
      <Table rowSelection={rowSelection} dataSource={data} />
      <TimePicker format="HH:mm" onChange={handleTimeChange} />
      <Input.Password placeholder="输入 Token" onChange={handleTokenChange} />
      <Button onClick={handleSubmit}>确认</Button>
    </div>
  );
};

export default MyComponent;
```


## 展示页面
```
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import moment from 'moment';

const CountdownDisplay = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const duration = moment.duration(targetTime.diff(now));
      const formatted = `${duration.hours()}时${duration.minutes()}分${duration.seconds()}秒`;
      setTimeLeft(formatted);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return <div>距离 target branch 发车还有 {timeLeft}</div>;
};

const MyComponent = () => {
  const [branches, setBranches] = useState([]);
  const [targetBranch, setTargetBranch] = useState('');
  const [targetTime, setTargetTime] = useState(moment());

  // 获取初始数据
  useEffect(() => {
    fetch('/api/getBranchData')
      .then(response => response.json())
      .then(data => {
        setBranches(data.branches);
        setTargetBranch(data.targetBranch);
        setTargetTime(moment(data.targetTime));
      });
  }, []);

  // 定时轮询更新
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/getBranchStatus')
        .then(response => response.json())
        .then(data => {
          setBranches(data.branches); // 更新 branch 构建状态
        });
    }, 600000); // 每10分钟轮询一次

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <CountdownDisplay targetTime={targetTime} />
      <div>Target Branch: {targetBranch}</div>
      <Table dataSource={branches} columns={[{ title: 'Branch', dataIndex: 'branch' }, { title: 'Build Status', dataIndex: 'status' }]} />
    </div>
  );
};

export default MyComponent;

```javascript


