import React, { useEffect, useState } from 'react';
import { Modal, Input, notification } from 'antd';

import type { PageSchema } from './types';

interface SchemaEditorProps {
  visible: boolean;
  schema: PageSchema;
  onCancel: () => void;
  onOk: (pageSchema: PageSchema) => void;
}

const SchemaEditor: React.FC<SchemaEditorProps> = ({ visible, schema, onCancel, onOk }) => {
  const [value, setValue] = useState('');

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValue(value);
  };
  const handleCancel = () => {
    onCancel();
  };
  const handleOk = () => {
    try {
      onOk(JSON.parse(value));
    } catch (error) {
      notification.error({
        message: 'JSON解析失败',
        description: error.message,
      });
    }
  };

  useEffect(() => {
    if (visible) {
      setValue(JSON.stringify(schema, null, 2));
    }
  }, [visible, setValue, schema]);

  return (
    <Modal
      title="编辑页面"
      visible={visible}
      width={800}
      centered
      maskClosable={false}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Input.TextArea rows={16} value={value} onChange={handleValueChange} />
    </Modal>
  );
};

export default SchemaEditor;
