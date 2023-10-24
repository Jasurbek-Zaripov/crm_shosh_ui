import React, { useState } from "react";
import TableCommon from "../../../../common/table";
import { useTranslation } from "react-i18next";
import { data } from "./tableData";
import styles from "./style.module.css";
import SelectCommon from "../../../../common/select";
import "../tabs.css";
import './input.css'
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import DateRangePicker from 'rsuite/DateRangePicker';
import "rsuite/dist/rsuite.css";
import CalendarTableArxiv from "./calendar-table";
// import { DatePicker } from "antd";

const ArchiveTabpanel = () => {
  const { t } = useTranslation();
  const [time , setTime] = useState();
  const columns = [
    {
      title: t("Settings.Archive.4"),
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: t("Settings.Archive.5"),
      dataIndex: "dateofarrival",
      key: "dateofarrival",
    },
    {
      title: t("Settings.Archive.6"),
      dataIndex: "departuredate",
      key: "departuredate",
    },
    {
      title: t("Settings.Archive.7"),
      dataIndex: "number",
      key: "number",
    },
    {
      title: t("Settings.Archive.8"),
      dataIndex: "man",
      key: "man",
    },
    {
      title: t("Settings.Archive.9"),
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: t("Settings.Archive.10"),
      dataIndex: "totalamount",
      key: "totalamount",
    },
    {
      title: t("Settings.Archive.11"),
      dataIndex: "paymentstatus",
      key: "paymentstatus",
      //   render: () => (
      //     <>
      //       {data.map((elem) => (
      //         <>
      //           <i class="bx bx-check-circle"></i>
      //           <span>{elem.paymentstatus}</span>
      //         </>
      //       ))}
      //     </>
      //   ),
    },
    {
      title: t("Settings.Archive.12"),
      dataIndex: "orderstatus",
      key: "orderstatus",
      fixed: "right",
    },
  ];
  
  return (
    <>
      <div className="header_table">
        <h2 className="table-header">{t("Settings.Archive.0")}</h2>
        <div className={styles.select_box}>
          {/* <DatePicker controls={["calendar"]} select="range" touchUi={true} /> */}
       {/* <DateRangePicker onChange={(date) => setTime(date)}  style={{background: '#EBEBEB' , marginRight : "10px"}} placeholder={t("Settings.Archive.1")} /> */}
{/*     
          <SelectCommon
            style={{ marginRight: "30px", marginLeft: '30px', height: "36px" }}
            defaultValue={t("Settings.Archive.3")}
          /> */}
        </div>
      </div>
    <CalendarTableArxiv/>
    </>
  );
};

export default ArchiveTabpanel;
