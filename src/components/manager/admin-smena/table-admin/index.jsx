import React from "react";
import TableCommon from "../../../../common/table";
import {useTranslation} from "react-i18next";
import "./table.css";
import styles from "./style.module.css"

const RoomUser = ({dataFind}) => {
    const {t} = useTranslation();
    const data = [];
    dataFind?.map((order) => {
        order.users.map((elem) => data.push({
            id: elem.id,
            name: (
                <div style={{display: "flex", alignItems: 'center'}}>
                    <span>{elem.name} </span>
                    <span style={{marginRight: "10px", marginLeft: "10px"}}>{elem.surname}</span>
                    <p style={{display: "flex", margin: 0, padding: 0,}}>{elem.father_name}</p>
                </div>
            ),
            dateofarrival: (
                <span>{elem.seriya} {elem.number} </span>
            ),
            departuredate: (
                <span>{elem.birthday} </span>
            ),
            checkintime: (
                <span>{elem.dateof} </span>
            ),
            departuretime: (
                <span>{elem.adress}</span>
            ),
            numberofpeople: (
                <span>{elem.phone}</span>
            )
        }))

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
            title: `${t("application_add.28")}`,
            dataIndex: "dateofarrival",
            key: "dateofarrival",
            width: 120
        },
        {
            title: `${t("application_add.29")}`,
            dataIndex: "departuredate",
            key: "departuredate",
            width: 120

        },
        {
            title: `${t("application_add.30")}`,
            dataIndex: "checkintime",
            key: "checkintime",
        },
        {
            title: `${t("application_add.31")}`,
            dataIndex: "departuretime",
            key: "departuretime",
        },
        {
            title: `${t("application_add.32")}`,
            dataIndex: "numberofpeople",
            key: "numberofpeople",
        },
        {
            title: `${t("application_add.33")}`,
            dataIndex: "tariff",
            key: "tariff",
        },
    ];
    return (
        <div className={styles.Wrapper}>
            <h2>{t("Room.37")}</h2>
            <TableCommon
                pagination={false}
                bordered
                columns={columns}
                data={data}
                scroll={{
                    x: 1300,
                }}
            />
        </div>
    );
};

export default RoomUser;
