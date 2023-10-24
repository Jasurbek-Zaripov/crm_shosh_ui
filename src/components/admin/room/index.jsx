import React, {useEffect} from "react";
import styles from "./styled.module.css";
import RoomTab from "./room-tab/roomTab";
import RoomTable from "./room-table/roomTable";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {OrdersGet} from '../../../redux/orders/index'
import {useDispatch, useSelector} from "react-redux";
import RoomUser from "./room-user";
import RoomOldTable from "./room-table-old/roomTable";

const RoomComponent = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const OrderGet = useSelector((state) => state.Order.OrdersGet.data)
    useEffect(() => {
        dispatch(OrdersGet())
    }, [])

    const {t} = useTranslation()
    const dataFind = OrderGet.filter((order) => order.id === id);

    return (
        <>
            <div className={styles.box_wrapper}>
                <h2 className={styles.room_title}>{t("Room.0")}{dataFind.map(elem => elem.rooms.rooms)}</h2>
                <RoomTable id={id} dataFind={dataFind}/>
                {dataFind.map(elem => elem.old.length > 0 ?
                    <h2 className={styles.room_title}>{t("Finance.4")}</h2> : null)}


                {dataFind.map(elem => elem.old.length > 0 ? <RoomOldTable id={id} dataFind={dataFind}/> : null)}

                <RoomUser id={id} dataFind={dataFind}/>
                <RoomTab id={id} dataFind={dataFind}/>
            </div>

        </>
    );
};

export default RoomComponent;
