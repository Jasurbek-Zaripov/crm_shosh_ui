import React, {useEffect} from "react";
import TableCommon from "../../../../../common/table/index";
import {useTranslation} from "react-i18next";
import {Table} from "antd";
import {NavLink} from "react-router-dom";
import styles from "./styled.module.css";
import {OrdersBusyGet} from "../../../../../redux/orders";
import {useDispatch, useSelector} from "react-redux";
import {RoomsGet} from "../../../../../redux/rooms";

const CalendarTable = () => {
    const {t} = useTranslation();
    const data = [];
    const dispatch = useDispatch();
    const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"))

    useEffect(() => {
        dispatch(RoomsGet());
    }, []);
    const Orders = useSelector((state) => state.Rooms.RoomsGet.data);

    useEffect(() => {
        dispatch(OrdersBusyGet())
    }, [])
    const OrdersBusy = useSelector(state => state.Order.OrdersBusyGet.data)

    function sumOrders() {
        let sum = 0;
        // OrdersBusy.map(elem => elem.orders.map(e => e.status === 'busy' ? Number(e.definition):null))
        OrdersBusy.map((elem) => elem.filial?.filial_name === dataUser.filial.filial_name && elem.status_client === 'active' ? (sum += Number(elem.definition)) : 0);
        return sum.toLocaleString();
    }

    function TotalPayableOrders() {
        let sum = 0;
        OrdersBusy.map((elem) => elem.filial?.filial_name === dataUser.filial.filial_name && elem.status_client === 'active' ? (sum += Number(elem.total_payable)) : 0);
        return sum.toLocaleString();
    }

    function PaidOrders() {
        let sum = 0;
        OrdersBusy.map((elem) => elem.filial?.filial_name === dataUser.filial.filial_name && elem.status_client === 'active' ? (sum += Number(elem.paid)) : 0);
        return sum.toLocaleString();
    }

    function DebtOrders() {
        let sum = 0;
        OrdersBusy.map((elem) => elem.filial?.filial_name === dataUser.filial.filial_name && elem.status_client === 'active' ? (sum += Number(elem.debt)) : 0);
        return sum.toLocaleString();
    }

    function CountUsers() {
        let sum = 0;
        OrdersBusy.map((elem) => elem.filial?.filial_name === dataUser.filial.filial_name && elem.status_client === 'active' ? (sum += Number(elem.count_users)) : 0);
        return sum.toLocaleString();
    }

    // eslint-disable-next-line no-lone-blocks
    {
        Orders.map((elem) =>
            elem.filial?.filial_name === dataUser.filial.filial_name ? data.push({
                id: elem.id,
                key: elem.key,
                number: <NavLink className={styles.tablink}
                                 to={dataUser.role === 'manager' ? `/manager/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'director' ? `/director/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'Admin' ? `/admin/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : null}>{elem?.rooms}</NavLink>,
                name: (
                    <>
                        <NavLink style={{marginLeft: "10px"}} className={styles.tablink}
                                 to={dataUser.role === 'manager' ? `/manager/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'director' ? `/director/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'Admin' ? `/admin/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : null}>{elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.users[0]?.name : null).filter(Boolean).join(', ')}</NavLink>

                        <NavLink style={{marginLeft: "10px"}} className={styles.tablink}
                                 to={dataUser.role === 'manager' ? `/manager/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'director' ? `/director/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'Admin' ? `/admin/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : null}>{elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.users[0]?.surname : null).filter(Boolean).join(', ')}</NavLink>

                        <NavLink style={{marginLeft: "10px"}} className={styles.tablink}
                                 to={dataUser.role === 'manager' ? `/manager/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'director' ? `/director/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'Admin' ? `/admin/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : null}>{elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.users[0]?.father_name : null).filter(Boolean).join(', ')}</NavLink>
                    </>
                ),
                country: (
                    <NavLink className={styles.tablink}
                             to={dataUser.role === 'manager' ? `/manager/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'director' ? `/director/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'Admin' ? `/admin/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : null}>{elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.country : null).filter(Boolean).join(', ')}</NavLink>
                ),
                dateofarrival: (
                    <NavLink className={styles.tablink}
                             to={dataUser.role === 'manager' ? `/manager/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'director' ? `/director/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'Admin' ? `/admin/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : null}>{elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.arrival_date.slice(0, 10) : null).filter(Boolean).join(', ')}</NavLink>
                ),
                departuredate: (
                    <NavLink className={styles.tablink}
                             to={dataUser.role === 'manager' ? `/manager/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'director' ? `/director/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'Admin' ? `/admin/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : null}>{elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.departure_date.slice(0, 10) : null).filter(Boolean).join(', ')}</NavLink>
                ),
                numberofpeople: (
                    <NavLink className={styles.tablink}
                             to={dataUser.role === 'manager' ? `/manager/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'director' ? `/director/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'Admin' ? `/admin/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : null}>{elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.count_users : null).filter(Boolean).join(', ')}</NavLink>
                ),
                tariff: <NavLink className={styles.tablink}
                                 to={dataUser.role === 'manager' ? `/manager/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'director' ? `/director/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'Admin' ? `/admin/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : null}>{elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? Number(e.definition).toLocaleString() : null).filter(Boolean).join(', ')}</NavLink>,
                accrued: (
                    <NavLink className={styles.tablink}
                             to={dataUser.role === 'manager' ? `/manager/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'director' ? `/director/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'Admin' ? `/admin/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : null}>{elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? Number(e.total_payable).toLocaleString() : null).filter(Boolean).join(', ')}</NavLink>
                ),
                paid: (
                    elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.paid : null).filter(Boolean).join(', ') ?
                        <NavLink
                            className={styles.tablinkActiveColor}>{elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? Number(e.paid).toLocaleString() : null).filter(Boolean).join(', ')}</NavLink> :
                        <NavLink
                            className={styles.tablink}>{elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? Number(e.paid).toLocaleString() : null).filter(Boolean).join(', ')}</NavLink>
                ),
                debtaccrual: (
                    elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.debt : null).filter(Boolean).join(', ') ?
                        <NavLink className={styles.tablinkActive}
                                 to={dataUser.role === 'manager' ? `/manager/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'director' ? `/director/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'Admin' ? `/admin/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : null}>{elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? Number(e.debt).toLocaleString() : null).filter(Boolean).join(', ')}</NavLink> :
                        <NavLink className={styles.tablink}
                                 to={dataUser.role === 'manager' ? `/manager/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'director' ? `/director/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'Admin' ? `/admin/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : null}>{elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? Number(e.debt).toLocaleString() : null).filter(Boolean).join(', ')}</NavLink>
                ),
                company: (
                    <NavLink className={styles.tablink}
                             to={dataUser.role === 'manager' ? `/manager/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'director' ? `/director/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : dataUser.role === 'Admin' ? `/admin/room/${elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.id : null).filter(Boolean).join(', ')}` : null}>{elem.orders.map(e => e.status === 'busy' && e.status_client === 'active' ? e.company : null)}</NavLink>
                ),
            }) : null
        );
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
        },
        {
            title: `${t("Finance.table.2")}`,
            dataIndex: "dateofarrival",
            key: "dateofarrival",
        },
        {
            title: `${t("Finance.table.3")}`,
            dataIndex: "departuredate",
            key: "departuredate",
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
                    x: 1400,
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
                            <Table.Summary.Cell index={5}>{CountUsers().toLocaleString()}</Table.Summary.Cell>
                            <Table.Summary.Cell index={6}>{sumOrders().toLocaleString()}</Table.Summary.Cell>
                            <Table.Summary.Cell index={7}>
                                {TotalPayableOrders().toLocaleString()}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={8}>{PaidOrders().toLocaleString()}</Table.Summary.Cell>
                            <Table.Summary.Cell index={9}>{DebtOrders()}</Table.Summary.Cell>
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

export default CalendarTable;
