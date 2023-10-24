import React, {useEffect, useState} from "react";
import TableCommon from "../../../common/table/index";
import {useTranslation} from "react-i18next";
import {Table} from "antd";
import {ChangeManagerGet} from "../../../redux/change";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Col, Row} from "react-grid-system"
import {ConsumptionManagerGet} from "../../../redux/consumption";
import {useParams} from "react-router-dom";
import "./table.css"
import {API_URL} from "../../../utils/api";

const SmenaComponent = () => {
    const {id} = useParams()
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const HandleOpen = () => {
        setOpen(true)
    }
    const HandleClose = () => {
        setOpen(false)
    }
    useEffect(() => {
        dispatch(ChangeManagerGet());
    }, []);
    useEffect(() => {
        dispatch(ConsumptionManagerGet());
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

    const dataSmena = useSelector((state) => state.Change.ChangeManagerGet.data);
    const dataSmena2 = useSelector((state) => state.Consumption.ConsumptionManagerGet.data);
    const dataSmenaFind = dataSmena.filter(
        (elem) =>
            elem.staff?.id ==
            id
    );
    const dataSmenaFind2 = dataSmena2.filter(
        (elem) =>
            elem.staff?.id ==
            id
    );

    function EnumComingRasxod() {
        let sum = 0;
        dataSmenaFind2.map((elem) => sum += Number(elem.transfer_exp));

        return sum;
    }

    function EnumComingRasxod2() {
        let sum = 0;
        dataSmenaFind2.map((elem) => sum += Number(elem.cash_flow));

        return sum;
    }

    const data = [];
    const HandleDelete = async () => {
        const body = {
            id: JSON.parse(window.localStorage.getItem("AuthDataUser")).id
        }
        await axios.delete(`${API_URL}/changedelete/${JSON.parse(window.localStorage.getItem("AuthDataUser")).id}`)
            .then(res => res)
        await axios.delete(`${API_URL}/consumption/${JSON.parse(window.localStorage.getItem("AuthDataUser")).id}`)
            .then(res => res)
        // window.location.reload()
    }
    const data2 = []
    dataSmenaFind.map((elem) => {
        data.push({
            number: elem.rooms?.rooms,
            name: elem.full_name,
            cashcoming: elem.cash_coming,
            enumcoming: elem.enum_coming,
            dateofdeparture: elem.departure_date.slice(0, 10),
        });
    });
    dataSmenaFind2.map((elem) => {
        data2.push({
            consuptioncategory: elem.consumption_category?.consumption_name,
            cashflow: elem.transfer_exp,
            transferexp: elem.cash_flow,
            comment: elem.comentary,
        });
    });
    const columnss = [
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
    ]
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
            title: `${t("Finance.table.3")}`,
            dataIndex: "dateofdeparture",
            key: "dateofdeparture",
            width: 150,
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
            <Row>
                <Col lg={6}>
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
                                        {t("Finance.table.11")}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell
                                        index={2}>{sumCashComing().toLocaleString()}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={3}>{EnumComing().toLocaleString()}</Table.Summary.Cell>
                                    <Table.Summary.Cell
                                        index={4}>{(sumCashComing() + EnumComing()).toLocaleString()}</Table.Summary.Cell>

                                </Table.Summary.Row>
                            </Table.Summary>
                        )}
                    /></Col>
                <Col lg={6}>
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
                                    <Table.Summary.Cell
                                        index={2}>{EnumComingRasxod().toLocaleString()}</Table.Summary.Cell>
                                    <Table.Summary.Cell
                                        index={3}>{EnumComingRasxod2().toLocaleString()}</Table.Summary.Cell>
                                    <Table.Summary.Cell
                                        index={4}>{(EnumComingRasxod() + EnumComingRasxod2()).toLocaleString()}</Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        )}
                    />
                </Col>

            </Row>
        </>
    );
};

export default SmenaComponent;
