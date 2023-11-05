import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import TableCommon from "../../../../common/table";
import plus from "./../../../../assets/employees/plus.png";
import ModalCommon from "../../../../common/modal/index";
import styles from "./style.module.css";
import Input from "../../../../common/input";
import SelectCommon from "../../../../common/select";
import Button from "../../../../common/button";
import {StaffGet} from "../../../../redux/employess";
import {TaskGet, TaskPost} from "../../../../redux/task/index";
import {useDispatch, useSelector} from "react-redux";

function Table() {
    const {t} = useTranslation();
    const [ids, setIds] = useState(null);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [tasks, setTasks] = useState(null);
    const [importances, setImportances] = useState(null);
    const [dispatchTime, setDispatchTime] = useState(null);
    const [deadlines, setDeadlines] = useState(null);
    const HandleOpen = (e) => {
        setIds(e.currentTarget.value);
        setOpen(true);
    };
    const HandleClose = () => {
        setOpen(false);
    };

    const StaffGets = useSelector((state) => state.Staff.StaffGet.data);

    useEffect(() => {
        dispatch(StaffGet());
    }, []);

    const datas = JSON.parse(window.localStorage.getItem("AuthDataUser"));
    const data = [];

    const handleChange = async (e) => {
        e.preventDefault();

        await dispatch(
            TaskPost({
                task: tasks,
                importance: importances,
                dispatch_time: dispatchTime,
                deadline: deadlines,
                staff: ids,
                manager: datas.id,
            })
        );
        dispatch(TaskGet());
        dispatch(StaffGet());
        HandleClose();
    };

    const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"))
    StaffGets.map((staff) => {
        if (staff.id != datas.id && staff.filial?.filial_name === dataUser.filial.filial_name) {
            data.push({
                name: staff.staff_name,
                role: staff.role,
                arrival_date: staff.task.slice(0, 1).map((tasks) => tasks?.task),
                date_departure: staff.task.slice(0, 1).map((tasks) => tasks?.deadline),
                add:
                    dataUser.role === 'manager' ?
                        <button
                            value={staff.id}
                            onClick={HandleOpen}
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            <img src={plus} width={25} height={25} alt=""/>
                        </button>
                        : null
            });
        }
    });

    const columns = [
        {
            fixed: "left",
            title: `${t("employees.2")}`,
            dataIndex: "name",
            key: "name",
        },
        {
            title: `${t("employees.3")}`,
            dataIndex: "role",
            key: "role",
            width: 180,
        },
        {
            title: `${t("employees.4")}`,
            dataIndex: "arrival_date",
            key: "arrival_date",
        },
        {
            title: `${t("employees.13")}`,
            dataIndex: "date_departure",
            key: "date_departure",
        },
        {
            title: `${t("employees.5")}`,
            dataIndex: "add",
            key: "add",
        },
    ];
    return (
        <>
            <TableCommon bordered columns={columns} data={data}/>
            <ModalCommon width="650px" open={open} onCancel={HandleClose}>
                <div className={styles.modalBody}>
                    <h2 className={styles.modalTitle}>{t("employees.6")}</h2>
                    <form onSubmit={handleChange} className={styles.form_modal}>
                        <Input
                            text={t("employees.4")}
                            onChange={(e) => setTasks(e.target.value)}
                            style={{width: "290px"}}
                        />
                        <Input
                            type="date"
                            text={t("employees.8")}
                            onChange={(e) => setDispatchTime(e.target.value)}
                            style={{width: "290px"}}
                            placeholder="00/00/2000"
                        />
                        <SelectCommon
                            defaultValue={t("employees.9")}
                            onChange={(e) => setImportances(e)}
                            text={t("employees.9")}
                            style={{width: "290px", height: "40px"}}
                            options={[
                                {
                                    value: "Срочный",
                                    label: "Срочный",
                                },
                                {
                                    value: "fdas",
                                    label: "fads",
                                },
                            ]}
                        />
                        <Input
                            type="datetime-local"
                            text={t("employees.11")}
                            onChange={(e) => setDeadlines(e.target.value)}
                            style={{width: "290px"}}
                            placeholder="00/00/2000"
                        />
                        <div className={styles.save_btn}>
                            <Button
                                type="submit"
                                style={{padding: "11px 50px", margin: "40px auto 0 auto"}}
                            >
                                {t("employees.12")}
                            </Button>
                        </div>
                    </form>
                </div>
            </ModalCommon>
        </>
    );
}

export default Table;
