import React, {useEffect} from 'react'
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import TableCommon from '../../../common/table';
import {StaffGet} from "../../../redux/employess/index"
import styles from "./style.module.css"

const AdminManagerComponent = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(StaffGet())
    }, [])
    const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"))

    const Staff = useSelector(state => state.Staff.StaffGet.data)
    const StaffFilter = Staff.filter(elem => elem.filial.filial_name === dataUser.filial.filial_name)
    const HandleClick = (e) => {
        navigate(`/manager/smena-admin/${e.target.id}`)
    }
    const data = [];
    StaffFilter?.map((elem) =>
        elem.role === 'Admin' ?
            data.push({
                id: elem.id,
                name: (
                    <div onClick={HandleClick} id={elem.id}
                         style={{display: "flex", alignItems: 'center', cursor: "pointer"}}>
                        <span onClick={HandleClick} id={elem.id}>{elem.staff_name} </span>
                        <span onClick={HandleClick} id={elem.id}
                              style={{marginRight: "10px", marginLeft: "10px"}}>{elem.staff_surname}</span>
                        <p onClick={HandleClick} id={elem.id}
                           style={{display: "flex", margin: 0, padding: 0,}}>{elem.father_name}</p>
                    </div>
                ),

                departuredate: (
                    <span style={{cursor: "pointer"}} onClick={HandleClick} id={elem.id}>{elem.birthday} </span>
                ),

                departuretime: (
                    <span style={{cursor: "pointer"}} onClick={HandleClick} id={elem.id}>{elem.adress}</span>
                ),
                numberofpeople: (
                    <span style={{cursor: "pointer"}} onClick={HandleClick} id={elem.id}>{elem.phone}</span>
                )
            }) : null);

    const columns = [
        {
            title: `${t("Room.1")}`,
            dataIndex: "name",
            key: "name",
            fixed: "left",
            width: 250
        },

        {
            title: `${t("application_add.29")}`,
            dataIndex: "departuredate",
            key: "departuredate",
        },
        {
            title: `${t("application_add.32")}`,
            dataIndex: "numberofpeople",
            key: "numberofpeople",
        },
        {
            title: `${t("application_add.33")}`,
            dataIndex: "tariff",
            key: "tariff",
        },
    ];
    return (
        <div className={styles.wrapper}><h2>{t("Finance.table.smenaTable.9")}</h2>
            <TableCommon
                pagination={false}
                bordered
                columns={columns}
                data={data}
                scroll={{
                    x: 1180,
                }}
            /></div>
    )
}

export default AdminManagerComponent