import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../../common/button";
import Input from "../../../../../common/input";
import ModalCommon from "../../../../../common/modal"
import { RoomsGet, RoomsPost } from "../../../../../redux/rooms";
import styles from "./style.module.css"

function NumberAdd({open , HandleClose}) {
    const {t} = useTranslation();
    const [rooms, setrooms] = useState(null);
    const [type, settype] = useState(null);
    const [count, setcount] = useState(null);
    const [definition, setdefinition] = useState(null);
    const dispatch = useDispatch();
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"));
    const handleSubmit = async (e) => {
      e.preventDefault();
      await dispatch(
        RoomsPost({
            rooms:rooms,
            type:type,
            count:count,
            definition:definition,
            filial:data.filial.id,
        })
      );
        HandleClose();
          dispatch(RoomsGet())
    };
  
    return(
        <ModalCommon open={open} titleText={t("Settings.4")} onCancel={HandleClose} >
                  <form onSubmit={handleSubmit}>
        <div className={styles.client_form}>
          <Input
          required
            text={t("Settings.number_table.0")}
            onChange={(e) => setrooms(e.target.value)}
            style={{ width: "100%" , marginBottom:"30px" , marginTop:"30px"}}
          />

          <Input
          required
            text={t("Settings.number_table.1")}
            onChange={(e) => settype(e.target.value)}
            style={{ width: "100%" , marginBottom:"30px"}}
          />

          <Input
          required
            type="text"
            text={t("Settings.number_table.3")}
            onChange={(e) => setcount(e.target.value)}
            style={{ width: "100%" , marginBottom:"30px"}}
          />
          <Input
          required
            type="number"
            text={t("Settings.number_table.2")}
            onChange={(e) => setdefinition(e.target.value)}
            style={{ width: "100%" , marginBottom:"30px"}}
          />
        </div>

        <div className={styles.button}>
          <Button style={{ width: "180px", height: "40px" }} type="submit">
            {t("employees.12")}
          </Button>
        </div>
      </form>
        </ModalCommon>
    )
}
export default NumberAdd