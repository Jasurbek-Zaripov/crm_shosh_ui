import {useState} from "react"
import {useTranslation} from "react-i18next"
import {useDispatch, useSelector} from "react-redux";
import Button from "../../../../../common/button";
import Input from "../../../../../common/input";
import ModalCommon from "../../../../../common/modal"
import {RoomsGet, RoomsPut} from "../../../../../redux/rooms";
import styles from "./style.module.css"

function NumberEdit({open, HandleClose, dataId}) {
    const {t} = useTranslation();
    const [rooms, setrooms] = useState(null);
    const [type, settype] = useState(null);
    const [count, setcount] = useState(null);
    const [definition, setdefinition] = useState(null);
    const dispatch = useDispatch();
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"));
    const dataRooms = useSelector(state => state.Rooms.RoomsGet.data)
    const handleSubmit = async (e) => {
        e.preventDefault();
        let body = {
            rooms: rooms,
            type: type,
            count: count,
            definition: definition,
            filial: data.filial.id,
        }
        await dispatch(
            RoomsPut({body, id: dataId})
        );
        HandleClose();
        dispatch(RoomsGet())
    };

    return (
        <ModalCommon open={open} titleText={t("Settings.5")} onCancel={HandleClose}>
            <form onSubmit={handleSubmit}>
                <div className={styles.client_form}>
                    {dataRooms.map(elem =>
                        elem.id === dataId ? <>

                            <Input
                                required
                                text={t("Settings.number_table.0")}
                                placeholder={elem.rooms}
                                onChange={(e) => setrooms(e.target.value)}
                                style={{width: "100%", marginBottom: "30px", marginTop: "30px"}}
                            />

                            <Input
                                required
                                text={t("Settings.number_table.1")}
                                placeholder={elem.type}
                                onChange={(e) => settype(e.target.value)}
                                style={{width: "100%", marginBottom: "30px"}}
                            />

                            <Input
                                type="text"
                                required
                                text={t("Settings.number_table.2")}
                                placeholder={elem.count}
                                onChange={(e) => setcount(e.target.value)}
                                style={{width: "100%", marginBottom: "30px"}}
                            />
                            <Input
                                type="number"
                                required
                                text={t("Settings.number_table.3")}
                                placeholder={elem.definition}
                                onChange={(e) => setdefinition(e.target.value)}
                                style={{width: "100%", marginBottom: "30px"}}
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