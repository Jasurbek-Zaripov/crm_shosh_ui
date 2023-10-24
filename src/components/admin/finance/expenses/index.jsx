import React, { useState } from "react";
import ExpensTable from "./expens-table";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import Button from "../../../../common/button/index";
import ModalCommon from "../../../../common/modal";
import Input from "../../../../common/input";
import { useFormik } from "formik";
import SelectCommon from "../../../../common/select";
import { Col, Row } from "react-grid-system";
import TextArea from "../../../../common/textarea";

const Expenses = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const HandleOpen = () => setOpen(true);
  const HandleClose = () => setOpen(false);
  const InputData = [
    {
      id: 1,
      name: "task",
      text: t("Finance.expens_modal.0"),
      placeholder: "Task name",
    },
    {
      id: 2,
      name: "dispatch_time",
      text: t("Finance.expens_modal.1"),
      placeholder: "00/00/2000",
    },
    {
      id: 3,
      name: "importance",
      text: t("Finance.expens_modal.2"),
      placeholder: "Task name",
    },
    {
      id: 4,
      name: "deadline",
      text: t("Finance.expens_modal.3"),
      placeholder: "00/00/2000",
    },
    {
      id: 5,
      name: "task",
      text: t("Finance.expens_modal.4"),
      placeholder: "00/00/2000",
    },
    {
      id: 6,
      name: "deadline",
      text: t("Finance.expens_modal.5"),
      placeholder: "00/00/2000",
    },
  ];

  const formik = useFormik({
    initialValues: {
      task: "",
      dispatch_time: "",
      importance: "",
      deadline: "",
      task: "",
      deadline: "",
    },
    onSubmit: (values) => {
      return values
    },
  });

  return (
    <>
      <div>
        <div className={styles.header_box}>
          <h1 className={styles.tableTitle}>{t("Finance.1")}</h1>
          <Button onClick={HandleOpen}>
            {t("Finance.table.expensTable.11")}
          </Button>
        </div>
        <ExpensTable />
      </div>
      <ModalCommon width="700px" open={open} onCancel={HandleClose}>
        <h2 className={styles.modal_title}>
          {t("Finance.table.expensTable.12")}
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <Row>
            <Col lg={6}>
              <SelectCommon
                defaultValue="Аренда"
                onBlur={formik.onBlur}
                onChange={formik.handleChange}
                name="Importance"
                text={t("Finance.expens_modal.0")}
                className={styles.expens_select}
              />
            </Col>
            <Col lg={6}>
              <SelectCommon
                defaultValue='Наличные'
                onBlur={formik.onBlur}
                onChange={formik.handleChange}
                name="Importance"
                text={t("Finance.expens_modal.1")}
                className={styles.expens_select}
              />
            </Col>
            <Col lg={6}>
              <Input
                onBlur={formik.onBlur}
                onChange={formik.handleChange}
                text={t("Finance.expens_modal.2")}
              />
            </Col>
            <Col lg={6}>
              <TextArea styletextArea={{width: '93%', height: '124px'}} text={t("Finance.expens_modal.3")} />
            </Col>
            <Col
              lg={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                style={{ padding: "11px 50px", margin: "40px auto 0 auto" }}
              >
                {t("Finance.expens_modal.4")}
              </Button>
            </Col>
          </Row>
        </form>
      </ModalCommon>
    </>
  );
};

export default Expenses;
