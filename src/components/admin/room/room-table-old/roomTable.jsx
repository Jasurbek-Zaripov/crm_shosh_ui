import React, {useState} from "react";
import TableCommon from "../../../../common/table";
import {useTranslation} from "react-i18next";
import "./table.css";
import Button from "../../../../common/button";
import Refund from "./payt_debt";

const RoomOldTable = ({dataFind}) => {
    const {t} = useTranslation();
    const [open, setOpen] = useState(false);
    const HandleOpen = () => {
        setOpen(true);
    };
    const HandleClose = () => {
        setOpen(false);
    };
    const data = [];
    dataFind?.map((order) => {
        order.old.map((old) =>
            data.push({
                id: old.id,
                name: (
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span>{old.users} </span>
                    </div>
                ),
                dateofarrival: old.arrival_date.slice(0, 10),
                departuredate: old.departure_date.slice(0, 10),
                checkintime: old.arrival_date.slice(11, 16),
                departuretime: old.arrival_date.slice(11, 16),
                numberofpeople: old.count_users,
                tariff: Number(old.definition).toLocaleString(),
                company: old.company,
                totalamount: Number(old.total_payable).toLocaleString(),
                paid: Number(old.paid).toLocaleString(),
                debtaccrual: old.debt === "" ? 0 : Number(old.debt).toLocaleString(),
                early_release: old.early_release.slice(0, 10),
                refund: old.refund === "" ? 0 : Number(old.refund).toLocaleString(),
            })
        );
    });

    const columns = [
        {
            title: `${t("Room.1")}`,
            dataIndex: "name",
            key: "name",
            fixed: "left",
            width: 330,
        },
        {
            title: `${t("Room.2")}`,
            dataIndex: "dateofarrival",
            key: "dateofarrival",
            width: 120,
        },
        {
            title: `${t("Room.3")}`,
            dataIndex: "departuredate",
            key: "departuredate",
            width: 120,
        },
        {
            title: `${t("Finance.table.19")}`,
            dataIndex: "early_release",
            key: "early_release",
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

        {
            title: `${t("Finance.5")}`,
            dataIndex: "refund",
            key: "refund",
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
                    x: 1700,
                }}
            />
            {dataFind?.map((order) => order.old.map((old) => Number(old.refund) !== 0 ? <Button
                style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    fontFamily: "Rubik",
                    padding: "11px 16px",
                    display: "flex",
                    marginLeft: "auto",
                    marginTop: "10px",
                }}
                onClick={HandleOpen}
            >
                {t("Finance.5")}
            </Button> : null))}

            <Refund open={open} HandleClose={HandleClose}/>
        </>
    );
};

export default RoomOldTable;
