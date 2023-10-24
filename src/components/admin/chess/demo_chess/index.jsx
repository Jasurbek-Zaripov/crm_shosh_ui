import {useCallback, useEffect, useRef, useState} from "react";
import "./chess.css";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import EditDate from './edit_date/index'
import "./app.css"
import {
    Button,
    CalendarNav,
    CalendarNext,
    CalendarPrev,
    CalendarToday,
    Eventcalendar,
    Input,
    momentTimezone,
    Popup,
    SegmentedGroup,
    SegmentedItem
} from "@mobiscroll/react";
import moment from "moment-timezone"
import styles from "./style.module.css"
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {RoomsGet} from "../../../../redux/rooms";
import dayjs from 'dayjs';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {useNavigate} from "react-router-dom";
import {OrdersGet} from "../../../../redux/orders";
import axios from "axios";
import {API_URL} from "../../../../utils/api";

const responsivePopup = {
    medium: {
        display: "anchored",
        width: 400,
        fullScreen: false,
        touchUi: false,
    },
};

function DemoChess() {
    const [rooms, setRooms] = useState([]);
    const [orders, setOrders] = useState([]);
    const [view, setView] = useState("month");
    const [isOpen, setOpen] = useState(false);
    const [tempEvent, setTempEvent] = useState(null);
    const [anchor, setAnchor] = useState(null);
    const [value, setValue] = useState(dayjs(''));
    const [value2, setValue2] = useState(dayjs(''));
    const [defination, setDefination] = useState();
    const [Discount, setDiscount] = useState(0);
    const [active, setActive] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    momentTimezone.moment = moment
    const HandleEditOpen = () => {
        setOpenEdit(true)
        onClose()
    }
    const HandleEditClose = () => {
        setOpenEdit(false)
    }
    const {t} = useTranslation();
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
    const [calView, setCalView] = useState({
        timeline: {
            type: "month",
        },
    });

    momentTimezone.moment = moment;

    const onClose = useCallback(() => {
        setOpen(false);
    }, []);

    const onEventClick = useCallback((args) => {
        setTempEvent({...args.event});
        setAnchor(args.domEvent.target);
        setOpen(true);
    }, []);

    const handleUpdate = async (evt) => {
        evt.preventDefault();
        const data = {
            departure_date: DateFormat2(value2.$d),
            number_night: Number(dataFind.map(elem => elem.number_night)) + NumberRights,
            definition: Number(dataFind.map(elem => elem.definition)) - Number(Discount),
            booking: Number(dataFind.map(elem => elem.booking)) + Number(Booking.current.value),
            total_payable: Number(dataFind.map(elem => elem.total_payable)) + Number(Booking.current.value),
            debt: Number(dataFind.map(elem => elem.debt)) + Number(Booking.current.value)
        };
        await axios.put(`${API_URL}/orders/${tempEvent.id}`, data)
        window.location.reload()
    };

    const changeView = (event) => {
        let calView;
        switch (event.target.value) {
            case "year":
                calView = {
                    timeline: {
                        type: "year",
                    },
                };
                break;
            case "week":
                calView = {
                    timeline: {
                        type: "week",
                    },
                };
                break;
            case "month":
            default:
                calView = {
                    timeline: {
                        type: "month",
                    },
                };
                break;
        }

        setView(event.target.value);
        setCalView(calView);
    };

    useEffect(() => {
        fetch(`${API_URL}/rooms`)
            .then((response) => response.json())
            .then((data) => setRooms(data));
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/orders`)
            .then((response) => response.json())
            .then((data) => setOrders(data));
    }, []);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(RoomsGet())
    }, [])
    useEffect(() => {
        dispatch(OrdersGet())
    }, [])
    const Rooms = useSelector((state) => state.Rooms.RoomsGet.data);
    const Orders = useSelector(state => state.Order.OrdersGet.data)
    const dataFind = Orders.filter((order) => order?.id === tempEvent?.id);

    const date1 = new Date(DateFormat(dataFind.map(elem => elem.departure_date))).getTime();
    const date2 = new Date(DateFormat2(value2.$d)).getTime();

    const Booking = useRef();
    const [NumberRights, setNumberRights] = useState(null);
    const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"))
    const HandleChange = async (e) => {
        const body = {
            status_client: e.target.value,
        }
        await axios.put(`${API_URL}/orders/${tempEvent.id}`, body)
            .then(res => res)
        window.location.reload();
    }
    const HandleChangeRoomEdit = async (e) => {
        const body = {
            rooms: e.target.value,
        }
        await axios.put(`${API_URL}/orders/${tempEvent.id}`, body)
            .then(res => res)
        window.location.reload();
    }
    useEffect(() => {
        const timeDiff = Math.abs(date2 - date1);
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setNumberRights(diffDays)
    }, [date1, date2]);
    const resource = [];
    const events = [];
    const navigate = useNavigate();
    const HandleOrderDelete = async () => {
        await axios.delete(`${API_URL}/deleteorders/${tempEvent.id}`)
            .then(res => res)
        window.location.reload()
    }
    const HandleOrder = () => {
        if (dataUser.role === 'Admin') {
            navigate(`/admin/applicationadd/${tempEvent.id}`)
            window.location.reload()
        } else if (dataUser.role === 'manager') {
            navigate(`/manager/applicationadd/${tempEvent.id}`)
            window.location.reload()
        }
    }
    const HandleOrderEdit = () => {
        if (dataUser.role === 'Admin') {
            navigate(`/admin/applicationedit/${tempEvent.id}`)

            window.location.reload()
        } else if (dataUser.role === 'manager') {
            navigate(`/manager/applicationedit/${tempEvent.id}`)
            window.location.reload()
        }
    }
    const HandleOut = () => {
        if (dataUser.role === 'Admin') {
            navigate(`/admin/room/${tempEvent.id}`)
            window.location.reload()
        } else if (dataUser.role === 'manager') {
            navigate(`/manager/room/${tempEvent.id}`)
            window.location.reload()
        }
        window.location.reload()
    }
    const OrdersFind = orders.filter(e => e.status !== 'deleted')
    OrdersFind.forEach((order) => {
        if (order.filial?.filial_name === dataUser.filial.filial_name) {
            const newObj = {
                id: order.id,
                title: `${order?.users[0]?.name} \n${order.users[0]?.phone}`,
                start: order.arrival_date,
                description: order.comentary,
                allDay: false,
                end: order.departure_date,
                color: order.color,
                status: order.status,
                resource: order.rooms.id,
                tooltip: `имя админ : ${order.staff.staff_name} ${order.staff.staff_surname} \nВремя бронирования: ${order.createdAt.slice(0, 10)}  \nкомпания : ${order.company}  \nИмя: ${order.users[0]?.name} ${order.users[0]?.surname} \nколичество гостей : ${order.count_users} \nТип номера: ${order.rooms.type}   \nНомер телефона: ${order.users[0]?.phone} \nБронировоние: ${order.booking} \nКоментарий: ${order.comentary}  \nДата заезда : ${order.arrival_date.slice(0, 10)} \nВремя заезда: ${order.arrival_date.slice(12, 16)} \nДата выезда: ${order.departure_date.slice(0, 10)} \nВремя выезда: ${order.arrival_date.slice(12, 16)} `,
            };
            events.push(newObj);
        }

    });

    rooms.forEach((room) => {
        if (room.filial?.filial_name === dataUser.filial.filial_name) {
            const newObj = {
                id: room.id,
                name: room.rooms,
                color: "ff4600",
            };
            resource.push(newObj);
        }
    });

    const renderMyHeader = () => {
        return (
            <>
                <CalendarNav className="md-event-listing-nav"/>
                <div className="md-event-listing-picker">
                    <SegmentedGroup value={view} onChange={changeView}>
                        <SegmentedItem value="year">{t("сhess.7")}</SegmentedItem>
                        <SegmentedItem value="week">{t("сhess.8")}</SegmentedItem>
                        <SegmentedItem value="month">{t("сhess.9")}</SegmentedItem>
                    </SegmentedGroup>
                </div>
                <CalendarPrev className="md-event-listing-prev"/>
                <CalendarToday className="md-event-listing-today"/>
                <CalendarNext className="md-event-listing-next"/>
            </>
        );
    };

    return (
        <div>
            <Eventcalendar
                theme="ios"
                themeVariant="light"
                view={calView}
                timezonePlugin={momentTimezone}
                data={events}
                renderHeader={renderMyHeader}
                resources={resource}
                cssClass="md-event-listing"
                onEventClick={onEventClick}
            />
            <Popup
                display="bottom"
                fullScreen={true}
                contentPadding={false}
                isOpen={isOpen}
                anchor={anchor}
                responsive={responsivePopup}
            >
                <div className="mbsc-form-group">
        <span className="rooms-spanss">{t("appilcation.table.9")} : {dataFind.map(elem => elem.departure_date
            .slice(0, 10))}</span>
                    <div className={styles.Calendar}>
                        <p>{t("appilcation.table.10")}</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                <DateTimePicker
                                    value={value2}
                                    onChange={(newValue) => setValue2(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div className={styles.inputdiv}>
                        <p>{t("Settings.number_table.3")}</p>

                        <Input
                            style={{
                                width: "100%",
                                backgroundColor: "#F5F5F5",
                                color: "black",
                                height: "50px",
                                borderRadius: "5px"
                            }}
                            value={NumberRights}
                            placeholder={0}
                        />
                    </div>
                    <div className={styles.inputdiv}>
                        <p>{t("application_add.5")}</p>
                        <Input
                            style={{
                                width: "100%",
                                backgroundColor: "#F5F5F5",
                                color: "black",
                                height: "50px",
                                borderRadius: "5px"
                            }}
                            value={Discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            text={t("application_add.5")}
                            placeholder={0}
                        />
                    </div>

                    <div className={styles.inputdiv}>
                        <p>{t("Room.12")}</p>
                        <input
                            value={Orders.filter(elem => elem.id === tempEvent?.id)[0]?.rooms?.definition * NumberRights - (NumberRights * Discount)}
                            ref={Booking}
                            placeholder={0}
                        />
                    </div>
                </div>

                <div class="radio-item-container">
                    <div class="radio-item">
                        <label for="vanilla" onChange={HandleChange}>
                            <input type="radio" id="vanilla" name="flavor" value="active"/>
                            <span>{t("application_add.39")}</span>
                        </label>
                    </div>

                    <div class="radio-item">
                        <label for="chocolate" onChange={HandleChange}>
                            <input type="radio" id="chocolate" name="flavor" value="not_active"/>
                            <span>{t("application_add.40")} </span></label>
                    </div>

                </div>

                <div className={styles.inputdiv}>
                    <p>{t("сhess.19")}</p>
                    <select className={styles.SelectRoomEdit} onChange={HandleChangeRoomEdit}>
                        <option defaultValue={t("chess.19")}></option>
                        {Rooms.map(elem =>
                            <option value={elem.id}>
                                <span value={elem.id} style={{marginRight: "3px"}}>{elem.rooms}</span> |
                                <span value={elem.id}
                                      style={{marginLeft: "3px", marginRight: "3px"}}>{elem.type}</span> |
                                <span value={elem.id} style={{marginLeft: "3px"}}>{elem.count} <i value={elem.id}
                                                                                                  class='bx bxs-user'
                                                                                                  style={{
                                                                                                      position: "relative",
                                                                                                      top: "1px"
                                                                                                  }}></i></span>
                            </option>
                        )}
                    </select>
                </div>
                <div className="mbsc-button-group">

                    <Button className="mbsc-button-block" onClick={HandleEditOpen} color="warning">
                        {t("сhess.20")}
                    </Button>
                </div>

                <div className="mbsc-button-group">
                    <Button className="mbsc-button-block" onClick={HandleOrder} color="warning">
                        {t("сhess.14")}
                    </Button>

                    <Button className="mbsc-button-block" onClick={HandleOut} color="primary">
                        {t("сhess.15")}
                    </Button>
                </div>
                <div style={{width: "93%", margin: "0 auto", display: "flex"}}>
                    <Button style={{width: "50%"}} className="mbsc-button-block" onClick={HandleOrderEdit}
                            color="secondary-color">
                        {t("сhess.16")}
                    </Button>
                    <Button style={{width: "50%"}} className="mbsc-button-block" onClick={HandleOrderDelete}
                            color="danger">
                        {t("сhess.18")}
                    </Button>
                </div>
                <div className="mbsc-button-group">
                    <Button
                        className="mbsc-button-block"
                        onClick={onClose}
                        color="danger"
                    >
                        {t("сhess.13")}
                    </Button>
                    <Button
                        className="mbsc-button-block"
                        color="success"
                        onClick={handleUpdate}
                    >
                        {t("сhess.17")}
                    </Button>
                </div>
            </Popup>
            <EditDate onCancel={HandleEditClose} tempEvent={tempEvent?.id} open={openEdit}/>
        </div>
    );
}

export default DemoChess;
