import React, {useEffect, useRef, useState} from "react";
import TableCommon from "../../../../../common/table/index";
import Button from "../../../../../common/button/index";
import {useTranslation} from "react-i18next";
import {Table} from "antd";
import {ChangeAdminGet} from "../../../../../redux/change";
import "../table.css";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import AddExpenes from "./add_expense";
import styles from "./style.module.css"
import {Col, Row} from "react-grid-system"
import {ConsumptionAdminGet} from "../../../../../redux/consumption";
import ModalCommon from "../../../../../common/modal";
import ReactToPrint from "react-to-print";
import {API_URL} from "../../../../../utils/api";

const SmenaTable = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const component = useRef();

    const [open, setOpen] = useState(false);
    const HandleOpen = () => {
        setOpen(true)
    }
    const HandleClose = () => {
        setOpen(false)
    }
    useEffect(() => {
        dispatch(ChangeAdminGet());
    }, []);
    useEffect(() => {
        dispatch(ConsumptionAdminGet());
    }, []);
    const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"))

    const Orders = useSelector((state) => state.Order.OrdersBusyGet.data);

    function sumCashComing(orders) {
        let sum = 0;
        dataSmenaFind.map((elem) => sum += Number(elem.cash_coming));
        return Number(sum);
    }

    function EnumComing() {
        let sum = 0;
        dataSmenaFind.map((elem) => sum += Number(elem.enum_coming));

        return Number(sum);
    }

    const dataSmena = useSelector((state) => state.Change.ChangeAdminGet.data);
    const dataSmena2 = useSelector((state) => state.Consumption.ConsumptionAdminGet.data);
    const dataSmenaFind = dataSmena.filter(
        (elem) =>
            elem.staff?.id ==
            dataUser?.id
    );
    const dataSmenaFind2 = dataSmena2.filter(
        (elem) =>
            elem.staff?.id ==
            dataUser?.id
    );

    function EnumComingRasxod() {
        let sum = 0;
        dataSmenaFind.map((elem) => sum += Number(elem.transfer_exp));

        return sum;
    }

    function EnumComingRasxod2() {
        let sum = 0;
        dataSmenaFind.map((elem) => sum += Number(elem.cash_flow));
        return sum;
    }

    const data = [];
    const HandleDelete = async () => {
        const body = {
            id: dataUser?.id
        }
        await axios.delete(`${API_URL}/changedelete/${dataUser?.id}`)
            .then(res => res)
        await axios.delete(`${API_URL}/consumption/${dataUser?.id}`)
            .then(res => res)
        window.location.reload()
    }
    const data2 = []
    dataSmenaFind.map((elem) => {
        data.push({
            number: elem.rooms?.rooms,
            name: elem.full_name,
            cashcoming: elem.cash_coming,
            enumcoming: elem.enum_coming,
            dateofdeparture: elem.departure_date,
            arrivaldate: elem.arrival_date,
            consuptioncategory: elem.consumption_category,
            cashflow: elem.transfer_exp,
            transferexp: elem.cash_flow,
            comment: elem.comentary,
        });
    });

    const columnss = []
    const columns = [
        {
            title: "№",
            dataIndex: "number",
            key: "number",
            fixed: "left",
            width: 50,
        },
        {
            title: `${t("Finance.table.0")}`,
            dataIndex: "name",
            key: "name",
            fixed: "left",
        },
        {
            title: `${t("Finance.table.smenaTable.1")}`,
            dataIndex: "cashcoming",
            key: "cashcoming",
        },
        {
            title: `${t("Finance.table.smenaTable.2")}`,
            dataIndex: "enumcoming",
            key: "enumcoming",
        },
        {
            title: `${t("Finance.table.2")}`,
            dataIndex: "arrivaldate",
            key: "arrivaldate",
            width: 150,
        },
        {
            title: `${t("Finance.table.3")}`,
            dataIndex: "dateofdeparture",
            key: "dateofdeparture",
            width: 150,
        },
        {
            title: `${t("Finance.table.smenaTable.7")}`,
            dataIndex: "consuptioncategory",
            key: "consuptioncategory",
        },
        {
            title: `${t("Finance.table.smenaTable.3")}`,
            dataIndex: "cashflow",
            key: "cashflow",
        },
        {
            title: `${t("Finance.table.smenaTable.4")}`,
            dataIndex: "transferexp",
            key: "transferexp",
        },
        {
            title: `${t("Finance.table.smenaTable.5")}`,
            dataIndex: "comment",
            key: "comment",
            width: 200,
        },


    ];
    const [open4, setOpen4] = useState(false);
    const HandleOpen4 = () => {
        setOpen4(true);
    };
    const HandleClose4 = async () => {
        setOpen4(false);
    };
    return (
        <>
            <Row ref={component} style={{padding: "10px"}}>
                <Col style={{padding: "0px"}} lg={12}>
                    <TableCommon
                        className="table-short"
                        bordered
                        isFooter={true}
                        isNone={true}
                        columns={columns}
                        data={data}

                        summary={() => (
                            <Table.Summary>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell
                                        index={0}
                                        colSpan={2}
                                        fixed="left"
                                        className="tablefull"
                                    >
                                        {t("Finance.table.11")} : {(sumCashComing() + EnumComing()).toLocaleString()}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell
                                        index={2}>{sumCashComing().toLocaleString()}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={3}>{EnumComing().toLocaleString()}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={4}>денежное
                                        пособие: {(sumCashComing() - EnumComingRasxod()).toLocaleString()}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={5}>общие затраты
                                        : {(EnumComingRasxod() + EnumComingRasxod2()).toLocaleString()}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={6}></Table.Summary.Cell>
                                    <Table.Summary.Cell
                                        index={7}>{EnumComingRasxod().toLocaleString()}</Table.Summary.Cell>
                                    <Table.Summary.Cell
                                        index={8}>{EnumComingRasxod2().toLocaleString()}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={9}>Перечисление
                                        расход: {(EnumComing() - EnumComingRasxod2()).toLocaleString()}</Table.Summary.Cell>


                                </Table.Summary.Row>
                            </Table.Summary>
                        )}
                    /></Col>
                {/* <Col style={{padding:"0px"}} lg={6} >
        <TableCommon
        className="table-short"
        bordered
        isFooter={true}
        isNone={true}
        columns={columnss}
        data={data2}

        summary={() => (
          <Table.Summary>
            <Table.Summary.Row>
              <Table.Summary.Cell
                index={0}
                fixed="left"
                className="tablefull"
              >
                {t("Finance.table.11")}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>{EnumComingRasxod().toLocaleString()}</Table.Summary.Cell>
              <Table.Summary.Cell index={3}>{EnumComingRasxod2().toLocaleString()}</Table.Summary.Cell>
              <Table.Summary.Cell index={4}>{(EnumComingRasxod() + EnumComingRasxod2()).toLocaleString()}</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
        </Col> */}

            </Row>
            <div className="buton">
                <Button
                    onClick={HandleOpen}
                    style={{
                        width: "25%",
                        height: "100%",
                        borderTopRightRadius: "10px",
                        borderRadius: "0",
                    }}
                >
                    {t("Finance.table.expensTable.11")}
                </Button>
                <Button
                    onClick={HandleOpen4}
                    style={{
                        width: "25%",
                        height: "100%",
                        borderTopRightRadius: "10px",
                        borderRadius: "0",
                    }}
                >
                    {t("Finance.table.smenaTable.6")}
                </Button>
                <ReactToPrint
                    trigger={() => (
                        <Button
                            // onClick={HandleClose3}
                            style={{
                                fontSize: "14px",
                                fontWeight: "400",
                                fontFamily: "Rubik",
                                padding: "11px 16px",
                            }}
                        >
                            {t("Room.23")}
                        </Button>
                    )}
                    content={() => component.current}
                />
            </div>
            <AddExpenes open={open} onCancel={HandleClose} HandleClose={HandleClose}/>
            <ModalCommon titleText={`${t("Finance.table.smenaTable.6")} ?`} onCancel={HandleClose4} width={390}
                         open={open4}>
                <div className={styles.buttonsClose}>
                    <button onClick={HandleClose4}>{t("Room.36")}</button>
                    <button onClick={HandleDelete}>{t("Room.35")}</button>
                </div>
            </ModalCommon>
        </>
    );
};

export default SmenaTable;
