import * as React from "react";
import {useEffect, useRef, useState} from "react";
import "./app.css";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Button from "../../../../common/button";
import Input from "../../../../common/input";
import SelectCommon from "../../../../common/select";
import {OrdersPost} from "../../../../redux/orders";
import {RoomsEmpytGet, RoomsGet} from "../../../../redux/rooms";
import styles from "./style.module.css";
import dayjs from "dayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";
import {UsersPost} from "../../../../redux/users";
import {OldOrdersPost} from "../../../../redux/old_orders";
import {ChangePost} from "../../../../redux/change";
import {API_URL} from "../../../../utils/api";

function ApplictionForm({id}) {
    const [value, setValue] = useState(dayjs(""));
    const [value2, setValue2] = useState(dayjs(""));
    const Orders = useSelector((state) => state.Order.OrdersGet.data);
    const OrdersId = useSelector((state) => state.Order.OrdersPost.data2);
    const OrdersFilter = Orders.filter((elem) => elem.id === id);
    const DateFormat = (date) => {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            time =
                "" +
                `${d
                    .getHours()
                    .toString()
                    .replace(/^(\d)$/, "0$1")}:${d
                    .getMinutes()
                    .toString()
                    .replace(/^(\d)$/, "0$1")}`,
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        let Month = [year, month, day].join("-");
        return [Month, time].join("T");
    };
    const DateFormat2 = (date) => {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            time =
                "" +
                `${d
                    .getHours()
                    .toString()
                    .replace(/^(\d)$/, "0$1")}:${d
                    .getMinutes()
                    .toString()
                    .replace(/^(\d)$/, "0$1")}`,
            year = d.getFullYear();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        let Month = [year, month, day].join("-");
        return [Month, time].join("T");
    };
    const date1 = new Date(DateFormat(value.$d)).getTime();
    const date2 = new Date(DateFormat2(value2.$d)).getTime();
    const date3 = new Date(
        DateFormat2(OrdersFilter.map((elem) => elem.arrival_date)[0])
    ).getTime();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [rooms, setRooms] = useState(null);
    const [NumberRights, setNumberRights] = useState(null);
    const [NumberRights2, setNumberRights2] = useState(null);
    const Countery = useRef();
    const [PaymentType, setPaymentType] = useState(null);
    const [Discount, setDiscount] = useState(null);
    const [Color, setColor] = useState('');
    const Company = useRef();
    const Comment = useRef();
    const [StatusPayment, setStatusPayment] = useState(null);
    const TotalPay = useRef();
    const NumberGuests = useRef();
    const CommentCompany = useRef();
    const Phone = useRef();
    const OrderId = useSelector((state) => state.Order.OrdersGet.data);
    const OrderFind = OrderId.filter((elem) => elem.id === id);
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"));

    useEffect(() => {
        const timeDiff = Math.abs(date2 - date1);
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setNumberRights(diffDays);
    }, [date1, date2]);
    useEffect(() => {
        dispatch(RoomsGet())
    }, [])

    useEffect(() => {
        const timeDiff = Math.abs(date1 - date3);
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setNumberRights2(diffDays);
    }, [date1, date3]);
    useEffect(() => {
        dispatch(RoomsEmpytGet());
    }, []);
    const EmpytRooms = useSelector((state) => state.Rooms.RoomsEmpytGet.data);
    const Rooms = useSelector((state) => state.Rooms.RoomsGet.data);
    const EmpytRoomsDefination = Number(
        EmpytRooms.filter((elem) => elem.id === rooms)[0]?.definition
    );
    const RoomsDefination = Number(
        Rooms.filter((elem) => elem.id === rooms)[0]?.definition
    );
    const ratio =
        OrdersFilter.map((elem) => Number(elem.booking))[0] -
        OrdersFilter.map((elem) => Number(elem.rooms.definition))[0] *
        Number(NumberRights2);

    async function HandleOldOrders() {
        await dispatch(
            OldOrdersPost({
                rooms: OrdersFilter.map((elem) => elem.rooms.rooms)[0],
                number_night: NumberRights2,
                phone: OrdersFilter.map((elem) => elem.phone)[0],
                definition: OrdersFilter.map((elem) => elem.definition)[0],
                sale: OrdersFilter.map((elem) => elem.sale)[0],
                arrival_date: OrdersFilter.map((elem) => elem.arrival_date)[0],
                departure_date: OrdersFilter.map((elem) => elem.departure_date)[0],
                early_release: DateFormat(value.$d),
                count_users: OrdersFilter.map((elem) => elem.count_users)[0],
                company: OrdersFilter.map((elem) => elem.company)[0],
                total_payable:
                    OrdersFilter.map((elem) => Number(elem.total_payable))[0],
                booking: OrdersFilter.map((elem) => elem.booking)[0],
                country: OrdersFilter.map((elem) => elem.country)[0],
                comentary: OrdersFilter.map((elem) => elem.comentary)[0],
                paid: OrdersFilter.map((elem) => elem.paid)[0],
                debt:
                    OrdersFilter.map((elem) => elem.debt)[0],
                company_details: OrdersFilter.map((elem) => elem.company_details)[0],
                orders: window.localStorage.getItem("OrdersData"),
                refund: ratio,
                users: OrdersFilter.map((elem) => elem.users.map((e) => e.name)[0])[0],
            })
        );
    }

    async function HandleOrders() {
        await dispatch(
            OrdersPost({
                rooms: Number(rooms),
                staff: JSON.parse(window.localStorage.getItem("AuthDataUser"))?.id,
                number_night: NumberRights,
                type_payment: PaymentType,
                phone: Phone.current.value,
                definition: RoomsDefination - Discount,
                sale: Discount,
                arrival_date: DateFormat(value.$d),
                departure_date: DateFormat2(value2.$d),
                count_users: NumberGuests.current.value,
                company: Company.current.value,
                total_payable:
                    OrdersFilter.map((elem) => Number(elem.total_payable))[0] +
                    Number(TotalPay.current.value),
                booking: TotalPay.current.value,
                country: Countery.current.value,
                comentary: Comment.current.value,
                color: Color,
                paid:
                    StatusPayment === "Оплачено"
                        ? Number(OrdersFilter.map((elem) => elem.paid)[0]) +
                        Number(TotalPay.current.value)
                        : OrdersFilter.map((elem) => elem.paid)[0],
                debt:
                    StatusPayment === "Долговое"
                        ? OrdersFilter.map((elem) => Number(elem.debt))[0] +
                        Number(TotalPay.current.value)
                        : OrdersFilter.map((elem) => Number(elem.debt))[0],
                status_payment: StatusPayment,
                company_details: CommentCompany.current.value,
                filial: JSON.parse(window.localStorage.getItem("AuthDataUser"))?.filial
                    ?.id,
            })
        );
    }

    function HandleUsers() {
        dispatch(
            UsersPost({
                name: OrdersFilter.map((elem) => elem.users.map((e) => e.name)[0])[0],
                surname: OrdersFilter.map(
                    (elem) => elem.users.map((e) => e.surname)[0]
                )[0],
                father_name: OrdersFilter.map(
                    (elem) => elem.users.map((e) => e.father_name)[0]
                )[0],
                birthday: OrdersFilter.map(
                    (elem) => elem.users.map((e) => e.birthday)[0]
                )[0],
                phone: OrdersFilter.map((elem) => elem.users.map((e) => e.phone)[0])[0],
                seriya: OrdersFilter.map(
                    (elem) => elem.users.map((e) => e.seriya)[0]
                )[0],
                number: OrdersFilter.map(
                    (elem) => elem.users.map((e) => e.number)[0]
                )[0],
                adress: OrdersFilter.map(
                    (elem) => elem.users.map((e) => e.adress)[0]
                )[0],
                dateof: OrdersFilter.map(
                    (elem) => elem.users.map((e) => e.dateof)[0]
                )[0],
                orders: window.localStorage.getItem("OrdersData"),
            })
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            status: "busy",
        };
        const body2 = {
            status: "empty",
        };

        const bodyPut = {
            departure_date: DateFormat(value.$d),
            status: "empty",
            color: "#0d1247"
        };
        if (StatusPayment === 'Оплачено') {
            await dispatch(
                ChangePost({
                    full_name: OrdersFilter.map((elem) => elem.users.map((e) => e.name)[0])[0],
                    staff: data.id,
                    rooms: Number(rooms),
                    cash_coming: PaymentType === 'Наличные' ? TotalPay.current.value : 0,
                    enum_coming: PaymentType === 'Перечисление' ? TotalPay.current.value : 0,
                    arrival_date: DateFormat(value.$d)
                })
            );
            // await dispatch(
            //   ChangePost({
            //     full_name: OrdersFilter.map((elem) => elem.users.map((e) => e.name)[0])[0],
            //     staff: data.id,
            //     rooms: OrdersFilter.map((elem) =>elem.rooms.rooms)[0],
            //     cash_coming : PaymentType  === 'Наличные' ? TotalPay.current.value :0,
            //     enum_coming : PaymentType  === 'Перечисление' ? TotalPay.current.value :0,
            //     departure_date: DateFormat(value.$d)
            //   })
            // );
        }

        // eski roomni bo`shatib qo`yish
        await axios
            .put(
                `${API_URL}/rooms/${
                    OrdersFilter.map((elem) => elem.rooms.id)[0]
                }`,
                body2
            )
            .then((res) => res);
// eski orderni empty qilish va ketish vaqtini qisqartirish
        await axios
            .put(`${API_URL}/orders/${id}`, bodyPut)
            .then((res) => res);

        await HandleOrders();
        // yangi xona band qilish
        await axios
            .put(`${API_URL}/rooms/${rooms}`, body)
            .then((res) => res);

        await HandleUsers();
        await HandleOldOrders();
        navigate(
            `/admin/applicationadd/${window.localStorage.getItem("OrdersData")}`
        );

        window.location.reload();
    };
    const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"));
    const option = [];
    Rooms.map((elem) =>
        elem.filial?.filial_name === dataUser.filial.filial_name
            ? option.push({
                value: elem.id,
                label: (
                    <>
                        <span style={{marginRight: "3px"}}>{elem.rooms}</span> |
                        <span style={{marginLeft: "3px", marginRight: "3px"}}>
                {elem.type}
              </span>{" "}
                        |
                        <span style={{marginLeft: "3px"}}>
                {elem.count}{" "}
                            <i
                                class="bx bxs-user"
                                style={{position: "relative", top: "1px"}}
                            ></i>
              </span>
                    </>
                ),
            })
            : null
    );
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
                {Orders.map((elem) =>
                    elem.id === id ? (
                        <>
                            <div className={styles.inputs}>
                                <SelectCommon
                                    options={option}
                                    defaultValue={elem.rooms.rooms}
                                    onChange={(e) => setRooms(e)}
                                    className={styles.application_select}
                                    text={t("application_add.0")}
                                />

                                <div className={styles.Calendar}>
                                    <p>{t("application_add.9")}</p>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={["DateTimePicker", "DateTimePicker"]}
                                        >
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
                                        <DemoContainer
                                            components={["DateTimePicker", "DateTimePicker"]}
                                        >
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
                                        {value: "Наличные", label: t("application_add.34")},
                                        {value: "Перечисление", label: t("application_add.35")},
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

                                <div className={styles.inputdivs}>
                                    <p>{t("application_add.15")}</p>
                                    <input defaultValue={elem.country} ref={Countery}/>
                                </div>

                                <div className={styles.inputdivs}>
                                    <p>{t("application_add.12")}</p>
                                    <input defaultValue={elem.count_users} ref={NumberGuests} type={"number"}/>
                                </div>
                                {/* <Input
          required
            value={Company}
            onChange={(e) => setCompany(e.target.value)}
            style={{ marginLeft: "12px" }}
            text={t("application_add.13")}
            placeholder={0}
          /> */}
                                <div className={styles.inputdivs}>
                                    <p>{t("application_add.13")}</p>
                                    <input defaultValue={elem.company} ref={Company}/>
                                </div>

                                <div className={styles.inputdivs}>
                                    <p>{t("application_add.13")}</p>
                                    <input defaultValue={elem.phone} ref={Phone}/>
                                </div>
                                <div className={styles.inputdiv}>
                                    <p>{t("application_add.19")}</p>
                                    <input
                                        required
                                        value={
                                            RoomsDefination * NumberRights -
                                            NumberRights * Discount
                                        }
                                        ref={TotalPay}
                                        placeholder={0}
                                    />
                                </div>
                                {/* <TextArea
            value={CommentCompany}
            onChange={(e) => setCommentCompany(e.target.value)}
            styletextArea={{ }}
            style={{  }}
            text={t("application_add.36")}
          /> */}
                                <div
                                    className={styles.TextAreadiv}
                                    style={{marginLeft: "15px", marginRight: "15px"}}
                                >
                                    <p>{t("application_add.36")}</p>
                                    <textarea
                                        ref={CommentCompany}
                                        style={{width: "350px", height: "40px"}}
                                        defaultValue={elem.company_details}
                                    ></textarea>
                                </div>
                                <div className={styles.colors}>
                                    <p>{t("application_add.38")}</p>
                                    <input type="color" onChange={e => setColor(e.target.value)}
                                           defaultValue={"#0419fd"}/>
                                </div>
                                <div className={styles.color_div}>
                                    {dataColor.map((elem, index) =>
                                        <button className={styles.box} type="button"
                                                onClick={(e) => setColor(e.target.value)} value={elem.color} key={index}
                                                style={{background: elem.color}}>

                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className={styles.bottom}>
                                {/* <TextArea
            value={Comment}
            onChange={(e) => setComment(e.target.value)}
            styletextArea={{ width: "350px" }}
            style={{ marginLeft: "15px", marginRight: "15px" }}
            text={t("application_add.14")}
          /> */}
                                <div
                                    className={styles.TextAreadiv}
                                    style={{marginLeft: "15px", marginRight: "15px"}}
                                >
                                    <p>{t("application_add.14")}</p>
                                    <textarea
                                        ref={Comment}
                                        style={{width: "350px", height: "40px"}}
                                        defaultValue={elem.comentary}
                                    ></textarea>
                                </div>
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
                        </>
                    ) : null
                )}
            </form>
        </>
    );
}

export default ApplictionForm;
