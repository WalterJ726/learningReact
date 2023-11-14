### 不带删除和持久化存储
```javascipt
import React, { useState } from 'react';
import { Input, Button, Card, Modal, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ShortcutModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="添加快捷方式"
      okText="添加"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item name="title" label="名称" rules={[{ required: true, message: '请输入快捷方式的名称!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="url" label="网址" rules={[{ required: true, message: '请输入快捷方式的网址!' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const App = () => {
  const [shortcuts, setShortcuts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const createShortcut = values => {
    setShortcuts([...shortcuts, values]);
    setModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
        Add Shortcut
      </Button>
      <ShortcutModal
        visible={modalVisible}
        onCreate={createShortcut}
        onCancel={() => setModalVisible(false)}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {shortcuts.map((shortcut, index) => (
          <Card key={index} style={{ width: 200, margin: 10 }}>
            <Card.Meta
              title={shortcut.title}
              description={<a href={shortcut.url} target="_blank" rel="noopener noreferrer">{shortcut.url}</a>}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default App;

```



### 带持久化存储
```javascript

import { makeAutoObservable } from 'mobx';

class ShortcutStore {
  shortcuts = [];

  constructor() {
    makeAutoObservable(this);
    this.loadShortcuts();
  }

  addShortcut(shortcut) {
    this.shortcuts.push(shortcut);
    this.saveShortcuts();
  }

  removeShortcut(index) {
    this.shortcuts.splice(index, 1);
    this.saveShortcuts();
  }

  saveShortcuts() {
    localStorage.setItem('shortcuts', JSON.stringify(this.shortcuts));
  }

  loadShortcuts() {
    const storedShortcuts = localStorage.getItem('shortcuts');
    if (storedShortcuts) {
      this.shortcuts = JSON.parse(storedShortcuts);
    }
  }
}

export const shortcutStore = new ShortcutStore();




```

### 使用store

```javascript
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Input, Button, Card, Modal, Form } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { shortcutStore } from './stores/ShortcutStore';

const ShortcutModal = observer(({ visible, onCreate, onCancel }) => {
  // ...（与之前的 ShortcutModal 组件相同）
});

const App = observer(() => {
  const [modalVisible, setModalVisible] = useState(false);

  const createShortcut = values => {
    shortcutStore.addShortcut(values);
    setModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
        Add Shortcut
      </Button>
      <ShortcutModal
        visible={modalVisible}
        onCreate={createShortcut}
        onCancel={() => setModalVisible(false)}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {shortcutStore.shortcuts.map((shortcut, index) => (
          <Card key={index} style={{ width: 200, margin: 10 }}>
            <Card.Meta
              title={shortcut.title}
              description={<a href={shortcut.url} target="_blank" rel="noopener noreferrer">{shortcut.url}</a>}
            />
            <Button type="danger" icon={<DeleteOutlined />} onClick={() => shortcutStore.removeShortcut(index)}>
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
});

export default App;


```