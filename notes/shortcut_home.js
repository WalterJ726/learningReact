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
