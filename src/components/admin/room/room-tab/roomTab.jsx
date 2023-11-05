import {Tabs} from "antd";
import "./tabs.css";
import {useTranslation} from "react-i18next";
import Button from "../../../../common/button/index";
import styles from "./styled.module.css";

// tabpanel files
import BookingTab from "./booking";
import MiniBarTab from "./minibar/index";
import LaundryTab from "./laundry";
import ShtrafTab from "./shtraf";
import OtherServiesTab from "./other_servies";
import {useState} from "react";
import PaytDebt from "./payt_debt";
import PaytClose from "./close_payt";
import axios from "axios";
import {useDispatch} from "react-redux";
import ModalCommon from "../../../../common/modal";
import {useNavigate} from "react-router-dom";
import ModalPrint from "../modal-print";
import Input from "../../../../common/input";
import SelectCommon from "../../../../common/select";
import {ChangePost} from "../../../../redux/change";
import {API_URL} from "../../../../utils/api";
// tabpanel files

const onChange = (key) => {
    return key
};

const RoomTab = ({dataFind, id}) => {
    const {t} = useTranslation();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [price2, setPrice2] = useState(0);
    const [PaymentType2, setPaymentType2] = useState(null);
    const HandleOpen = () => {
        setOpen(true);
    };
    const HandleClose = () => {
        setOpen(false);
    };
    const [open2, setOpen2] = useState(false);
    const HandleOpen2 = () => {
        setOpen2(true);
    };
    const HandleClose2 = () => {
        setOpen2(false);
    };
    const [open3, setOpen3] = useState(false);
    const HandleOpen3 = () => {
        setOpen3(true);
    };
    const HandleClose3 = async () => {
        setOpen3(false);
    };
    const HandleRoomClose = async () => {
        HandleOpen3();
    };
    const [open4, setOpen4] = useState(false);
    const HandleOpen4 = () => {
        setOpen4(true);
    };
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"));

    const HandleSubmits = async () => {
        setOpen4(false);
        const bodyrooms = {
            status: "empty",
        };
        const body = {
            debt: Number(dataFind.map(elem => elem.debt)) - Number(price2),
            paid: Number(dataFind.map(elem => elem.paid)) + Number(price2)
        }
        await axios.put(`${API_URL}/orders/${id}`, body)
            .then(res => res)
        dispatch(
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
            color: "#0d1247",
            status_client: "not_active"
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
        window.location.reload();
    };
    const HandleClose4 = () => {
        setOpen4(false);
    };
    const navigate = useNavigate();
    const items = [
        {
            key: "0",
            label: t("Room.12"),
            children: <BookingTab/>,
        },
        {
            key: "1",
            label: t("Room.13"),
            children: <MiniBarTab dataFind={dataFind}/>,
        },
        {
            key: "2",
            label: t("Room.14"),
            children: <LaundryTab dataFind={dataFind}/>,
        },
        {
            key: "3",
            label: t("Room.15"),
            children: <ShtrafTab dataFind={dataFind}/>,
        },
        {
            key: "4",
            label: t("Room.16"),
            children: <OtherServiesTab dataFind={dataFind}/>,
        },
    ];

    return (
        <>
            <Tabs
                style={{marginTop: "60px", padding: "0"}}
                defaultActiveKey="0"
                items={items}
                onChange={onChange}
            />
            <div className={styles.btn_wrapper}>
                {dataFind.map((elem) =>
                    elem.status !== "empty" ? (
                        <Button
                            style={{
                                fontSize: "14px",
                                fontWeight: "400",
                                fontFamily: "Rubik",
                                padding: "11px 16px",
                            }}
                            onClick={HandleOpen}
                        >
                            {t("Room.26")}
                        </Button>
                    ) : (
                        <Button
                            disable={true}
                            style={{
                                fontSize: "14px",
                                fontWeight: "400",
                                fontFamily: "Rubik",
                                padding: "11px 16px",
                            }}
                        >
                            {t("Room.26")}
                        </Button>
                    )
                )}


                <Button
                    onClick={HandleOpen2}
                    style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Rubik",
                        padding: "11px 16px",
                    }}
                >
                    {t("Room.27")}
                </Button>

                <Button
                    onClick={HandleOpen4}
                    style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Rubik",
                        padding: "11px 16px",
                    }}
                >
                    {t("Room.28")}
                </Button>
                {dataFind.map((elem) =>
                    elem.debt === 0 ? (
                        <Button
                            onClick={HandleRoomClose}
                            style={{
                                fontSize: "14px",
                                fontWeight: "400",
                                fontFamily: "Rubik",
                                padding: "11px 16px",
                            }}
                        >
                            {t("Room.23")}
                        </Button>) : (
                        <Button
                            disable={true}
                            onClick={HandleRoomClose}
                            style={{
                                fontSize: "14px",
                                fontWeight: "400",
                                fontFamily: "Rubik",
                                padding: "11px 16px",
                            }}
                        >
                            {t("Room.23")}
                        </Button>))}
            </div>

            <PaytDebt open={open} HandleClose={HandleClose}/>
            <PaytClose open={open2} HandleClose={HandleClose2} HandleSubmits={HandleSubmits} dataFind={dataFind}/>
            <ModalPrint
                HandleRoomClose={HandleRoomClose}
                HandleClose3={HandleClose3}
                open3={open3}
            />
            <ModalCommon titleText={`${t("Room.28")} ?`} onCancel={HandleClose4} width={390} open={open4}>
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
                    <div className={styles.buttonsClose}>
                        <button onClick={HandleClose4}>{t("Room.36")}</button>
                        <button onClick={HandleSubmits}>{t("Room.35")}</button>
                    </div>
                </div>
            </ModalCommon>
        </>
    );
};
export default RoomTab;
