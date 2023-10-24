import React, {useEffect, useRef} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import ReactToPrint from "react-to-print";
import Button from "../../../../common/button";
import ModalCommon from "../../../../common/modal";
import {OrdersGet} from "../../../../redux/orders";
import styles from "./style.module.css";

const ModalPrint = ({HandleRoomClose, HandleClose3, open3}) => {
    const component = useRef();
    let today = new Date();
    const formatToday = today.toLocaleDateString("en-US", {
        day: "numeric",
        year: "numeric",
        month: "short",
    });

    const {id} = useParams();
    const {t} = useTranslation();
    const data = [];
    const dispatch = useDispatch();
    const OrderGet = useSelector((state) => state.Order.OrdersGet.data);
    useEffect(() => {
        dispatch(OrdersGet());
    }, []);
    const dataFind = OrderGet.filter((order) => order.id === id);

    function EnumComingRasxod2() {
        let sum = 0;
        // dataSmenaFind2.map((elem) =>  sum += Number(elem.cash_flow));
        dataFind.map(elem => elem.services_orders.map(services => sum += Number(services.price)))
        return sum;
    }

    dataFind?.map((order) => {
        data.push({
            id: order.id,
            name: order.users.map((e) => e.name),
            dateofarrival: order.arrival_date.slice(0, 10),
            departuredate: order.departure_date.slice(0, 10),
            checkintime: order.arrival_date.slice(11, 16),
            departuretime: order.arrival_date.slice(11, 16),
            numberofpeople: order.count_users,
            tariff: order.definition,
            company: order.company,
            totalamount: order.total_payable,
            paid: order.paid,
            debtaccrual: order.debt === "" ? 0 : order.debt,
        });
    });

    const columns = [
        {
            title: `${t("Room.1")}`,
            dataIndex: "name",
            key: "name",
            fixed: "left",
        },
        {
            title: `${t("Room.2")}`,
            dataIndex: "dateofarrival",
            key: "dateofarrival",
        },
        {
            title: `${t("Room.3")}`,
            dataIndex: "departuredate",
            key: "departuredate",
        },
        {
            title: `${t("Room.4")}`,
            dataIndex: "checkintime",
            key: "checkintime",
        },
        {
            title: `${t("Room.5")}`,
            dataIndex: "departuretime",
            key: "departuretime",
        },
        {
            title: `${t("Room.6")}`,
            dataIndex: "numberofpeople",
            key: "numberofpeople",
        },
        {
            title: `${t("Room.7")}`,
            dataIndex: "tariff",
            key: "tariff",
        },
        {
            title: `${t("Room.8")}`,
            dataIndex: "company",
            key: "company",
        },
        {
            title: `${t("Room.9")}`,
            dataIndex: "totalamount",
            key: "totalamount",
        },
        {
            title: `${t("Room.10")}`,
            dataIndex: "paid",
            key: "paid",
        },
        {
            title: `${t("Room.11")}`,
            dataIndex: "debtaccrual",
            key: "debtaccrual",
        },
    ];
    const handlePrint = () => {
        window.print();
    };
    const OldNumber = useRef();
    const OldNumber2 = useRef();

    return (
        <>
            <ModalCommon width={1000} open={open3} onCancel={HandleClose3}>
                <div className={styles.Wrapper} ref={component}>
                    <div className={styles.logo_wrap}>
                        <img
                            src="https://brandlogos.net/wp-content/uploads/2021/10/premier-league-logo.png"
                            alt=""
                        />
                        <div className={styles.content_box}>
                            <h2>{t("ModalPrint.0")}</h2>
                            <p style={{
                                whiteSpace: "pre-wrap",
                                textDecoration: "none",
                                width: "5 0%"
                            }}>{t("ModalPrint.16")}</p>
                        </div>
                    </div>

                    <div className={styles.scrol_div}>
                        <div className={styles.user_info}>
                            <div className={styles.user_name_info}>
                                <h2 className={styles.room_title}>
                  <span>
                    {dataFind.map(
                        (elem) => elem.users.map((elem) => elem.name)[0]
                    )}
                  </span>
                                    <span>
                    {dataFind.map(
                        (elem) => elem.users.map((elem) => elem.surname)[0]
                    )}
                  </span>
                                </h2>
                                <div className={styles.kvitansiya_table}>

                                    <table>
                                        <tr>
                                            <th className={styles.th}>{t("ModalPrint.2")}</th>
                                            <th className={styles.th}>{t("ModalPrint.3")}</th>
                                            <th className={styles.th}>{t("ModalPrint.4")}</th>
                                            <th className={styles.th}>{t("ModalPrint.5")}</th>
                                            <th className={styles.th}>{t("ModalPrint.6")}</th>
                                            <th className={styles.th}>{t("ModalPrint.7")}</th>
                                        </tr>
                                        <tr>
                                            {dataFind.map((elem) => (
                                                <>
                                                    <td className={styles.td}>
                                                        {elem.arrival_date.slice(0, 10)}
                                                    </td>
                                                    <td className={styles.td}>
                                                        {elem.departure_date.slice(0, 10)}
                                                    </td>
                                                    <td className={styles.td}>{elem.number_night}</td>
                                                    <td className={styles.td}>{elem.rooms.rooms} {elem.rooms.type}</td>
                                                    <td className={styles.td}>{Number(elem.definition).toLocaleString()}</td>
                                                    <td className={styles.td} ref={OldNumber2}
                                                        id={Number(elem.number_night) * Number(elem.definition)}>{(Number(elem.number_night) * Number(elem.definition)).toLocaleString()}</td>
                                                </>
                                            ))}
                                        </tr>
                                    </table>
                                    {dataFind.map(elem => elem.old.length > 0 ?
                                        <h4 className={styles.print_heading}>{t("Finance.4")}</h4> : null)}

                                    <table>
                                        {dataFind.map(elem => elem.old.length > 0 ?
                                            <tr>
                                                <th className={styles.th}>{t("ModalPrint.2")}</th>
                                                <th className={styles.th}>{t("ModalPrint.3")}</th>
                                                <th className={styles.th}>{t("Finance.table.19")}</th>

                                                <th className={styles.th}>{t("ModalPrint.4")}</th>
                                                <th className={styles.th}>№</th>
                                                <th className={styles.th}>{t("ModalPrint.6")}</th>
                                                <th className={styles.th}>{t("ModalPrint.7")}</th>

                                            </tr> : null
                                        )}
                                        <tr>
                                            {dataFind?.map((order) => order.old.length > 0 ? order.old.map((old) =>
                                                <>
                                                    <td className={styles.td}>
                                                        {old.arrival_date.slice(0, 10)}
                                                    </td>
                                                    <td className={styles.td}>
                                                        {old.departure_date.slice(0, 10)}
                                                    </td>
                                                    <td className={styles.td}>
                                                        {old.early_release.slice(0, 10)}
                                                    </td>
                                                    <td className={styles.td}>{old.number_night}</td>
                                                    <td className={styles.td}>{old.rooms} {old.type}</td>
                                                    <td className={styles.td}>{Number(old.definition).toLocaleString()}</td>
                                                    <td className={styles.td} ref={OldNumber}
                                                        id={Number(old.number_night) * Number(old.definition)}>{(Number(old.number_night) * Number(old.definition)).toLocaleString()}</td>
                                                </>
                                            ) : null)}
                                        </tr>
                                    </table>
                                    <table>
                                        <tr>
                                            <th className={styles.th}>#</th>
                                            <th className={styles.th}>{t("ModalPrint.8")}</th>
                                            <th className={styles.th}>{t("ModalPrint.9")}</th>
                                        </tr>

                                        <tr>
                                            <td className={styles.td}>1</td>
                                            <td className={styles.td}>{t("Room.38")}</td>
                                            <td className={styles.td}>{dataFind.map(elem => elem.old)[0]?.length > 0 ? (Number((dataFind.map(elem => Number(elem.number_night) * Number(elem.definition)))) + Number(dataFind.map(elem => elem.old.map(old => Number(old.number_night) * Number(old.definition))))).toLocaleString() : (dataFind.map(elem => Number(elem.number_night)) * dataFind.map(elem => Number(elem.definition))).toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td className={styles.td}>2</td>
                                            <td className={styles.td}>{t("Room.39")}</td>
                                            <td className={styles.td}>{dataFind.map(elem => elem.old)[0]?.length > 0 ? (Number(dataFind.map(elem => elem.old.map(old => Number(old.total_payable - old.booking)))) + Number(EnumComingRasxod2())).toLocaleString() : EnumComingRasxod2().toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td className={styles.td}></td>
                                            <td
                                                style={{
                                                    textTransform: "uppercase",
                                                    fontWeight: "bold",
                                                }}
                                                className={styles.td}
                                            >
                                                {t("ModalPrint.9")}
                                            </td>
                                            <td style={{fontWeight: "bold"}} className={styles.td}>
                                                {dataFind.map(elem => elem.old)[0]?.length > 0 ? ((Number((dataFind.map(elem => Number(elem.number_night) * Number(elem.definition)))) + Number(dataFind.map(elem => elem.old.map(old => Number(old.number_night) * Number(old.definition))))) + Number(dataFind.map(elem => elem.old.map(old => Number(old.total_payable - old.booking)))) + EnumComingRasxod2()).toLocaleString() : (dataFind.map(elem => Number(elem.number_night)) * dataFind.map(elem => Number(elem.definition)) + EnumComingRasxod2()).toLocaleString()}
                                            </td>
                                        </tr>
                                    </table>
                                    <table>
                                        <tr>
                                            <th className={styles.th}>{t("ModalPrint.10")}</th>
                                            <th className={styles.th}>{t("ModalPrint.11")}</th>
                                        </tr>
                                        <tr>
                                            <td className={styles.td}>
                                                {dataFind.map(
                                                    (elem) => elem.users.map((elem) => elem.name)[0]
                                                )}{" "}
                                                {dataFind.map(
                                                    (elem) => elem.users.map((elem) => elem.surname)[0]
                                                )}
                                            </td>
                                            <td className={styles.td}></td>
                                        </tr>
                                    </table>

                                    <table>
                                        <tr>
                                            <th className={styles.th}>{t("ModalPrint.12")}</th>
                                            <th className={styles.th}>{t("ModalPrint.11")}</th>
                                        </tr>
                                        <tr>
                                            <td className={styles.td}>
                                                {dataFind.map((elem) => elem.staff.staff_name)}{" "}
                                                {dataFind.map((elem) => elem.staff.staff_surname)}
                                            </td>
                                            <td className={styles.td}></td>
                                        </tr>
                                    </table>
                                </div>
                                <div className={styles.print_footer}>
                                    <h2>{t("ModalPrint.13")}</h2>
                                    <div className={styles.print_footer_wrapp}>
                                        <div className={styles.print_footer_item}>
                      <span style={{whiteSpace: "pre-wrap", width: "960px"}}>
                      {dataFind.map(
                          (elem) => elem.company_details
                      )}
                      </span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactToPrint
                    trigger={() => (
                        <Button
                            onClick={HandleClose3}
                            style={{
                                fontSize: "14px",
                                fontWeight: "400",
                                fontFamily: "Rubik",
                                padding: "11px 16px",
                                display: "flex",
                                marginLeft: "auto"
                            }}
                        >
                            {t("Room.23")}
                        </Button>
                    )}
                    content={() => component.current}
                />
            </ModalCommon>
        </>
    );
};

export default ModalPrint;
