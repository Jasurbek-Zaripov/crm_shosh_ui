import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import Input from '../../../../../common/input';
import {OrdersGet} from '../../../../../redux/orders';
import ModalCommon from "./../../../../../common/modal/index"
import dayjs from 'dayjs';
import styles from "./style.module.css"
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import SelectCommon from '../../../../../common/select';
import {ChangePost} from '../../../../../redux/change';
import {API_URL} from "../../../../../utils/api";

const PaytClose = ({open, HandleClose, HandleSubmits}) => {
    const {t} = useTranslation();

    const [night, setNight] = useState(0);

    const [NumberRights, setNumberRights] = useState(null);
    const [price2, setPrice2] = useState(0);
    const [PaymentType2, setPaymentType2] = useState(null);
    const dispatch = useDispatch();
    const OrderGet = useSelector((state) => state.Order.OrdersGet.data)
    const {id} = useParams();
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"));

    const dataFind = OrderGet.filter((order) => order.id === id);
    useEffect(() => {
        dispatch(OrdersGet())
    }, [])
    const [value, setValue] = useState(dayjs(dataFind.map(elem => elem.arrival_date)[0]));
    const [value2, setValue2] = useState(dayjs(''));

    const DateFormat = (date) => {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            time = "" + `${d.getHours().toString().replace(/^(\d)$/, '0$1')}:${d.getMinutes().toString().replace(/^(\d)$/, '0$1')}`,
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        let Month = [year, month, day].join("-");
        return [Month, time].join("T")
    };
    const DateFormat2 = (date) => {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            time = "" + `${d.getHours().toString().replace(/^(\d)$/, '0$1')}:${d.getMinutes().toString().replace(/^(\d)$/, '0$1')}`,
            year = d.getFullYear();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        let Month = [year, month, day].join("-");
        return [Month, time].join("T")
    };
    const date1 = new Date(DateFormat(dataFind.map(elem => elem.arrival_date)[0])).getTime();
    const date2 = new Date(DateFormat2(value2.$d)).getTime();
    useEffect(() => {
        const timeDiff = Math.abs(date2 - date1);
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setNumberRights(diffDays)
    }, [date1, date2]);
    const HandleSubmit = async () => {
        const body = {
            total_payable: Number(dataFind.map(elem => elem.total_payable)) - (Number(dataFind.map(elem => elem.booking)) - Number(dataFind.map(elem => elem.definition)) * Number(NumberRights)),
            paid: Number(dataFind.map(elem => elem.paid)) - (Number(dataFind.map(elem => elem.booking)) - Number(dataFind.map(elem => elem.definition)) * Number(NumberRights)),
            departure_date: DateFormat2(value2.$d),
        }
        await axios.put(`${API_URL}/orders/${id}`, body)
            .then(res => res)
        await dispatch(
            ChangePost({
                full_name: dataFind.map(elem => elem.users.map(e => e.name)[0])[0],
                staff: data.id,
                rooms: dataFind.map(elem => elem.rooms.id)[0],
                cash_coming: PaymentType2 === 'Наличные' ? price2 : 0,
                enum_coming: PaymentType2 === 'Перечисление' ? price2 : 0,
                departure_date: dataFind.map(elem => elem.departure_date)[0]
            })
        )
        const bodyrooms2 = {
            status: "empty",
            color: "#0d1247"
        };
        const bodyrooms = {
            status: "empty",
        };
        await axios
            .put(
                `${API_URL}/orders/${id}`,
                bodyrooms2
            )
            .then((res) => res);
        await axios
            .put(
                `${API_URL}/rooms/${dataFind.map(
                    (elem) => elem.rooms?.id
                )}`,
                bodyrooms
            )
            .then((res) => res);

        const body2 = {
            debt: Number(dataFind.map(elem => elem.debt)) - Number(price2),
            paid: Number(dataFind.map(elem => elem.paid)) + Number(price2)
        }
        await axios.put(`${API_URL}/orders/${id}`, body2)
            .then(res => res)
        window.location.reload();
    }
    return (
        <ModalCommon onCancel={HandleClose} open={open} HandleClose={HandleClose} titleText={t("Room.27")}>
            <div className={styles.Wrapper}>
                <div className={styles.Calendar}>
                    <span>{t("appilcation.table.2")} : {dataFind.map(elem => elem.arrival_date.slice(0, 10))}</span>
                    <p>{t("application_add.10")}</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                            <DateTimePicker
                                value={value2}
                                onChange={(newValue) => setValue2(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <Input
                    required
                    style={{marginLeft: "12px"}}
                    text={t("application_add.1")}
                    value={NumberRights}
                    placeholder={0}
                />
                <div>
                    {dataFind.map(elem => elem.debt != 0 ?
                        <div className={styles.Wrapper}>
                            <Input text={t("Room.29")} onChange={(e) => setPrice2(e.target.value)}/>
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
                            <h3>{t("Room.30")} : {Number(dataFind.map(elem => elem.debt)) - Number(price2)} {t("Room.34")}</h3>

                        </div> : null)}
                </div>
                <h3>{t("Room.33")} : {Number(dataFind.map(elem => elem.booking)) - Number(dataFind.map(elem => elem.definition)) * Number(NumberRights)} {t("Room.34")}</h3>
                <div className={styles.buttons}>
                    <button onClick={HandleClose}>{t("Room.31")}</button>
                    <button onClick={HandleSubmit}>{t("Room.32")}</button>
                </div>
            </div>
        </ModalCommon>
    )
}

export default PaytClose