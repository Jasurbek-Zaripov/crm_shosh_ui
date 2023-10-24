import React, { useEffect } from "react";
import styles from "./styled.module.css";
import TableCommon from "../../../../../common/table/index";
// import { data } from "./tableData";
import { useTranslation } from "react-i18next";
// import { Table } from "antd";
import "../../revenues/table.css";
import { useDispatch, useSelector } from "react-redux";
import { ConsumptionCategoryGet } from "../../../../../redux/consumption_category/index";
import { ConsumptionGet } from "../../../../../redux/consumption/index";

const ExpensTable = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ConsumptionCategorys = useSelector(
    (state) => state.ConsumptionCategori.ConsumptionCategoryGet?.data
  );
  const Consumptions = useSelector(
    (state) => state.Consumption.ConsumptionGet?.data
  );
  useEffect(() => {
    dispatch(ConsumptionCategoryGet());
  }, []);
  useEffect(() => {
    dispatch(ConsumptionGet());
  }, []);
  const data = [];
  ConsumptionCategorys.map((elem) => {
    elem.consumption.map((e, index) => {
      data.push({
        id: e.id,
        data0: index + 1,
        data1: "599.000.000",
        data2: "599.000",
        data3: "",
        data4: "",
        data5: "599.000.000",
        data6: "4.500.000",
      });
    });
  });
  let sum = 0;
  return (
    <>
      <table className={styles.table_expenses}>
        {ConsumptionCategorys.map((elem) => (
          <td>
            <tr className={styles.table_header}>
              <th>{elem.consumption_name}</th>
            </tr>
            <tbody>
              {elem.consumption.map((e, index) => (
                <tr>
                  <th>{e.amount}</th>
                </tr>
              ))}
              <tr className={styles.fixed}>
                <th className={styles.fixed}>{sum}</th>
              </tr>
            </tbody>
          </td>
        ))}
      </table>
    </>
  );
}

export default ExpensTable;