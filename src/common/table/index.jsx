import { Table, Switch } from "antd";
import { useState } from "react";
import { Row, Col } from "react-grid-system";
import { useTranslation } from "react-i18next";
import styles from "./style-module.css";


function TableCommon({ columns, data, summary, bordered, scroll, className, pagination }) {

  
  const { t } = useTranslation();
  return (
    <>
      <Table
        pagination={false}
        className={className}
        columns={columns}
        dataSource={data}
        bordered={bordered}
        tableLayout="none"
        scroll={scroll}
        summary={summary}
      />
    </>
  );
}
export default TableCommon;
