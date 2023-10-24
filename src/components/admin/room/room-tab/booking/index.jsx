import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import "../../room-table/table.css";
import TableCommon from "../../../../../common/table";
import {useDispatch, useSelector} from "react-redux";
import {OrdersGet} from "../../../../../redux/orders";
import {useParams} from "react-router-dom";

const BookingTab = () => {
    const {t} = useTranslation();
    const {id} = useParams();

    const data = [];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(OrdersGet())
    }, [])
    const OrderGet = useSelector((state) => state.Order.OrdersGet.data)
    const dataFind = OrderGet.filter((order) => order.id === id);
    dataFind.map((order) => {
        data.push({
            admin: order.staff.staff_name,
            date: order.arrival_date.slice(0, 10),
            accrued: Number(order.booking).toLocaleString(),
            paymentmethod: order.type_payment,
        });
    });
    const columns = [
        {
            title: `${t("Room.17")}`,
            dataIndex: "admin",
            key: "admin",
            fixed: "left",
        },
        {
            title: `${t("Room.18")}`,
            dataIndex: "date",
            key: "date",
        },
        {
            title: `${t("Room.19")}`,
            dataIndex: "accrued",
            key: "accrued",
        },

        {
            title: `${t("Room.21")}`,
            dataIndex: "paymentmethod",
            key: "paymentmethod",
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

export default BookingTab;
