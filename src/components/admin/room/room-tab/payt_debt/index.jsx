import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import Input from '../../../../../common/input';
import SelectCommon from '../../../../../common/select';
import {OrdersGet} from '../../../../../redux/orders';
import ModalCommon from "./../../../../../common/modal/index"
import {ChangePost} from "../../../../../redux/change"
import styles from "./style.module.css"
import {API_URL} from "../../../../../utils/api";

const PaytDebt = ({open, HandleClose}) => {
    const {t} = useTranslation();
    const [price, setPrice] = useState(0);
    const [PaymentType, setPaymentType] = useState(null);
    const dispatch = useDispatch();
    const OrderGet = useSelector((state) => state.Order.OrdersGet.data)
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"));

    useEffect(() => {
        dispatch(OrdersGet())
    }, [])
    const {id} = useParams();
    const dataFind = OrderGet.filter((order) => order.id === id);

    const HandleSubmit = async () => {
        const body = {
            debt: Number(dataFind.map(elem => elem.debt)) - Number(price),
            paid: Number(dataFind.map(elem => elem.paid)) + Number(price)
        }
        await axios.put(`${API_URL}/orders/${id}`, body)
            .then(res => res)
        await dispatch(
            ChangePost({
                full_name: dataFind.map(elem => elem.users.map(e => e.name)[0])[0],
                staff: data.id,
                rooms: dataFind.map(elem => elem.rooms.id)[0],
                cash_coming: PaymentType === 'Наличные' ? price : 0,
                enum_coming: PaymentType === 'Перечисление' ? price : 0,
            })
        )
        window.location.reload();
    }
    return (
        <ModalCommon open={open} HandleClose={HandleClose} onCancel={HandleClose} titleText={t("Room.26")}>
            <div className={styles.Wrapper}>
                <Input text={t("Room.29")} onChange={(e) => setPrice(e.target.value)}/>
                <SelectCommon
                    style={{width: "100%"}}
                    options={[
                        {value: "Наличные", label: t("application_add.35")},
                        {value: "Перечисление", label: t("application_add.34")},
                    ]}
                    defaultValue={t("application_add.3")}
                    onChange={(e) => setPaymentType(e)}
                    className={styles.application_select}
                    text={t("application_add.3")}
                />
                <h3>{t("Room.30")} : {Number(dataFind.map(elem => elem.debt)) - Number(price)} {t("Room.34")}</h3>
                <div className={styles.buttons}>
                    <button onClick={HandleClose}>{t("Room.31")}</button>
                    <button onClick={HandleSubmit}>{t("Room.32")}</button>
                </div>
            </div>
        </ModalCommon>
    )
}

export default PaytDebt