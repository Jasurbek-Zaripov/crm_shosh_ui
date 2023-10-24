import {useEffect} from "react";
import {useTranslation} from "react-i18next"
import {useDispatch, useSelector} from "react-redux";
import {StaffGet} from "../../../../redux/employess";
import styles from "./style.module.css"

function LeaderBoard() {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    function LanguageValue() {
        return window.localStorage.getItem("i18nextLng")
    }

    const arr = [1, 2, 3, 4]
    const StaffGetSelector = useSelector(state => state.Staff.StaffGet.data)
    useEffect(() => {
        dispatch(StaffGet())
    }, [])
    const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"))

    return (
        <div className={styles.box}>
            <div className={styles.top}>
                <h4>{t("appilcation.5")}</h4>
            </div>
            <div className={styles.top_table}>
                <p className={styles.title_table}>{t("appilcation.6")}</p>
                <p className={styles.title_table}>{t("appilcation.7")}</p>
            </div>
            <div className={styles.tables}>
                {StaffGetSelector.map((elem, index) =>
                    elem.filial?.filial_name === dataUser.filial.filial_name ?
                        <div key={index} className={styles.table}>
                            <div className={styles.table_right}>
                                <h3>{index + 1}</h3>
                                <div className={styles.table_right_left}>
                                    <p>{elem.staff_name} {elem.staff_surname}</p>
                                </div>
                            </div>
                            <h3>{elem.number_app}</h3>

                        </div> : null
                )}
            </div>


        </div>
    )
}

export default LeaderBoard