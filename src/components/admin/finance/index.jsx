import React, {useState} from "react";
import Revenues from "./revenues";
import Button from "../../../common/button/index";
import revenues from "../../../assets/finance-image/revenues.png";
import expenses from "../../../assets/finance-image/expenses.png";
import styles from "./style.module.css";
import {useTranslation} from "react-i18next";
import Expenses from "./expenses";

const FinanceComponent = () => {
    const {t} = useTranslation();
    const [show, setShow] = useState(true);

    return (
        <>
            <div className={styles.btn_wrapper}>
                {/* <Button
          type="button"
          onClick={() => setShow(true)}
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            boxShadow: "0px 10px 20px rgba(226, 228, 236, 0.2)",
            color: "#181717",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "30px 125px",
            fontSize: "25px",
            fontWeigth: "500",
            marginRight: "20px",
          }}
        >
          <img className={styles.revenues_img} src={revenues} alt="image" />
          {t("Finance.0")}
        </Button> */}
                {/* <Button
          type="button"
          onClick={() => setShow(false)}
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            boxShadow: "0px 10px 20px rgba(226, 228, 236, 0.2)",
            color: "#181717",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "30px 125px",
            fontSize: "25px",
            fontWeigth: "500",
          }}
        >
          <img className={styles.revenues_img} src={expenses} alt="image" />
          Расходы
        </Button> */}
            </div>
            <div className={styles.tableWrapper}>
                {show === true ? <Revenues/> : <Expenses/>}
            </div>
        </>
    );
};

export default FinanceComponent;
