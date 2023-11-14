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

### 含有Dropdown menu的代码
```javascript
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Card, Modal, Form, Input, Button, Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { shortcutStore } from './stores/ShortcutStore';

const EditShortcutModal = observer(({ visible, onEdit, onCancel, initialData }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="编辑快捷方式"
      okText="保存"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onEdit(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={initialData}>
        <Form.Item name="title" label="名称" rules={[{ required: true, message: '请输入快捷方式的名称!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="url" label="网址" rules={[{ required: true, message: '请输入快捷方式的网址!' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
});

const App = observer(() => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingShortcut, setEditingShortcut] = useState({});

  const handleMenuClick = (shortcut, index, e) => {
    if (e.key === 'edit') {
      setEditingShortcut({ ...shortcut, index });
      setEditModalVisible(true);
    } else if (e.key === 'delete') {
      shortcutStore.removeShortcut(index);
    }
  };

  const handleEdit = editedShortcut => {
    shortcutStore.editShortcut(editingShortcut.index, editedShortcut);
    setEditModalVisible(false);
  };

  const menu = (shortcut, index) => (
    <Menu onClick={e => handleMenuClick(shortcut, index, e)}>
      <Menu.Item key="edit">Edit Shortcut</Menu.Item>
      <Menu.Item key="delete">Remove Shortcut</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {shortcutStore.shortcuts.map((shortcut, index) => (
          <Card key={index} style={{ width: 200, margin: 10 }}>
            <Dropdown overlay={menu(shortcut, index)} trigger={['click']}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <MoreOutlined />
              </a>
            </Dropdown>
            <Card.Meta
              title={shortcut.title}
              description={shortcut.url}
            />
          </Card>
        ))}
      </div>
      <EditShortcutModal
        visible={editModalVisible}
        onEdit={handleEdit}
        onCancel={() => setEditModalVisible(false)}
        initialData={editingShortcut}
      />
    </div>
  );
});

export default App;

```