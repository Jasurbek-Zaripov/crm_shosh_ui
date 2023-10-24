import React from "react";
import {useTranslation} from "react-i18next";
import "../../room-table/table.css";
import TableCommon from "../../../../../common/table";

const OtherServiesTab = ({dataFind}) => {
    const {t} = useTranslation();
    const ServiesData = dataFind.map((elem) => elem.services_orders);
    const ServiesId = ServiesData.map((serve) =>
        serve.filter((ser) => ser.services.id === 4)
    );

    const data = [];
    ServiesId.map((elem) => {
        data.push(
            elem.map((e) => {
                data.push({
                    price: Number(e.price).toLocaleString(),
                    commentary: e.comentary,
                    paymentMethod: e.type_payment,
                    paymentStatus: e.status_payment === 'Оплачено' ? Number(e.price).toLocaleString() : 0,
                    debtcalculation: e.status_payment === 'Долговое' ? Number(e.price).toLocaleString() : 0
                });
            })
        );
    });

    const columns = [
        {
            title: `${t("AdditServies.13")}`,
            dataIndex: "price",
            key: "price",
            fixed: "left",
        },
        {
            title: `${t("AdditServies.14")}`,
            dataIndex: "paymentMethod",
            key: "paymentMethod",
        },
        {
            title: `${t("AdditServies.24")}`,
            dataIndex: "paymentStatus",
            key: "paymentStatus",
        },
        {
            title: `${t("AdditServies.18")}`,
            dataIndex: "commentary",
            key: "commentary",
        },
        {
            title: `${t("Room.22")}`,
            dataIndex: "debtcalculation",
            key: "debtcalculation",
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
                    x: 1000,
                }}
            />
        </>
    );
};

export default OtherServiesTab;
