import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import Input from '../../../../../common/input';
import SelectCommon from '../../../../../common/select';
import {ChangePost} from '../../../../../redux/change';
import {OrdersGet} from '../../../../../redux/orders';
import ModalCommon from "./../../../../../common/modal/index"
import styles from "./style.module.css"
import {API_URL} from "../../../../../utils/api";

const Refund = ({open, HandleClose}) => {
    const {t} = useTranslation();
    const [price, setPrice] = useState(0);
    const [PaymentType2, setPaymentType2] = useState(null);

    const dispatch = useDispatch();
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"));

    const OrderGet = useSelector((state) => state.Order.OrdersGet.data)

    useEffect(() => {
        dispatch(OrdersGet())
    }, [])

    const {id} = useParams();
    const dataFind = OrderGet.filter((order) => order.id === id);
    const HandleSubmit = async () => {
        const body = {
            debt: Number(dataFind.map(elem => elem.debt)) - Number(price),
        }
        const body2 = {
            total_payable: Number(dataFind.map(elem => elem.total_payable)) - Number(price),
            paid: Number(dataFind.map(elem => elem.paid)) - Number(price)
        }
        const body3 = {
            refund: Number(dataFind.map(elem => elem.old.map(e => e.refund)[0])[0]) - Number(price),
            total_payable: Number(dataFind.map(elem => elem.old.map(e => e.total_payable)[0])[0]) - Number(price),
            booking: Number(dataFind.map(elem => elem.old.map(e => e.booking)[0])[0]) - Number(price),
            paid: Number(dataFind.map(elem => elem.old.map(e => e.paid)[0])[0]) - Number(price)
        }
        await axios.put(`${API_URL}/oldorders/${dataFind.map(elem => elem.old.map(e => e.id)[0])[0]}`, body3)
            .then(res => res)
        if (dataFind.map(elem => elem.debt) > 0) {
            await axios.put(`${API_URL}/orders/${id}`, body)
                .then(res => res)
        } else {
            await axios.put(`${API_URL}/orders/${id}`, body2)
                .then(res => res)
        }
        await dispatch(
            ChangePost({
                full_name: dataFind.map(elem => elem.users.map(e => e.name)[0])[0],
                staff: data.id,
                rooms: dataFind.map(elem => elem.rooms.id)[0],
                cash_coming: PaymentType2 === 'Наличные' ? price : 0,
                enum_coming: PaymentType2 === 'Перечисление' ? price : 0,
                departure_date: dataFind.map(elem => elem.departure_date)[0]
            })
        )

        window.location.reload();

    }
    return (
        <ModalCommon open={open} HandleClose={HandleClose} onCancel={HandleClose} titleText={t("Finance.5")}>
            <div className={styles.Wrapper}>
                <Input text={t("Room.29")} onChange={(e) => setPrice(e.target.value)}/>
                <SelectCommon
                    style={{width: "100%"}}
                    options={[
                        {value: "Наличные", label: t("application_add.35")},
                        {value: "Перечисление", label: t("application_add.34")},
                    ]}
                    defaultValue={t("application_add.3")}
                    onChange={(e) => setPaymentType2(e)}
                    className={styles.application_select}
                    text={t("application_add.3")}
                />
                <h3>{t("Finance.5")} : {Number(dataFind.map(elem => elem.old.map(e => e.refund)[0])) - Number(price)} {t("Room.34")}</h3>
                <div className={styles.buttons}>
                    <button onClick={HandleClose}>{t("Room.31")}</button>
                    <button onClick={HandleSubmit}>{t("Room.32")}</button>
                </div>
            </div>
        </ModalCommon>
    )
}

export default Refund