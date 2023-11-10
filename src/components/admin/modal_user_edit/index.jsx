import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const dateFormat = "YYYY-MM-DD";
const formRules = [{ required: true }];

export default function ModalUserEdit({
  parentAction: { user, onUpdate, onDelete, setUser },
}) {
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
      width={"80%"}
      bodyStyle={{ padding: "2rem" }}
      onCancel={() => setUser(null)}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Row gutter={[40, 0]}>
          <Col span={6}>
            <Form.Item
              label={t("application_add.26")}
              name={"name"}
              rules={formRules}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={t("application_add.25")}
              name={"surname"}
              rules={formRules}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={t("application_add.27")}
              name={"father_name"}
              rules={formRules}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t("application_add.29")} name={"birthday"}>
              <DatePicker format={dateFormat} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={t("application_add.32")}
              name={"phone"}
              rules={formRules}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t("application_add.28")} name={"seriya"}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t("AdditServies.6")} name={"number"}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t("application_add.30")} name={"dateof"}>
              <DatePicker format={dateFormat} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t("application_add.31")} name={"adress"}>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <PersonAddAlt1Icon /> {t("chess.17")}
              </div>
            </Button>

            <Popconfirm
              title={t("chess.18") + " ?"}
              onConfirm={() => {
                onDelete(user.id);
                setUser(null);
              }}
              okText={t("Room.35")}
              cancelText={t("Room.36")}
            >
              <Button type="primary" danger>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <PersonRemoveAlt1Icon /> {t("chess.18")}
                </div>
              </Button>
            </Popconfirm>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
