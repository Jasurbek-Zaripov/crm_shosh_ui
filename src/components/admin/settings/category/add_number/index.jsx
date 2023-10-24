import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../../common/button";
import Input from "../../../../../common/input";
import ModalCommon from "../../../../../common/modal"
import { ConsumptionCategoryGet, ConsumptionCategoryPost } from "../../../../../redux/consumption_category";
import { RoomsGet, RoomsPost } from "../../../../../redux/rooms";
import styles from "./style.module.css"

function NumberAdd({open , HandleClose}) {
    const {t} = useTranslation();
    const [rooms, setrooms] = useState(null);
    const dispatch = useDispatch();
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"));
    const handleSubmit = async (e) => {
      e.preventDefault();
      await dispatch(
        ConsumptionCategoryPost({
          consumption_name:rooms,
            filial:data.filial.id,
        })
      );
        HandleClose();
          dispatch(ConsumptionCategoryGet())
    };
  
    return(
        <ModalCommon open={open} titleText={t("Settings.9")} onCancel={HandleClose} >
                  <form onSubmit={handleSubmit}>
        <div className={styles.client_form}>
          <Input
          required
            text={t("Settings.10")}
            onChange={(e) => setrooms(e.target.value)}
            style={{ width: "100%" , marginBottom:"30px" , marginTop:"30px"}}
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