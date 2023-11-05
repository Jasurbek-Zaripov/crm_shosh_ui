import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { Button, Col, DatePicker, Form, Input, Modal, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const dateFormat = 'YYYY-MM-DD';

export default function ModalUserEdit({ parentAction: { user, onUpdate, onDelete, setUser } }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    if (user) {
      user.dateof = user.dateof ? dayjs(user.dateof, dateFormat) : null;
      user.birthday = user.birthday ? dayjs(user.birthday, dateFormat) : null;
      form.setFieldsValue(user);
    }
  }, [user]);

  return (
    <Modal
      forceRender={true}
      open={!!user}
      centered
      width={'80%'}
      bodyStyle={{ padding: '2rem' }}
      onCancel={() => setUser(null)}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Row gutter={[40, 0]}>
          <Col span={6}>
            <Form.Item
              label="name"
              name={'name'}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="surname"
              name={'surname'}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="father_name"
              name={'father_name'}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="birthday"
              name={'birthday'}
            >
              <DatePicker format={dateFormat} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="phone"
              name={'phone'}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="seriya"
              name={'seriya'}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="number"
              name={'number'}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="dateof"
              name={'dateof'}
            >
              <DatePicker format={dateFormat} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="adress"
              name={'adress'}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Space>
            <Button
              onClick={() => {
                onUpdate({ ...form.getFieldsValue(), id: user.id });
                setUser(null);
              }}
              type="primary"
            >
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                <PersonAddAlt1Icon /> {t('chess.17')}
              </div>
            </Button>

            <Button
              onClick={() => {
                onDelete(user.id);
                setUser(null);
              }}
              type="primary"
              danger
            >
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                <PersonRemoveAlt1Icon /> {t('chess.18')}
              </div>
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
