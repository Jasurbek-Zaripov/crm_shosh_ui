import React, {useEffect} from "react";
import TableCommon from "../../../../../common/table/index";
import {useTranslation} from "react-i18next";
import {Table} from "antd";
import {NavLink} from "react-router-dom";
import styles from './styled.module.css'
import {OrdersGet} from "../../../../../redux/orders";
import {useDispatch, useSelector} from "react-redux";

const CalendarTableArxiv = () => {
    const {t} = useTranslation();
    const data = [];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(OrdersGet())
    }, [])
    const Orders = useSelector(state => state.Order.OrdersGet.data);

    function sumOrders(orders) {
        let sum = 0;
        Orders.map((elem) => elem.filial?.filial_name === dataUser.filial.filial_name ? (sum += Number(elem.definition)) : 0);

        return sum.toLocaleString();
    }

    function TotalPayableOrders(orders) {
        let sum = 0;
        Orders.map((elem) => elem.filial?.filial_name === dataUser.filial.filial_name ? (sum += Number(elem.total_payable)) : 0);
        return sum.toLocaleString();
    }

    function PaidOrders(orders) {
        let sum = 0;
        Orders.map((elem) => elem.filial?.filial_name === dataUser.filial.filial_name ? (sum += Number(elem.paid)) : 0);
        return sum.toLocaleString();
    }

    function DebtOrders(orders) {
        let sum = 0;
        Orders.map((elem) => elem.filial?.filial_name === dataUser.filial.filial_name ? (sum += Number(elem.debt)) : 0);
        return sum.toLocaleString();
    }

    const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"))

    // eslint-disable-next-line no-lone-blocks
    {
        Orders.map((elem) =>
            dataUser.filial.filial_name === elem.filial.filial_name ?
                data.push({
                    id: elem.id,
                    key: elem.key,
                    number: <NavLink className={styles.tablink}
                                     to={`/admin/room/${elem.id}`}>{elem.rooms?.rooms}</NavLink>,
                    name: (
                        <>
                            <NavLink style={{marginLeft: "10px"}} className={styles.tablink}
                                     to={`/admin/room/${elem.id}`}>{elem.users[0]?.name}</NavLink>

                            <NavLink style={{marginLeft: "10px"}} className={styles.tablink}
                                     to={`/admin/room/${elem.id}`}>{elem.users[0]?.surname}</NavLink>

                            <NavLink style={{marginLeft: "10px"}} className={styles.tablink}
                                     to={`/admin/room/${elem.id}`}>{elem.users[0]?.father_name}</NavLink>
                        </>
                    ),
                    country: (
                        <NavLink className={styles.tablink} to={`/admin/room/${elem.id}`}>{elem.country}</NavLink>
                    ),
                    phone: (
                        <NavLink className={styles.tablink} to={`/admin/room/${elem.id}`}>{elem.phone}</NavLink>
                    ),
                    dateofarrival: (
                        <NavLink className={styles.tablink}
                                 to={`/admin/room/${elem.id}`}>{elem.arrival_date.slice(0, 10)}</NavLink>
                    ),
                    departuredate: (
                        <NavLink className={styles.tablink}
                                 to={`/admin/room/${elem.id}`}>{elem.departure_date.slice(0, 10)}</NavLink>
                    ),
                    numberofpeople: (
                        <NavLink className={styles.tablink} to={`/admin/room/${elem.id}`}>{elem.count_users}</NavLink>
                    ),
                    tariff: <NavLink className={styles.tablink}
                                     to={`/admin/room/${elem.id}`}>{Number(elem.definition).toLocaleString()}</NavLink>,
                    accrued: (
                        <NavLink className={styles.tablink}
                                 to={`/admin/room/${elem.id}`}>{Number(elem.total_payable).toLocaleString()}</NavLink>
                    ),
                    paid: (
                        elem.paid ? <NavLink className={styles.tablinkActiveColor}
                                             to={`/admin/room/${elem.id}`}>{Number(elem.paid).toLocaleString()}</NavLink> :
                            <NavLink className={styles.tablink}
                                     to={`/admin/room/${elem.id}`}>{Number(elem.paid).toLocaleString()}</NavLink>
                    ),
                    type: (
                        <NavLink className={styles.tablink} to={`/admin/room/${elem.id}`}>{elem.rooms.type}</NavLink>
                    ),
                    passport: (
                        <NavLink className={styles.tablink}
                                 to={`/admin/room/${elem.id}`}>{elem.users.map(elem => elem.seriya)[0]}
                            <span>{elem.users.map(elem => elem.number)[0]}</span></NavLink>
                    ),
                    empytbuys: (
                        <NavLink className={elem.status === "empty" ? styles.active : styles.noactive}
                                 to={`/admin/room/${elem.id}`}>{elem.status === "empty" ? `${t("Finance.table.16")}` : `${t("Finance.table.17")}`} </NavLink>
                    ),
                    debtaccrual: (
                        elem.debt ?
                            <NavLink className={styles.tablinkActive}
                                     to={`/admin/room/${elem.id}`}>{Number(elem.debt).toLocaleString()}</NavLink> :
                            <NavLink className={styles.tablink}
                                     to={`/admin/room/${elem.id}`}>{Number(elem.debt).toLocaleString()}</NavLink>
                    ),
                    company: (
                        <NavLink className={styles.tablink} to={`/admin/room/${elem.id}`}>{elem.company}</NavLink>
                    ),
                }) : null);
    }
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
            title: `${t("Finance.table.1")}`,
            dataIndex: "country",
            key: "country",
            width: 200
        },
        {
            title: `${t("Finance.table.12")}`,
            dataIndex: "phone",
            key: "phone",
            width: 160
        },
        {
            title: `${t("Finance.table.13")}`,
            dataIndex: "type",
            key: "type",
            width: 160
        },
        {
            title: `${t("Finance.table.15")}`,
            dataIndex: "passport",
            key: "passport",
            width: 160
        },
        // {
        //   title: `${t("Finance.table.18")}`,
        //   dataIndex: "empytbuys",
        //   key: "empytbuys",
        //   width:160
        // },
        {
            title: `${t("Finance.table.2")}`,
            dataIndex: "dateofarrival",
            key: "dateofarrival",
            width: 170
        },
        {
            title: `${t("Finance.table.3")}`,
            dataIndex: "departuredate",
            key: "departuredate",
            width: 170
        },
        {
            title: `${t("Finance.table.5")}`,
            dataIndex: "numberofpeople",
            key: "numberofpeople",
        },
        {
            title: `${t("Finance.table.6")}`,
            dataIndex: "tariff",
            key: "tariff",
        },
        {
            title: `${t("Finance.table.7")}`,
            dataIndex: "accrued",
            key: "accrued",
        },
        {
            title: `${t("Finance.table.8")}`,
            dataIndex: "paid",
            key: "paid",
        },
        {
            title: `${t("Finance.table.9")}`,
            dataIndex: "debtaccrual",
            key: "debtaccrual",
        },
        {
            title: `${t("Finance.table.10")}`,
            dataIndex: "company",
            key: "company",
            // fixed: 'right',
        },
    ];
    return (
        <>
            <TableCommon
                pagination={false}
                bordered
                isFooter={true}
                columns={columns}
                data={data}
                scroll={{
                    x: 2100,
                }}
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
                            <Table.Summary.Cell index={2}></Table.Summary.Cell>
                            <Table.Summary.Cell index={3}></Table.Summary.Cell>
                            <Table.Summary.Cell index={4}></Table.Summary.Cell>
                            <Table.Summary.Cell index={5}></Table.Summary.Cell>
                            <Table.Summary.Cell index={6}></Table.Summary.Cell>
                            <Table.Summary.Cell index={7}></Table.Summary.Cell>
                            <Table.Summary.Cell index={8}></Table.Summary.Cell>
                            <Table.Summary.Cell index={9}>{sumOrders()}</Table.Summary.Cell>
                            <Table.Summary.Cell index={10}>{TotalPayableOrders()}</Table.Summary.Cell>
                            <Table.Summary.Cell index={11}>{PaidOrders()}</Table.Summary.Cell>
                            <Table.Summary.Cell index={12}>{DebtOrders()}</Table.Summary.Cell>
                            <Table.Summary.Cell
                                index={11}
                                className="fixed-rigth"
                            ></Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
            />
        </>
    );
};

export default CalendarTableArxiv;
