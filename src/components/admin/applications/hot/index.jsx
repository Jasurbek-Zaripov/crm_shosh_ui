import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import ModalCommon from "../../../../common/modal";
import TableCommon from "../../../../common/table"
import {StaffGet, StaffPut} from "../../../../redux/employess";
import {LidsDelete, LidsNewGet, LidsPut} from "../../../../redux/lids";
import styles from "./style.module.css"

function Hot() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open2, setOpen2] = useState(false);
    const [ValueId, setVaLueId] = useState()
    const handleOpen2 = (e) => {
        setVaLueId(e.target.value)
        setOpen2(true)
    }
    const DeleteSubmit = async () => {
        await dispatch(LidsDelete(ValueId))
        dispatch(LidsNewGet())
        setOpen(false)
    }
    const HandleClose2 = () => setOpen2(false)
    const [open, setOpen] = useState(false);
    const handleOpen = (e) => {
        setVaLueId(e.target.value)
        setOpen(true)
    }
    const HandleClose = () => setOpen(false)
    const HandleClick = () => {
        window.localStorage.setItem("LidsId", ValueId)
        const body = {status: "accepted"}
        const staffBody = {number_app: 1}
        dispatch(LidsPut({body, id: ValueId}))
        dispatch(StaffPut({staffBody, id: JSON.parse(window.localStorage.getItem("AuthDataUser")).id}))
        dispatch(StaffGet())
        dispatch(LidsNewGet())
        navigate("/admin/applicationadd")
    }
    const dataLids = useSelector((state) => state.Lids.LidsGet.data)
    const dataNewLids = useSelector((state) => state.Lids.LidsNewGet.data)
    const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"))
    const data = []
    dataNewLids.map(elem =>
        dataUser.filial.filial_name === elem.filial.filial_name ?
            data.push(
                {
                    id: elem.id,
                    name: elem.name,
                    phone_number: elem.phone,
                    arrival_date: elem.arrival_date,
                    date_departure: elem.departure_date,
                    number: elem.type_rooms,
                    human: elem.count_rooms,
                    passport: elem.seriya,
                    delete: (
                        <div style={{display: "flex"}}>
                            <button className={styles.button_table} value={elem.id}
                                    onClick={handleOpen2}>{t("appilcation.table.7")}</button>
                            <button className={styles.button_update} value={elem.id}
                                    onClick={handleOpen}>{t("appilcation.table.8")}</button>
                        </div>
                    ),
                }
            ) : null)
    const columns = [
        {
            fixed: "left",
            title: `${t("appilcation.table.0")}`,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: `${t("appilcation.table.1")}`,
            dataIndex: 'phone_number',
            key: 'phone_number',
            width: 180
        },
        {
            title: `${t("appilcation.table.2")}`,
            dataIndex: 'arrival_date',
            key: 'arrival_date',
        },
        {
            title: `${t("appilcation.table.3")}`,
            dataIndex: 'date_departure',
            key: 'date_departure',
        }, {
            title: `${t("appilcation.table.4")}`,
            dataIndex: 'number',
            key: 'number',
        }, {
            title: `${t("appilcation.table.5")}`,
            dataIndex: 'human',
            key: 'human',
        },
        {
            title: `${t("appilcation.table.6")}`,
            dataIndex: 'passport',
            key: 'passport',
        },
        {
            title: ``,
            dataIndex: 'delete',
            key: 'delete',
            width: 250
        },
    ];
    return (

        <>
            <div className={styles.box}>
                <TableCommon scroll={{
                    x: 1000,
                }} columns={columns} data={data}/>

            </div>
            <ModalCommon titleText={"Обработать заявку?"} onCancel={HandleClose2} open={open2}>
                <div className={styles.buttons}>
                    <button onClick={HandleClick}>Обработать</button>
                    <button onClick={HandleClose2}>Отмена</button>
                </div>

            </ModalCommon>
            <ModalCommon titleText={"Удалить заявку?"} onCancel={HandleClose} open={open}>
                <h3 className={styles.headings3}>Потвердите удаление!</h3>
                <div className={styles.buttons}>
                    <button onClick={DeleteSubmit}>Удалить</button>
                    <button onClick={HandleClose}>Отмена</button>
                </div>
            </ModalCommon>
        </>
    )
}

export default Hot