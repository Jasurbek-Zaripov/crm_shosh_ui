import { TagFilled } from '@ant-design/icons';
import { Group, Numbers } from '@mui/icons-material';
import { Button, Col, DatePicker, Form, Input, Row, Select, Space, message } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { OrderCreate, RoomUpdate, UserCreate } from '../../axios_service/axios.service.ts';

const { RangePicker } = DatePicker;
const NN = target => String(target).padStart(2, '0');
const iconStyle = {
  fontSize: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const formRules = [{ required: true }];
const dateFormat = 'YYYY-MM-DD HH:mm';

export default function FormToInstantBooking() {
  const user = JSON.parse(window.localStorage.getItem('AuthDataUser'));
  const [show, setShow] = useState(null);
  const EmptyRooms = useSelector(state => state.Rooms.RoomsGet.data);
  const roomPending = useSelector(state => state.Rooms.RoomsGet.Loading);
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const { t } = useTranslation();
  const roomOptions = EmptyRooms.filter(
    room => room.filial?.filial_name === user.filial.filial_name && room.status != 'busy'
  ).map(room => ({
    label: (
      <Space>
        <span style={iconStyle}>
          <Numbers style={iconStyle} />
          &nbsp;{NN(room.rooms)}
        </span>
        |
        <span style={iconStyle}>
          <TagFilled style={iconStyle} />
          &nbsp;{room.type}
        </span>
        |
        <span style={iconStyle}>
          <Group style={iconStyle} />
          &nbsp;{NN(room.count)}
        </span>
      </Space>
    ),
    value: room.id,
  }));

  const dayInMs = 24 * 60 * 60 * 1000;
  const onChangeDataPicker = (_, formattedDate) => {
    form.setFieldsValue({
      days: Math.ceil((new Date(formattedDate[1]).getTime() - new Date(formattedDate[0]).getTime()) / dayInMs),
    });
  };

  const messageError = () => {
    setShow(null);
    messageApi.open({
      type: 'error',
      content: 'Error',
    });
  };
  const onFinish = formData => {
    setShow(true);
    OrderCreate({
      rooms: +formData.room,
      staff: user?.id,
      number_night: formData.days,
      type_payment: '',
      phone: formData.phone,
      definition: '',
      sale: '',
      arrival_date: dayjs(formData.date[0]).format(dateFormat),
      departure_date: dayjs(formData.date[0]).format(dateFormat),
      count_users: '',
      company: '',
      total_payable: '',
      booking: '',
      country: '',
      comentary: '',
      paid: '',
      debt: '',
      status_payment: '',
      company_details: '',
      color: '#FFFF00',
      status_client: 'not_active',
      filial: user?.filial?.id,
    }).then(createdOrder => {
      RoomUpdate(+formData.room, { status: 'busy' }).catch(() => messageError());
      UserCreate({
        name: formData.name,
        surname: formData.surname,
        father_name: formData.patronymic,
        birthday: '',
        phone: formData.phone || '',
        seriya: '',
        number: '',
        adress: formData.address || '',
        dateof: '',
        email: '',
        orders: createdOrder.id,
      })
        .catch(() => messageError())
        .then(() => {
          setShow(null);
          form.resetFields();
          messageApi.open({
            type: 'success',
            content: 'Success',
          });
        })
        .catch(async () => {
          await OrderHardDelete(createdOrder.id);
          await RoomUpdate(+formData.room, { status: 'empty' });
          messageError();
        });
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      {contextHolder}
      <Form
        layout={'vertical'}
        form={form}
        name="instant-booking"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="name"
              label={t('application_add.26')}
              rules={formRules}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="surname"
              label={t('application_add.25')}
              rules={formRules}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="patronymic"
              label={t('application_add.27')}
              rules={formRules}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="phone"
              label={t('application_add.16')}
              rules={formRules}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="room"
              label={t('application_add.0')}
            >
              <Select
                showSearch
                placeholder={t('application_add.0')}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  String(option?.label?.props?.children?.[0]?.props?.children?.[2] ?? '').includes(input)
                }
                options={roomOptions}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="days"
              label={t('application_add.1')}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="date"
              label={t('application_add.9')}
            >
              <RangePicker
                showTime={{
                  format: 'HH:mm',
                }}
                format="YYYY-MM-DD HH:mm"
                onChange={onChangeDataPicker}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="address"
              label={t('application_add.31')}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={show || roomPending}
              disabled={show || roomPending}
            >
              <span>Submit</span>
            </Button>
            <Button
              htmlType="button"
              onClick={onReset}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
