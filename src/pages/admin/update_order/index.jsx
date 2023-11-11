import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  EmptyRooms,
  OrderGetById,
  OrderUpdateById,
} from "../../../axios_service/axios.service.ts";
import Layout from "../../../components/_app.jsx";
import AdditServiesComponent from "../../../components/admin/addit_services/index.jsx";
import UpdateOrderUser from "../../../components/admin/update_order_user/index.jsx";
import "./style.css";
import weekDaysExt from "dayjs/plugin/weekday.js";
import localDateExt from "dayjs/plugin/localeData.js";
import calendarExt from "dayjs/plugin/calendar.js";
import "antd/lib/calendar/style/index.js";

dayjs.extend(weekDaysExt);
dayjs.extend(localDateExt);
dayjs.extend(calendarExt);

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const formRules = [{ required: true }];
const HH = (n) => String(n).padStart(2, "0");
const dateFormat = "YYYY-MM-DD HH:mm";

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
      type: "success",
      content: "Success",
    });
  const errorMsg = () =>
    messageApi.open({
      type: "error",
      content: "Error",
    });

  const dayInMs = 24 * 60 * 60 * 1000;
  const changedDate = Form.useWatch("date", form);
  if (changedDate?.length == 2) {
    form.setFieldsValue({
      number_night:
        Math.ceil(
          (new Date(changedDate[1].$d).getTime() -
            new Date(changedDate[0].$d).getTime()) /
            dayInMs
        ) + 1,
    });
  }

  useEffect(() => {
    if (!refreshOrder) return;

    setLoadingForm(true);
    OrderGetById(paramOrderId)
      .catch(() => errorMsg())
      .then(([resOrder]) => {
        setOrder(resOrder);
        EmptyRooms()
          .catch(() => errorMsg())
          .then((resRoom) => {
            setLoadingForm(false);
            setRefreshOrder(false);
            successMsg();
            setRooms(resRoom.concat(resOrder.rooms));
          });
      });
  }, [refreshOrder]);

  const onFinish = (val) => {
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
    .filter((item) => item)
    .map((item) => ({
      label: `${HH(item.rooms)} | ${item.type} | ${HH(item.count)}`,
      value: item.id,
    }));

  return (
    <Layout>
      <div>
        {contextHolder}

        {order && (
          <Form
            layout={"vertical"}
            form={form}
            className={"instant_booking_box_shadow"}
            name="instant-booking"
            onFinish={onFinish}
          >
            <Row gutter={[40, 0]}>
              <Col span={8}>
                <Form.Item
                  name="rooms"
                  initialValue={order.rooms.id}
                  rules={formRules}
                  label={t("application_add.0")}
                >
                  <Select options={roomOptions} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="date"
                  initialValue={[
                    dayjs(order.arrival_date),
                    dayjs(order.departure_date),
                  ]}
                  rules={formRules}
                  label={t("application_add.9")}
                >
                  <RangePicker
                    showTime={{ format: "HH:mm" }}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="number_night"
                  initialValue={order.number_night}
                  label={t("application_add.1")}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="type_payment"
                  initialValue={order.type_payment}
                  label={t("application_add.3")}
                  rules={formRules}
                >
                  <Select
                    options={[
                      { value: "Наличные", label: t("application_add.35") },
                      { value: "Перечисление", label: t("application_add.34") },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="status_payment"
                  initialValue={order.status_payment}
                  label={t("AdditServies.16")}
                  rules={formRules}
                >
                  <Select
                    options={[
                      {
                        value: "Долговое",
                        label: t("AdditServies.23"),
                      },
                      {
                        value: "Оплачено",
                        label: t("AdditServies.24"),
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="country"
                  initialValue={order.country}
                  label={t("application_add.15")}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="count_users"
                  initialValue={order.count_users}
                  label={t("application_add.12")}
                >
                  <Input type={"number"} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="company"
                  initialValue={order.company}
                  label={t("application_add.13")}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="phone"
                  initialValue={order.phone}
                  rules={formRules}
                  label={t("application_add.16")}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="total_payable"
                  initialValue={order.total_payable}
                  rules={formRules}
                  label={t("application_add.19")}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="company_details"
                  initialValue={order.company_details}
                  label={t("application_add.36")}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="status_client"
                  initialValue={order.status_client}
                  rules={formRules}
                  label={t("Room.37")}
                >
                  <Select
                    options={[
                      {
                        value: "active",
                        label: t("application_add.39"),
                      },
                      {
                        value: "not_active",
                        label: t("application_add.40"),
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="comentary"
                  initialValue={order.comentary}
                  label={t("application_add.14")}
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
                  <span>{t("chess.17")}</span>
                </Button>
                <Button htmlType="button" onClick={() => form.resetFields()}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
        <hr />

        {order && (
          <div className={"instant_booking_box_shadow"}>
            <UpdateOrderUser
              users={order.users}
              setRefreshOrder={setRefreshOrder}
            />
          </div>
        )}

        <hr />

        <div id={"AdditServiesComponent"}>
          {paramOrderId && <AdditServiesComponent order={paramOrderId} />}
        </div>
      </div>
    </Layout>
  );
}
