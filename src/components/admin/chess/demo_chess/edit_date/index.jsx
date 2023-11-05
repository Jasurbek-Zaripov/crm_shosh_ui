import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import ModalCommon from "./../../.././../../common/modal/index"
import dayjs from "dayjs"
import styles from "./style.module.css"
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import Button from '../../../../../common/button';
import axios from 'axios';
import {API_URL} from "../../../../../utils/api";

const EditDate = ({open, onCancel, tempEvent}) => {
    const {t} = useTranslation();
    const [value, setValue] = useState(dayjs());
    const [value2, setValue2] = useState(dayjs());
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
    const date1 = new Date(DateFormat(value.$d)).getTime();
    const date2 = new Date(DateFormat2(value2.$d)).getTime();
    const handleEdit = async () => {
        const body = {
            arrival_date: DateFormat(value.$d),
            departure_date: DateFormat2(value2.$d)
        }
        await axios.put(`${API_URL}/orders/${tempEvent}`, body)
            .then(res => res)
        window.location.reload();
    }
    return (
        <ModalCommon open={open} onCancel={onCancel} titleText={t("chess.20")}>
            <div className={styles.Calendar}>
                <p>{t("application_add.9")}</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                        <DateTimePicker
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </div>
            <div className={styles.Calendar}>
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
            <Button
                className="mbsc-button-block"
                color="success"
                onClick={handleEdit}
            >
                {t("chess.17")}
            </Button>
        </ModalCommon>
    )
}

export default EditDate