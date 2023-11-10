import { Button, Col, DatePicker, Form, Input, Row, Select, Space, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { EmptyRooms, OrderGetById, OrderUpdateById } from '../../../axios_service/axios.service.ts';
import Layout from '../../../components/_app.jsx';
import AdditServiesComponent from '../../../components/admin/addit_services/index.jsx';
import UpdateOrderUser from '../../../components/admin/update_order_user/index.jsx';
import './style.css';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const formRules = [{ required: true }];
const HH = n => String(n).padStart(2, '0');
const dateFormat = 'YYYY-MM-DD HH:mm';

export default function UpdateOrder() {
  const [messageApi, contextHolder] = message.useMessage();
  const [refreshOrder, setRefreshOrder] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [order, setOrder] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);
  const { t } = useTranslation();
  const { id: paramOrderId } = useParams();
  const [form] = Form.useForm();

  const successMsg = () =>
    messageApi.open({
      type: 'success',
      content: 'Success',
    });
  const errorMsg = () =>
    messageApi.open({
      type: 'error',
      content: 'Error',
    });

  const dayInMs = 24 * 60 * 60 * 1000;
  const onChangeDataPicker = (_, formattedDate) => {
    form.setFieldsValue({
      days: Math.ceil((new Date(formattedDate[1]).getTime() - new Date(formattedDate[0]).getTime()) / dayInMs),
    });
  };

  useEffect(() => {
    if (!refreshOrder) return;

    setLoadingForm(true);
    OrderGetById(paramOrderId)
      .catch(() => errorMsg())
      .then(([resOrder]) => {
        setOrder(resOrder);
        form.setFieldsValue(
          Object.assign(
            {
              date: [dayjs(resOrder.arrival_date, dateFormat), dayjs(resOrder.departure_date, dateFormat)],
              rooms: resOrder.rooms.id,
            },
            Object.fromEntries(
              Object.entries(resOrder).filter(
                ([key, val]) => !(val instanceof Object) && !['date', 'room'].includes(key)
              )
            )
          )
        );
        EmptyRooms()
          .catch(() => errorMsg())
          .then(resRoom => {
            setLoadingForm(false);
            setRefreshOrder(false);
            successMsg();
            setRooms(resRoom.concat(resOrder.rooms));
          });
      });
  }, [refreshOrder]);

  const onFinish = val => {
    val.arrival_date = dayjs(val.date[0]).format(dateFormat);
    val.departure_date = dayjs(val.date[1]).format(dateFormat);
    val.date = undefined;
    setLoadingForm(true);
    OrderUpdateById(paramOrderId, val)
      .then(() => successMsg())
      .catch(() => errorMsg())
      .finally(() => setLoadingForm(false));
  };

  const roomOptions = rooms
    .filter(item => item)
    .map(item => ({
      label: `${HH(item.rooms)} | ${item.type} | ${HH(item.count)}`,
      value: item.id,
    }));

  return (
    <Layout>
      <div>
        {contextHolder}

        <Form
          layout={'vertical'}
          form={form}
          className={'instant_booking_box_shadow'}
          name="instant-booking"
          onFinish={onFinish}
        >
          <Row gutter={[40, 0]}>
            <Col span={8}>
              <Form.Item
                name="rooms"
                rules={formRules}
                label={t('application_add.0')}
              >
                <Select options={roomOptions} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="date"
                rules={formRules}
                label={t('application_add.9')}
              >
                <RangePicker
                  onChange={onChangeDataPicker}
                  showTime={{
                    format: 'HH:mm',
                  }}
                  format={dateFormat}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="number_night"
                label={t('application_add.1')}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="type_payment"
                label={t('application_add.3')}
                rules={formRules}
              >
                <Select
                  options={[
                    { value: 'Наличные', label: t('application_add.35') },
                    { value: 'Перечисление', label: t('application_add.34') },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="status_payment"
                label={t('AdditServies.16')}
                rules={formRules}
              >
                <Select
                  options={[
                    {
                      value: 'Долговое',
                      label: t('AdditServies.23'),
                    },
                    {
                      value: 'Оплачено',
                      label: t('AdditServies.24'),
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="country"
                label={t('application_add.15')}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="count_users"
                label={t('application_add.12')}
              >
                <Input type={'number'} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="company"
                label={t('application_add.13')}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="phone"
                rules={formRules}
                label={t('application_add.16')}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="total_payable"
                rules={formRules}
                label={t('application_add.19')}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="company_details"
                label={t('application_add.36')}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="status_client"
                rules={formRules}
                label={t('Room.37')}
              >
                <Select
                  options={[
                    {
                      value: 'active',
                      label: t('application_add.39'),
                    },
                    {
                      value: 'not_active',
                      label: t('application_add.40'),
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="comentary"
                label={t('application_add.14')}
              >
                <TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button
                loading={loadingForm}
                disabled={loadingForm}
                type="primary"
                htmlType="submit"
              >
                <span>{t('chess.17')}</span>
              </Button>
              <Button
                htmlType="button"
                onClick={() => form.resetFields()}
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <hr />

        {order && (
            <div className={'instant_booking_box_shadow'}>
          <UpdateOrderUser
            users={order.users}
            setRefreshOrder={setRefreshOrder}
          />
            </div>
        )}

        <hr />

        <div id={'AdditServiesComponent'}>{paramOrderId && <AdditServiesComponent order={paramOrderId} />}</div>
      </div>
    </Layout>
  );
}
