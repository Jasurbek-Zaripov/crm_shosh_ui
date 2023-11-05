import * as React from "react";
import {useEffect, useRef, useState} from "react";
import "./app.css"
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Button from "../../../../common/button";
import Input from "../../../../common/input";
import SelectCommon from "../../../../common/select";
import TextArea from "../../../../common/textarea";
import {OrdersPost} from "../../../../redux/orders";
import {RoomsGet, RoomsPut} from "../../../../redux/rooms";
import styles from "./style.module.css";
import dayjs from 'dayjs';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';

function ApplictionForm({id}) {
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


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [rooms, setRooms] = useState(null);
    const [NumberRights, setNumberRights] = useState(null);
    const [PrePayment, setPrePayment] = useState(null);
    const [Countery, setCountery] = useState(null);
    const [PaymentType, setPaymentType] = useState(null);
    const [Discount, setDiscount] = useState(null);
    const [Phone, setPhone] = useState(null)
    const [NumberGuests, setNumberGuests] = useState(null);
    const [Company, setCompany] = useState(null);
    const [Comment, setComment] = useState(null);
    const [CommentCompany, setCommentCompany] = useState(null);
    const [StatusPayment, setStatusPayment] = useState(null);
    const [active, setActive] = useState(null);
    const [Color, setColor] = useState('');
    const TotalPay = useRef();

    useEffect(() => {
        const timeDiff = Math.abs(date2 - date1);
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setNumberRights(diffDays)
    }, [date1, date2]);
    useEffect(() => {
        dispatch(RoomsGet());
    }, []);
    const EmpytRooms = useSelector((state) => state.Rooms.RoomsGet.data);
    const EmpytRoomsDefination = Number(EmpytRooms.filter(elem => elem.id === rooms)[0]?.definition)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            status: "busy"
        }
        await dispatch(RoomsPut({body, id: rooms}))
        await dispatch(
            OrdersPost({
                rooms: Number(rooms),
                staff: JSON.parse(window.localStorage.getItem("AuthDataUser"))?.id,
                number_night: NumberRights,
                type_payment: PaymentType,
                phone: Phone,
                definition: EmpytRoomsDefination - Discount,
                sale: Discount,
                arrival_date: DateFormat(value.$d),
                departure_date: DateFormat2(value2.$d),
                count_users: NumberGuests,
                company: Company,
                total_payable: TotalPay.current.value,
                booking: TotalPay.current.value,
                country: Countery,
                comentary: Comment,
                paid: StatusPayment === 'Оплачено' ? TotalPay.current.value : '',
                debt: StatusPayment === 'Долговое' ? TotalPay.current.value : '',
                status_payment: StatusPayment,
                company_details: CommentCompany,
                color: Color,
                status_client: active,
                filial: JSON.parse(window.localStorage.getItem("AuthDataUser"))?.filial?.id
            })
        );
        if (dataUser.role === 'Admin') {
            navigate(`/admin/applicationadd/${window.localStorage.getItem("OrdersData")}`)
        } else if (dataUser.role === 'manager') {
            navigate(`/manager/applicationadd/${window.localStorage.getItem("OrdersData")}`)
        }

        window.location.reload()
    };
    const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"))
    const option = []
    EmpytRooms.map(elem =>
        elem.filial?.filial_name === dataUser.filial.filial_name ?
            option.push({
                value: elem.id,
                label: (
                    <>
                        <span style={{marginRight: "3px"}}>{elem.rooms}</span> |
                        <span style={{marginLeft: "3px", marginRight: "3px"}}>{elem.type}</span> |
                        <span style={{marginLeft: "3px"}}>{elem.count} <i className='bx bxs-user' style={{
                            position: "relative",
                            top: "1px"
                        }}></i></span>
                    </>
                )
            }) : null
    )
    const dataColor = [
        {
            id: 1,
            color: "red",
        },
        {
            id: 2,
            color: "yellow",
        },
        {
            id: 3,
            color: "green",
        },
        {
            id: 4,
            color: "gray",
        },
        {
            id: 5,
            color: "blue",
        },
        {
            id: 6,
            color: "grow",
        },
        {
            id: 7,
            color: "pink",
        },
        {
            id: 8,
            color: "black",
        },

    ]
    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputs}>
                    <SelectCommon
                        options={option}
                        defaultValue={t("application_add.0")}
                        onChange={(e) => setRooms(e)}
                        className={styles.application_select}
                        text={t("application_add.0")}
                    />

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
                    <Input
                        required
                        type={"number"}
                        style={{marginLeft: "12px"}}
                        text={t("application_add.1")}
                        value={NumberRights}
                        placeholder={0}
                    />
                    <Input
                        required
                        type={"number"}
                        style={{marginLeft: "12px"}}
                        value={Discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        text={t("application_add.5")}
                        placeholder={0}
                    />
                    <SelectCommon
                        options={[
                            {value: "Наличные", label: t("application_add.35")},
                            {value: "Перечисление", label: t("application_add.34")},
                        ]}
                        defaultValue={t("application_add.3")}
                        onChange={(e) => setPaymentType(e)}
                        className={styles.application_select}
                        text={t("application_add.3")}
                    />
                    <SelectCommon
                        options={[
                            {value: "Долговое", label: t("AdditServies.23")},
                            {value: "Оплачено", label: t("AdditServies.24")},
                        ]}
                        defaultValue={t("AdditServies.16")}
                        onChange={(e) => setStatusPayment(e)}
                        className={styles.application_select}
                        text={t("AdditServies.16")}
                    />
                    <Input
                        required
                        style={{marginLeft: "12px"}}
                        value={PrePayment}
                        onChange={(e) => setCountery(e.target.value)}
                        text={t("application_add.15")}
                        placeholder={0}
                    />
                    <Input
                        required
                        value={NumberGuests}
                        type={"number"}

                        onChange={(e) => setNumberGuests(e.target.value)}
                        style={{marginLeft: "12px"}}
                        text={t("application_add.12")}
                        placeholder={0}
                    />
                    <Input
                        required
                        value={Company}
                        onChange={(e) => setCompany(e.target.value)}
                        style={{marginLeft: "12px"}}
                        text={t("application_add.13")}
                        placeholder={0}
                    />
                    <Input
                        required
                        value={Phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{marginLeft: "12px"}}
                        text={t("application_add.16")}
                        placeholder={0}
                    />
                    <div className={styles.inputdiv}>
                        <p>{t("application_add.19")}</p>
                        <input
                            required
                            // value={(EmpytRoomsDefination * NumberRights) - (NumberRights * Discount)}
                            ref={TotalPay}
                            placeholder={0}
                        />
                    </div>
                    <TextArea
                        value={CommentCompany}
                        onChange={(e) => setCommentCompany(e.target.value)}
                        styletextArea={{width: "350px", height: "40px"}}
                        style={{marginLeft: "15px", marginRight: "15px"}}
                        text={t("application_add.36")}
                    />
                    <div className={styles.colors}>
                        <p>{t("application_add.38")}</p>
                        <input type="color" onChange={e => setColor(e.target.value)} defaultValue={"#0419fd"}/>
                    </div>
                    <div className={styles.color_div}>
                        {dataColor.map((elem, index) =>
                            <button className={styles.box} type="button" onClick={(e) => setColor(e.target.value)}
                                    value={elem.color} key={index} style={{background: elem.color}}>

                            </button>
                        )}
                    </div>
                    <div className="radio-item-container">
                        <div className="radio-item">
                            <label htmlFor="vanilla" onChange={(e) => setActive(e.target.value)}>
                                <input type="radio" id="vanilla" name="flavor" value="active"/>
                                <span>{t("application_add.39")}</span>
                            </label>
                        </div>

                        <div className="radio-item">
                            <label htmlFor="chocolate" onChange={(e) => setActive(e.target.value)}>
                                <input type="radio" id="chocolate" name="flavor" value="not_active"/>
                                <span>{t("application_add.40")} </span></label>
                        </div>

                    </div>
                </div>

                <div className={styles.bottom}>
                    <TextArea
                        value={Comment}
                        onChange={(e) => setComment(e.target.value)}
                        styletextArea={{width: "350px"}}
                        style={{marginLeft: "15px", marginRight: "15px"}}
                        text={t("application_add.14")}
                    />
                    <div className={styles.bottom_left}>
                        <Button
                            style={{
                                width: "180px",
                                height: "40px",
                                marginTop: "20px",
                                marginLeft: "10px",
                            }}
                            type="submit"
                        >
                            {t("application_add.21")}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default ApplictionForm;
