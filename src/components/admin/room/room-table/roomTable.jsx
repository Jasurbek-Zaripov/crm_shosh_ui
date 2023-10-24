import React from "react";
import TableCommon from "../../../../common/table";
import {useTranslation} from "react-i18next";
import "./table.css";

const RoomTable = ({dataFind}) => {
    const {t} = useTranslation();
    const data = [];
    dataFind?.map((order) => {
        data.push({
            id: order.id,
            name: (
                <div style={{display: "flex", alignItems: 'center'}}>
                    <span>{order.users.map(e => e.name)[0]} </span>
                    <span style={{marginRight: "10px", marginLeft: "10px"}}>{order.users.map(e => e.surname)[0]}</span>
                    <p style={{display: "flex", margin: 0, padding: 0,}}>{order.users.map(e => e.father_name)[0]}</p>
                </div>
            ),
            dateofarrival: order.arrival_date.slice(0, 10),
            departuredate: order.departure_date.slice(0, 10),
            checkintime: order.arrival_date.slice(11, 16),
            departuretime: order.arrival_date.slice(11, 16),
            numberofpeople: order.count_users,
            tariff: Number(order.definition).toLocaleString(),
            company: order.company,
            totalamount: Number(order.total_payable).toLocaleString(),
            paid: Number(order.paid).toLocaleString(),
            debtaccrual: order.debt === '' ? 0 : Number(order.debt).toLocaleString(),
        });
    });

    const columns = [
        {
            title: `${t("Room.1")}`,
            dataIndex: "name",
            key: "name",
            fixed: "left",
            width: 330
        },
        {
            title: `${t("Room.2")}`,
            dataIndex: "dateofarrival",
            key: "dateofarrival",
            width: 120
        },
        {
            title: `${t("Room.3")}`,
            dataIndex: "departuredate",
            key: "departuredate",
            width: 120

        },
        {
            title: `${t("Room.4")}`,
            dataIndex: "checkintime",
            key: "checkintime",
        },
        {
            title: `${t("Room.5")}`,
            dataIndex: "departuretime",
            key: "departuretime",
        },
        {
            title: `${t("Room.6")}`,
            dataIndex: "numberofpeople",
            key: "numberofpeople",
        },
        {
            title: `${t("Room.7")}`,
            dataIndex: "tariff",
            key: "tariff",
        },
        {
            title: `${t("Room.8")}`,
            dataIndex: "company",
            key: "company",
        },
        {
            title: `${t("Room.9")}`,
            dataIndex: "totalamount",
            key: "totalamount",
        },
        {
            title: `${t("Room.10")}`,
            dataIndex: "paid",
            key: "paid",
        },
        {
            title: `${t("Room.11")}`,
            dataIndex: "debtaccrual",
            key: "debtaccrual",
        },
    ];
    return (
        <>
            <TableCommon
                pagination={false}
                bordered
                columns={columns}
                data={data}
                scroll={{
                    x: 1300,
                }}
            />
        </>
    );
};

export default RoomTable;
