import {useState} from "react"
import {useTranslation} from "react-i18next"
import {useDispatch, useSelector} from "react-redux";
import Button from "../../../../../common/button";
import Input from "../../../../../common/input";
import ModalCommon from "../../../../../common/modal"
import {ConsumptionCategoryGet, ConsumptionCategoryPut} from "../../../../../redux/consumption_category";
import styles from "./style.module.css"

function NumberEdit({open, HandleClose, dataId}) {
    const {t} = useTranslation();
    const [rooms, setrooms] = useState(null);
    const [type, settype] = useState(null);
    const [count, setcount] = useState(null);
    const [definition, setdefinition] = useState(null);
    const dispatch = useDispatch();
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"));

    const dataRooms = useSelector(state => state.ConsumptionCategori.ConsumptionCategoryGet.data)
    const handleSubmit = async (e) => {
        e.preventDefault();
        let body = {
            consumption_name: rooms,
            filial: data.filial.id,
        }
        await dispatch(
            ConsumptionCategoryPut({body, id: dataId})
        );
        HandleClose();
        dispatch(ConsumptionCategoryGet())
    };

    return (
        <ModalCommon open={open} titleText={t("Settings.5")} onCancel={HandleClose}>
            <form onSubmit={handleSubmit}>
                <div className={styles.client_form}>
                    {dataRooms.map(elem =>
                        elem.id === dataId ? <>
                            <Input
                                required
                                text={t("Settings.10")}
                                placeholder={elem.consumption_name}
                                onChange={(e) => setrooms(e.target.value)}
                                style={{width: "100%", marginBottom: "30px", marginTop: "30px"}}
                            />

                        </> : null
                    )}

                </div>

                <div className={styles.button}>
                    <Button style={{width: "180px", height: "40px"}} type="submit">
                        {t("employees.12")}
                    </Button>
                </div>
            </form>
        </ModalCommon>
    )
}

export default NumberEdit